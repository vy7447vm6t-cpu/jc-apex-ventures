import { spawn } from 'child_process';
import http from 'http';
import puppeteer from 'puppeteer';

const PORT = 3055;
const BASE_URL = `http://localhost:${PORT}`;

function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      const req = http.get(url, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          resolve(true);
        } else {
          setTimeout(check, 300);
        }
      });
      req.on('error', () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Server at ${url} failed to start within ${timeoutMs}ms`));
        } else {
          setTimeout(check, 300);
        }
      });
      req.end();
    };
    check();
  });
}

async function runAudit() {
  console.log('Starting next server on port', PORT);
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    stdio: 'inherit',
    detached: false,
  });

  try {
    await waitForServer(BASE_URL);
    console.log('Server is ready. Launching Puppeteer...');

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    const consoleLogs = [];
    const consoleErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignore expected HTTP 404 resource response logs when testing the 404 route
        if (text.includes('status of 404')) return;
        consoleErrors.push(text);
      } else {
        consoleLogs.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      consoleErrors.push(err.toString());
    });

    // 1. Audit Homepage Hero
    console.log('Testing Homepage Hero...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2', timeout: 30000 });

    const heroCanvasCheck = await page.evaluate(() => {
      const hero = document.querySelector('.hero-sticky-container');
      if (!hero) return { error: 'Hero container not found' };
      const canvases = Array.from(hero.querySelectorAll('canvas'));
      const patternWaveCanvas = canvases.find(c => c.getAttribute('aria-hidden') === 'true' || c.parentElement?.style?.mixBlendMode === 'screen');
      return {
        canvasCount: canvases.length,
        hasPatternWavesCanvas: !!patternWaveCanvas,
        canvasWidth: patternWaveCanvas ? patternWaveCanvas.width : 0,
        canvasHeight: patternWaveCanvas ? patternWaveCanvas.height : 0,
      };
    });
    console.log('Hero Canvas Check:', heroCanvasCheck);

    // 2. Audit Bento Desktop Hover Proximity Interaction
    console.log('Testing Bento Proximity Interaction...');
    await page.goto(`${BASE_URL}/studio#capabilities`, { waitUntil: 'networkidle2', timeout: 30000 });
    const bentoContainer = await page.$('#capabilities');
    if (bentoContainer) {
      await bentoContainer.scrollIntoView();
      await new Promise(r => setTimeout(r, 600));
    }

    const bentoCardCheck = await page.evaluate(() => {
      const cards = document.querySelectorAll('#capabilities .grid > .group');
      if (cards.length === 0) return { error: 'No bento cards found' };
      const firstCard = cards[0];
      const proximity = window.getComputedStyle(firstCard).getPropertyValue('--proximity');
      return {
        cardCount: cards.length,
        initialProximity: proximity.trim(),
      };
    });
    console.log('Bento Card Check:', bentoCardCheck);

    // Get bounding box of first card and hover over it
    const firstCardBox = await page.evaluate(() => {
      const card = document.querySelector('#capabilities .grid > .group');
      if (!card) return null;
      const rect = card.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    });

    if (firstCardBox) {
      console.log('Hovering over first bento card at', firstCardBox);
      await page.mouse.move(firstCardBox.x, firstCardBox.y);
      // Wait for rAF update
      await new Promise(r => setTimeout(r, 250));
    }

    const bentoHoverCheck = await page.evaluate(() => {
      const cards = document.querySelectorAll('#capabilities .grid > .group');
      if (cards.length === 0) return { error: 'No bento cards found' };
      return Array.from(cards).map((c, i) => ({
        index: i,
        proximity: c.style.getPropertyValue('--proximity') || '0',
        mouseX: c.style.getPropertyValue('--mouse-x') || 'none',
        mouseY: c.style.getPropertyValue('--mouse-y') || 'none',
      }));
    });
    console.log('Bento Hover Values:', bentoHoverCheck);

    // 2b. Audit Bento Mobile Touch Proximity Interaction
    console.log('Testing Bento Touch Proximity Interaction...');
    const touchCheck = await page.evaluate(() => {
      const container = document.querySelector('#capabilities .grid');
      const cards = document.querySelectorAll('#capabilities .grid > .group');
      if (!container || cards.length === 0) return { error: 'Container or cards missing' };

      const rect = cards[0].getBoundingClientRect();
      const touchX = rect.left + 50;
      const touchY = rect.top + 50;

      // Dispatch synthetic TouchEvent on container
      const touchObj = new Touch({
        identifier: 1,
        target: container,
        clientX: touchX,
        clientY: touchY,
        pageX: touchX,
        pageY: touchY,
      });

      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [touchObj],
        targetTouches: [touchObj],
        changedTouches: [touchObj],
        bubbles: true,
        cancelable: true,
      });

      container.dispatchEvent(touchStartEvent);

      return {
        card0Proximity: cards[0].style.getPropertyValue('--proximity') || '0',
        card0MouseX: cards[0].style.getPropertyValue('--mouse-x') || '0',
      };
    });
    // Allow rAF to process touch update
    await new Promise(r => setTimeout(r, 150));
    const touchProximityAfterRaf = await page.evaluate(() => {
      const card = document.querySelector('#capabilities .grid > .group');
      return card?.style.getPropertyValue('--proximity') || '0';
    });
    console.log('Bento Touch Proximity Result:', { initial: touchCheck, afterRaf: touchProximityAfterRaf });

    // 3. Check All Application and System Routes
    const routes = [
      '/',
      '/agrim',
      '/electricity-grievances',
      '/emudran',
      '/grid-apex',
      '/licenses',
      '/print-management',
      '/sanyog',
      '/solis',
      '/space-planning',
      '/studio',
      '/tvasta',
      '/_not-found',
    ];

    for (const r of routes) {
      const res = await page.goto(`${BASE_URL}${r}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      console.log(`Route ${r}: status ${res.status()}`);
      if (res.status() >= 500) {
        throw new Error(`Route ${r} returned server error status: ${res.status()}`);
      }
    }

    // Check API route
    const apiCheck = await page.evaluate(async (url) => {
      try {
        const res = await fetch(`${url}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'Audit Test', email: 'audit@test.com', message: 'Healthcheck' }),
        });
        const data = await res.json();
        return { status: res.status, ok: res.ok, data };
      } catch (e) {
        return { error: String(e) };
      }
    }, BASE_URL);
    console.log('API /api/contact Check:', apiCheck);

    console.log('Console Errors detected:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.error('Console errors:', consoleErrors);
      throw new Error(`Console errors were recorded during audit: ${consoleErrors.join(', ')}`);
    }

    await browser.close();
  } finally {
    server.kill('SIGTERM');
  }
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});

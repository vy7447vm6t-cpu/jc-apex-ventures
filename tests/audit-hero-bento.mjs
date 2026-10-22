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
        consoleErrors.push(msg.text());
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
      const canvases = hero.querySelectorAll('canvas');
      return {
        canvasCount: canvases.length,
        hasPatternWavesCanvas: Array.from(canvases).some(c => c.getAttribute('aria-hidden') === 'true' || c.parentElement?.style?.mixBlendMode === 'screen'),
      };
    });
    console.log('Hero Canvas Check:', heroCanvasCheck);

    // 2. Audit Bento Proximity Interaction
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
      await new Promise(r => setTimeout(r, 200));
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

    // 3. Check All 16 routes
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
    ];

    for (const r of routes) {
      const res = await page.goto(`${BASE_URL}${r}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      console.log(`Route ${r}: status ${res.status()}`);
    }

    console.log('Console Errors detected:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.error('Console errors:', consoleErrors);
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

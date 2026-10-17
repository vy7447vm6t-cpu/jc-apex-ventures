import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const ARTIFACT_DIR = '/Users/jayrajchavan/.gemini/antigravity/brain/6fa9a34f-61df-4dda-ab8d-4ea1610b71ba/critic-audit';
if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

const PORT = 3200;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function waitForServer(url, maxRetries = 40) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('Server failed to start');
}

(async () => {
  console.log('--- STARTING ADVERSARIAL CRITIC AUDIT ---');
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    cwd: process.cwd(),
    stdio: 'ignore',
  });

  try {
    await waitForServer(BASE_URL);
    console.log('Next.js production server ready on port', PORT);

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    const consoleLogs = [];
    const consoleErrors = [];
    const failedRequests = [];

    page.on('console', (msg) => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
    page.on('pageerror', (err) => consoleErrors.push(err.message));
    page.on('requestfailed', (req) => failedRequests.push(`${req.url()} (${req.failure()?.errorText})`));

    // 1. DESKTOP VIEWPORT AUDIT (1440x900)
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    console.log('Loading Homepage (Desktop)...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1000));

    // Audit Horizontal Overflow
    const desktopOverflow = await page.evaluate(() => {
      return {
        bodyWidth: document.body.scrollWidth,
        windowWidth: window.innerWidth,
        hasHorizontalOverflow: document.body.scrollWidth > window.innerWidth,
        documentHeight: document.body.scrollHeight,
      };
    });
    console.log('Desktop Overflow Check:', desktopOverflow);

    // Capture Full Desktop Homepage
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'desktop-full-homepage.png'),
      fullPage: true,
    });

    // Capture Individual Key Sections on Desktop
    const sections = [
      { id: 'hero', selector: 'section:first-of-type' },
      { id: 'why', selector: '#about' },
      { id: 'services', selector: '#services' },
      { id: 'builds', selector: '#projects' },
      { id: 'affiliations', selector: '#affiliations' },
      { id: 'process', selector: '#process' },
      { id: 'comparison', selector: '#comparison' },
      { id: 'calculators', selector: '#calculators' },
      { id: 'recognition', selector: '#recognition' },
      { id: 'contact', selector: '#contact' },
    ];

    for (const sec of sections) {
      try {
        const el = await page.$(sec.selector);
        if (el) {
          await page.evaluate((isHero) => {
            const hdr = document.querySelector('.nav-menu-fixed-wrapper');
            if (hdr) hdr.style.visibility = isHero ? 'visible' : 'hidden';
          }, sec.id === 'hero');
          await el.scrollIntoView();
          await new Promise((r) => setTimeout(r, 400));
          await el.screenshot({
            path: path.join(ARTIFACT_DIR, `desktop-sec-${sec.id}.png`),
          });
          await page.evaluate(() => {
            const hdr = document.querySelector('.nav-menu-fixed-wrapper');
            if (hdr) hdr.style.visibility = 'visible';
          });
          console.log(`Captured desktop section: ${sec.id}`);
        } else {
          console.warn(`Selector not found for section: ${sec.id} (${sec.selector})`);
        }
      } catch (e) {
        console.error(`Error capturing section ${sec.id}:`, e.message);
      }
    }

    // Capture Footer Sticky Big Logo Reveal at Bottom of Page
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'desktop-footer-reveal.png'),
      fullPage: false,
    });

    // Capture Consultation Modal open state
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 400));
    const initiateBtn = await page.$('.hero-cta-btn-dark');
    if (initiateBtn) {
      await initiateBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, 'desktop-consultation-modal.png'),
        fullPage: false,
      });
    }

    // 2. MOBILE VIEWPORT AUDIT (390x844)
    console.log('Testing Mobile Viewport (390x844)...');
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1000));

    const mobileOverflow = await page.evaluate(() => {
      return {
        bodyWidth: document.body.scrollWidth,
        windowWidth: window.innerWidth,
        hasHorizontalOverflow: document.body.scrollWidth > window.innerWidth,
        documentHeight: document.body.scrollHeight,
      };
    });
    console.log('Mobile Overflow Check:', mobileOverflow);

    // Capture Full Mobile Homepage
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'mobile-full-homepage.png'),
      fullPage: true,
    });

    // Capture Key Mobile Sections
    for (const sec of sections) {
      try {
        const el = await page.$(sec.selector);
        if (el) {
          await page.evaluate((isHero) => {
            const hdr = document.querySelector('.nav-menu-fixed-wrapper');
            if (hdr) hdr.style.visibility = isHero ? 'visible' : 'hidden';
          }, sec.id === 'hero');
          await el.scrollIntoView();
          await new Promise((r) => setTimeout(r, 400));
          await el.screenshot({
            path: path.join(ARTIFACT_DIR, `mobile-sec-${sec.id}.png`),
          });
          await page.evaluate(() => {
            const hdr = document.querySelector('.nav-menu-fixed-wrapper');
            if (hdr) hdr.style.visibility = 'visible';
          });
        }
      } catch (e) {}
    }

    // 3. SUBPAGES AUDIT (Solis, Sanyog, Grid Apex, Tvasta, eMudran, Agrim, Studio)
    const subpages = ['/solis', '/sanyog', '/grid-apex', '/tvasta', '/emudran', '/agrim', '/studio'];
    for (const sp of subpages) {
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
      const spUrl = `${BASE_URL}${sp}`;
      console.log(`Auditing Subpage: ${sp}`);
      const res = await page.goto(spUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      const status = res.status();
      const slug = sp.replace('/', '');
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `subpage-${slug}-desktop.png`),
        fullPage: false,
      });

      // Mobile subpage
      await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
      await page.goto(spUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `subpage-${slug}-mobile.png`),
        fullPage: false,
      });
      console.log(`Subpage ${sp} status: ${status}`);
    }

    // 4. INTERACTION & ACCESSIBILITY TESTS
    console.log('--- TESTING INTERACTIVE CONTROLS ---');
    // Test Calculator Tab Switching
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}#calculators`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 500));

    const calcButtons = await page.$$('button');
    let tabSwitchWorking = false;
    for (const btn of calcButtons) {
      const text = await page.evaluate(el => el.innerText, btn);
      if (text.includes('Packaging') || text.includes('Interior') || text.includes('Solar')) {
        await btn.click();
        await new Promise((r) => setTimeout(r, 300));
        tabSwitchWorking = true;
      }
    }
    console.log('Calculator Tab Switching Tested:', tabSwitchWorking);

    // 5. DIAGNOSTICS REPORT
    console.log('--- DIAGNOSTIC RESULTS ---');
    console.log(`Total Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log('Console Errors:', consoleErrors);
    }
    console.log(`Total Failed Requests (404/Network): ${failedRequests.length}`);
    if (failedRequests.length > 0) {
      console.log('Failed Requests:', failedRequests);
    }

    await browser.close();
    console.log('--- AUDIT RUN COMPLETED SUCCESSFULLY ---');
  } finally {
    server.kill();
  }
})();

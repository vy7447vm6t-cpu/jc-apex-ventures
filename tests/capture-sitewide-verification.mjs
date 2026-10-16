import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';

const ARTIFACT_DIR = '/Users/jayrajchavan/.gemini/antigravity/brain/e9f7fbac-993b-4ad4-b2a7-47b0c6cd522b';
const PORT = 3199;
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

async function run() {
  console.log('Starting Next.js production server on port', PORT);
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    cwd: process.cwd(),
    stdio: 'ignore',
  });

  try {
    await waitForServer(BASE_URL);
    console.log('Server ready. Launching Puppeteer...');

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    // 1. Desktop (1440x900) Homepage Sections
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 800));

    // Section 1: Hero with Telemetry HUD
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'final-sec1-hero-desktop.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });

    // Helper to scroll to selector and capture without fixed overlays obscuring tall sections
    async function captureSelector(selector, filename) {
      const el = await page.$(selector);
      if (el) {
        await page.evaluate(() => {
          const nav = document.querySelector('.nav-menu-fixed-wrapper');
          if (nav) nav.style.display = 'none';
          const clippy = document.querySelector('.clippy-dock-wrapper');
          if (clippy) clippy.style.display = 'none';
        });
        await el.scrollIntoView();
        await new Promise((r) => setTimeout(r, 600));
        await el.screenshot({
          path: path.join(ARTIFACT_DIR, filename),
        });
        await page.evaluate(() => {
          const nav = document.querySelector('.nav-menu-fixed-wrapper');
          if (nav) nav.style.display = '';
          const clippy = document.querySelector('.clippy-dock-wrapper');
          if (clippy) clippy.style.display = '';
        });
      }
    }

    await captureSelector('#divisions', 'final-sec3-services-desktop.png');
    await captureSelector('#projects', 'final-sec4-projects-desktop.png');
    await captureSelector('.section_logo6', 'final-sec5-affiliations-desktop.png');
    await captureSelector('.process-section', 'final-sec6-process-desktop.png');
    await captureSelector('#calculators', 'final-sec8-calculators-desktop.png');
    await captureSelector('.recognition-section', 'final-sec9-recognition-desktop.png');
    await captureSelector('#contact', 'final-sec10-footer-desktop.png');

    // 1b. In-Page Hash Navigation with Navbar Pinning / Clearance Verification
    for (const [hash, fname] of [
      ['#builds', 'final-nav-jump-builds-desktop.png'],
      ['#calculators', 'final-nav-jump-calculators-desktop.png'],
      ['#recognition', 'final-nav-jump-recognition-desktop.png'],
    ]) {
      await page.goto(`${BASE_URL}/${hash}`, { waitUntil: 'networkidle2' });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, fname),
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      });
    }

    // 2. Mobile (390x844) Homepage Verification
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 600));

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'final-sec1-hero-mobile.png'),
      clip: { x: 0, y: 0, width: 390, height: 844 },
    });

    const buildsMobile = await page.$('#projects');
    if (buildsMobile) {
      await page.evaluate(() => {
        const nav = document.querySelector('.nav-menu-fixed-wrapper');
        if (nav) nav.style.display = 'none';
        const clippy = document.querySelector('.clippy-dock-wrapper');
        if (clippy) clippy.style.display = 'none';
      });
      await buildsMobile.scrollIntoView();
      await new Promise((r) => setTimeout(r, 500));
      await buildsMobile.screenshot({
        path: path.join(ARTIFACT_DIR, 'final-sec4-projects-mobile.png'),
      });
      await page.evaluate(() => {
        const nav = document.querySelector('.nav-menu-fixed-wrapper');
        if (nav) nav.style.display = '';
        const clippy = document.querySelector('.clippy-dock-wrapper');
        if (clippy) clippy.style.display = '';
      });
    }

    const recMobile = await page.$('.recognition-section');
    if (recMobile) {
      await page.evaluate(() => {
        const nav = document.querySelector('.nav-menu-fixed-wrapper');
        if (nav) nav.style.display = 'none';
        const clippy = document.querySelector('.clippy-dock-wrapper');
        if (clippy) clippy.style.display = 'none';
      });
      await recMobile.scrollIntoView();
      await new Promise((r) => setTimeout(r, 500));
      await recMobile.screenshot({
        path: path.join(ARTIFACT_DIR, 'final-sec9-recognition-mobile.png'),
      });
      await page.evaluate(() => {
        const nav = document.querySelector('.nav-menu-fixed-wrapper');
        if (nav) nav.style.display = '';
        const clippy = document.querySelector('.clippy-dock-wrapper');
        if (clippy) clippy.style.display = '';
      });
    }

    // Capture mobile services, affiliations, process, calculators, footer
    for (const [sel, fname] of [
      ['#divisions', 'final-sec3-services-mobile.png'],
      ['.section_logo6', 'final-sec5-affiliations-mobile.png'],
      ['.process-section', 'final-sec6-process-mobile.png'],
      ['#calculators', 'final-sec8-calculators-mobile.png'],
      ['#contact', 'final-sec10-footer-mobile.png'],
    ]) {
      const el = await page.$(sel);
      if (el) {
        await page.evaluate(() => {
          const nav = document.querySelector('.nav-menu-fixed-wrapper');
          if (nav) nav.style.display = 'none';
          const clippy = document.querySelector('.clippy-dock-wrapper');
          if (clippy) clippy.style.display = 'none';
        });
        await el.scrollIntoView();
        await new Promise((r) => setTimeout(r, 500));
        await el.screenshot({ path: path.join(ARTIFACT_DIR, fname) });
        await page.evaluate(() => {
          const nav = document.querySelector('.nav-menu-fixed-wrapper');
          if (nav) nav.style.display = '';
          const clippy = document.querySelector('.clippy-dock-wrapper');
          if (clippy) clippy.style.display = '';
        });
      }
    }

    // 3. Subpages Desktop (1440x900) Verification
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    for (const route of ['/solis', '/grid-apex', '/sanyog', '/tvasta', '/emudran', '/agrim', '/studio']) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise((r) => setTimeout(r, 600));
      const slug = route.replace('/', '');
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `final-subpage-${slug}-desktop.png`),
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      });
    }

    // 4. Subpages Mobile (390x844) Verification
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    for (const route of ['/solis', '/grid-apex', '/sanyog', '/tvasta', '/emudran', '/agrim']) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise((r) => setTimeout(r, 600));
      const slug = route.replace('/', '');
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `final-subpage-${slug}-mobile.png`),
        clip: { x: 0, y: 0, width: 390, height: 844 },
      });
    }

    console.log('Visual verification screenshots saved to', ARTIFACT_DIR);
    if (consoleErrors.length > 0) {
      console.warn('Runtime page errors:', consoleErrors);
    } else {
      console.log('Zero runtime page errors detected across all routes.');
    }

    await browser.close();
  } finally {
    server.kill('SIGTERM');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

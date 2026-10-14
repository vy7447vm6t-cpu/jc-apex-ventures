import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const PORT = 3008;
const BASE_URL = `http://localhost:${PORT}`;
const ARTIFACT_DIRS = [
  '/Users/jayrajchavan/.gemini/antigravity/brain/6fa9a34f-61df-4dda-ab8d-4ea1610b71ba',
  '/Users/jayrajchavan/.gemini/antigravity/brain/1ce85c35-c592-4993-868b-5766a4551a25',
  '/Users/jayrajchavan/.gemini/antigravity/brain/97090a7c-5993-4176-a528-07f2d2f037db',
  '/Users/jayrajchavan/.gemini/antigravity/brain/b64de102-08f7-46d9-9678-7d08889da28e',
];
const TESTS_DIR = path.join(process.cwd(), 'tests');

function saveArtifact(filename, srcPath) {
  for (const dir of ARTIFACT_DIRS) {
    if (!fs.existsSync(dir)) {
      try { fs.mkdirSync(dir, { recursive: true }); } catch {}
    }
    const dest = path.join(dir, filename);
    try { fs.copyFileSync(srcPath, dest); } catch {}
  }
}

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      const req = http.get(url, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          resolve(true);
        } else {
          setTimeout(check, 400);
        }
      });
      req.on('error', () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Server at ${url} failed to start within ${timeoutMs}ms`));
        } else {
          setTimeout(check, 400);
        }
      });
      req.end();
    };
    check();
  });
}

async function runCapture() {
  for (const dir of ARTIFACT_DIRS) {
    if (!fs.existsSync(dir)) {
      try { fs.mkdirSync(dir, { recursive: true }); } catch {}
    }
  }

  let serverProcess = null;
  try {
    await waitForServer(BASE_URL, 1000);
    console.log(`[INFO] Server already running at ${BASE_URL}`);
  } catch {
    console.log(`[LAUNCH] Starting Next.js production server on port ${PORT}...`);
    serverProcess = spawn('npx', ['next', 'start', '-p', String(PORT)], {
      cwd: process.cwd(),
      stdio: 'pipe',
    });
    serverProcess.stdout.on('data', (d) => {
      const str = d.toString();
      if (str.includes('Ready') || str.includes('started')) {
        console.log(`[SERVER] ${str.trim()}`);
      }
    });
    await waitForServer(BASE_URL, 30000);
    console.log(`[READY] Server listening on ${BASE_URL}`);
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    // 1. Desktop (1440x900)
    console.log('[CAPTURE] Desktop 1440x900...');
    const desktopPage = await browser.newPage();
    await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await desktopPage.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    // Move mouse over the Hero to activate precision CAD TargetCursor crosshair
    await desktopPage.mouse.move(720, 380);
    await new Promise((r) => setTimeout(r, 1500));

    const desktopTestsPath = path.join(TESTS_DIR, 'step1-hero-desktop-1440.png');
    await desktopPage.screenshot({ path: desktopTestsPath, clip: { x: 0, y: 0, width: 1440, height: 900 } });
    saveArtifact('step1-hero-desktop-1440.png', desktopTestsPath);
    console.log(`[SAVED] Desktop screenshot: ${desktopTestsPath}`);

    // 2. Tablet (768x1024 - iPad Portrait)
    console.log('[CAPTURE] Tablet 768x1024...');
    const tabletPage = await browser.newPage();
    await tabletPage.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
    await tabletPage.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1500));

    const tabletTestsPath = path.join(TESTS_DIR, 'step1-hero-tablet-768.png');
    await tabletPage.screenshot({ path: tabletTestsPath, clip: { x: 0, y: 0, width: 768, height: 1024 } });
    saveArtifact('step1-hero-tablet-768.png', tabletTestsPath);
    console.log(`[SAVED] Tablet screenshot: ${tabletTestsPath}`);

    // 3. Mobile (390x844 - iPhone 14/15)
    console.log('[CAPTURE] Mobile 390x844...');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1500));

    const mobileTestsPath = path.join(TESTS_DIR, 'step1-hero-mobile-390.png');
    await mobilePage.screenshot({ path: mobileTestsPath, clip: { x: 0, y: 0, width: 390, height: 844 } });
    saveArtifact('step1-hero-mobile-390.png', mobileTestsPath);
    console.log(`[SAVED] Mobile screenshot: ${mobileTestsPath}`);

    // 4. Desktop Hover state on Solar Pergola (_02)
    console.log('[CAPTURE] Desktop hover on Zone 2 (Walkable Solar Pergola)...');
    const hoverPage = await browser.newPage();
    await hoverPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await hoverPage.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1000));

    // Hover over indicator 2
    const indicators = await hoverPage.$$('.hero-indicators-grid > div');
    if (indicators && indicators.length > 1) {
      await indicators[1].hover();
      await new Promise((r) => setTimeout(r, 800));
    }
    const hoverTestsPath = path.join(TESTS_DIR, 'step1-hero-desktop-hover-zone2.png');
    await hoverPage.screenshot({ path: hoverTestsPath, clip: { x: 0, y: 0, width: 1440, height: 900 } });
    saveArtifact('step1-hero-desktop-hover-zone2.png', hoverTestsPath);
    console.log(`[SAVED] Hover screenshot: ${hoverTestsPath}`);

  } finally {
    await browser.close();
    if (serverProcess) {
      serverProcess.kill('SIGTERM');
      console.log('[SERVER] Stopped background server.');
    }
  }
}

runCapture().catch((err) => {
  console.error('[ERROR]', err);
  process.exit(1);
});

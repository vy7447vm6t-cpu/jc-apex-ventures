import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const PORT = 3008;
const BASE_URL = `http://localhost:${PORT}`;
const ARTIFACT_DIRS = [
  '/Users/jayrajchavan/.gemini/antigravity/brain/6fa9a34f-61df-4dda-ab8d-4ea1610b71ba',
  '/Users/jayrajchavan/.gemini/antigravity/brain/6bd703be-66df-41f9-ad47-1be14a52bc7d',
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
    // 1. Desktop (1440x900) - Section screenshot
    console.log('[CAPTURE] Desktop 1440x900 GroundedWhy section...');
    const desktopPage = await browser.newPage();
    await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await desktopPage.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Scroll to #about to trigger Anime.js roll-up counter animation
    await desktopPage.evaluate(() => {
      const el = document.getElementById('about');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    // Wait for roll-up counters to finish
    await new Promise((r) => setTimeout(r, 2200));

    // Stabilize floating navbar to absolute position before screenshots so multi-tile stitching does not duplicate it
    const stabilizeNavbar = async (page) => {
      await page.evaluate(() => {
        const nav = document.querySelector('.nav-menu-fixed-wrapper');
        if (nav) {
          const rect = nav.getBoundingClientRect();
          const absTop = window.scrollY + rect.top;
          nav.style.position = 'absolute';
          nav.style.top = `${absTop}px`;
        }
      });
    };

    const aboutElement = await desktopPage.$('#about');
    const desktopTestsPath = path.join(TESTS_DIR, 'step2-why-desktop-1440.png');
    if (aboutElement) {
      await stabilizeNavbar(desktopPage);
      await aboutElement.screenshot({ path: desktopTestsPath });
    } else {
      await desktopPage.screenshot({ path: desktopTestsPath, fullPage: false });
    }
    saveArtifact('step2-why-desktop-1440.png', desktopTestsPath);
    console.log(`[SAVED] Desktop screenshot: ${desktopTestsPath}`);

    // 2. Mobile (390x844 - iPhone 14) - Section screenshot
    console.log('[CAPTURE] Mobile 390x844 GroundedWhy section...');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });

    await mobilePage.evaluate(() => {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'instant' });
      }
    });
    await new Promise((r) => setTimeout(r, 2200));

    const mobileAboutElement = await mobilePage.$('#about');
    const mobileTestsPath = path.join(TESTS_DIR, 'step2-why-mobile-390.png');
    if (mobileAboutElement) {
      await stabilizeNavbar(mobilePage);
      await mobileAboutElement.screenshot({ path: mobileTestsPath });
    } else {
      await mobilePage.screenshot({ path: mobileTestsPath, fullPage: false });
    }
    saveArtifact('step2-why-mobile-390.png', mobileTestsPath);
    console.log(`[SAVED] Mobile screenshot: ${mobileTestsPath}`);

    // 3. Tablet (768x1024 - iPad Portrait) - Section screenshot
    console.log('[CAPTURE] Tablet 768x1024 GroundedWhy section...');
    const tabletPage = await browser.newPage();
    await tabletPage.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
    await tabletPage.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });

    await tabletPage.evaluate(() => {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'instant' });
      }
    });
    await new Promise((r) => setTimeout(r, 2200));

    const tabletAboutElement = await tabletPage.$('#about');
    const tabletTestsPath = path.join(TESTS_DIR, 'step2-why-tablet-768.png');
    if (tabletAboutElement) {
      await stabilizeNavbar(tabletPage);
      await tabletAboutElement.screenshot({ path: tabletTestsPath });
    } else {
      await tabletPage.screenshot({ path: tabletTestsPath, fullPage: false });
    }
    saveArtifact('step2-why-tablet-768.png', tabletTestsPath);
    console.log(`[SAVED] Tablet screenshot: ${tabletTestsPath}`);

    // 4. Desktop Card Hover (First Card)
    console.log('[CAPTURE] Desktop Card Hover...');
    const hoverPage = await browser.newPage();
    await hoverPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await hoverPage.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await hoverPage.evaluate(() => {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'instant' });
      }
    });
    await new Promise((r) => setTimeout(r, 2200));

    // Hover over the first card with mouse move to avoid scroll displacement
    const firstCard = await hoverPage.$('.why-stat-card');
    if (firstCard) {
      const box = await firstCard.boundingBox();
      if (box) {
        await hoverPage.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      } else {
        await firstCard.hover();
      }
      await new Promise((r) => setTimeout(r, 600));
    }
    const hoverAbout = await hoverPage.$('#about');
    const hoverTestsPath = path.join(TESTS_DIR, 'step2-why-desktop-hover.png');
    if (hoverAbout) {
      await stabilizeNavbar(hoverPage);
      await hoverAbout.screenshot({ path: hoverTestsPath });
    }
    saveArtifact('step2-why-desktop-hover.png', hoverTestsPath);
    console.log(`[SAVED] Hover screenshot: ${hoverTestsPath}`);

  } catch (err) {
    console.error('[ERROR]', err);
  } finally {
    await browser.close();
    if (serverProcess) {
      serverProcess.kill('SIGTERM');
      console.log('[SERVER] Stopped background server.');
    }
  }
}

runCapture();

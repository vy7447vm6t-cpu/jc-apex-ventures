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
    console.log('[CAPTURE] Desktop 1440x900 GroundedServices Section 3...');
    const desktopPage = await browser.newPage();
    await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await desktopPage.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });

    await desktopPage.evaluate(() => {
      const el = document.getElementById('divisions');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await new Promise((r) => setTimeout(r, 1800));

    await desktopPage.evaluate(() => {
      const nav = document.querySelector('header');
      if (nav) nav.style.display = 'none';
    });

    const servicesElement = await desktopPage.$('#divisions');
    const desktopTestsPath = path.join(TESTS_DIR, 'step3-services-desktop-1440.png');
    if (servicesElement) {
      await servicesElement.screenshot({ path: desktopTestsPath });
    } else {
      await desktopPage.screenshot({ path: desktopTestsPath, fullPage: false });
    }
    saveArtifact('step3-services-desktop-1440.png', desktopTestsPath);
    console.log(`[SAVED] Desktop screenshot: ${desktopTestsPath}`);

    // 2. Desktop Hover (Hover on Item 3: GRID APEX)
    console.log('[CAPTURE] Desktop Hover on GRID APEX...');
    const hoverPage = await browser.newPage();
    await hoverPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await hoverPage.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });

    await hoverPage.evaluate(() => {
      const el = document.getElementById('divisions');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await new Promise((r) => setTimeout(r, 1200));

    // Hover over the 3rd item (GRID APEX)
    const cards = await hoverPage.$$('.services-item-card');
    if (cards && cards.length >= 3) {
      await cards[2].hover();
      await new Promise((r) => setTimeout(r, 1000));
    }

    await hoverPage.evaluate(() => {
      const nav = document.querySelector('header');
      if (nav) nav.style.display = 'none';
    });

    const hoverServicesElement = await hoverPage.$('#divisions');
    const hoverTestsPath = path.join(TESTS_DIR, 'step3-services-desktop-hover-grid.png');
    if (hoverServicesElement) {
      await hoverServicesElement.screenshot({ path: hoverTestsPath });
    }
    saveArtifact('step3-services-desktop-hover-grid.png', hoverTestsPath);
    console.log(`[SAVED] Hover screenshot: ${hoverTestsPath}`);

    // 3. Mobile (390x844 - iPhone 14) - Section screenshot with Accordion
    console.log('[CAPTURE] Mobile 390x844 AccordionGallery Section 3...');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });

    await mobilePage.evaluate(() => {
      const el = document.getElementById('divisions');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await new Promise((r) => setTimeout(r, 1800));

    await mobilePage.evaluate(() => {
      const nav = document.querySelector('header');
      if (nav) nav.style.display = 'none';
    });

    const mobileServicesElement = await mobilePage.$('#divisions');
    const mobileTestsPath = path.join(TESTS_DIR, 'step3-services-mobile-390.png');
    if (mobileServicesElement) {
      await mobileServicesElement.screenshot({ path: mobileTestsPath });
    } else {
      await mobilePage.screenshot({ path: mobileTestsPath, fullPage: false });
    }
    saveArtifact('step3-services-mobile-390.png', mobileTestsPath);
    console.log(`[SAVED] Mobile screenshot: ${mobileTestsPath}`);

    // 4. Tablet (768x1024 - iPad Portrait) - Section screenshot
    console.log('[CAPTURE] Tablet 768x1024 Section 3...');
    const tabletPage = await browser.newPage();
    await tabletPage.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
    await tabletPage.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });

    await tabletPage.evaluate(() => {
      const el = document.getElementById('divisions');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await new Promise((r) => setTimeout(r, 1800));

    await tabletPage.evaluate(() => {
      const nav = document.querySelector('header');
      if (nav) nav.style.display = 'none';
    });

    const tabletServicesElement = await tabletPage.$('#divisions');
    const tabletTestsPath = path.join(TESTS_DIR, 'step3-services-tablet-768.png');
    if (tabletServicesElement) {
      await tabletServicesElement.screenshot({ path: tabletTestsPath });
    } else {
      await tabletPage.screenshot({ path: tabletTestsPath, fullPage: false });
    }
    saveArtifact('step3-services-tablet-768.png', tabletTestsPath);
    console.log(`[SAVED] Tablet screenshot: ${tabletTestsPath}`);

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

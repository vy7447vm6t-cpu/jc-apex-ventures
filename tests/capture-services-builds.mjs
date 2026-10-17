import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

const PORT = 3201;
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
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    cwd: process.cwd(),
    stdio: 'ignore',
  });

  try {
    await waitForServer(BASE_URL);
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

    const elDiv = await page.$('#divisions');
    if (elDiv) {
      await elDiv.screenshot({ path: '/Users/jayrajchavan/.gemini/antigravity/brain/6fa9a34f-61df-4dda-ab8d-4ea1610b71ba/critic-audit/desktop-sec-services.png' });
      console.log('Saved desktop-sec-services.png');
    }
    const elProj = await page.$('#projects');
    if (elProj) {
      await elProj.screenshot({ path: '/Users/jayrajchavan/.gemini/antigravity/brain/6fa9a34f-61df-4dda-ab8d-4ea1610b71ba/critic-audit/desktop-sec-builds.png' });
      console.log('Saved desktop-sec-builds.png');
    }

    // Mobile
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    const mDiv = await page.$('#divisions');
    if (mDiv) {
      await mDiv.screenshot({ path: '/Users/jayrajchavan/.gemini/antigravity/brain/6fa9a34f-61df-4dda-ab8d-4ea1610b71ba/critic-audit/mobile-sec-services.png' });
      console.log('Saved mobile-sec-services.png');
    }
    const mProj = await page.$('#projects');
    if (mProj) {
      await mProj.screenshot({ path: '/Users/jayrajchavan/.gemini/antigravity/brain/6fa9a34f-61df-4dda-ab8d-4ea1610b71ba/critic-audit/mobile-sec-builds.png' });
      console.log('Saved mobile-sec-builds.png');
    }

    await browser.close();
  } finally {
    server.kill();
  }
})();

import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

const PORT = 3456;
const BASE_URL = `http://localhost:${PORT}`;
const ARTIFACT_DIR = '/Users/jayrajchavan/.gemini/antigravity/brain/6fa9a34f-61df-4dda-ab8d-4ea1610b71ba';

function startServer() {
  return new Promise((resolve, reject) => {
    const srv = spawn('npx', ['next', 'start', '-p', String(PORT)], {
      cwd: '/Users/jayrajchavan/Documents/GitHub/jc-apex-ventures',
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    srv.stdout.on('data', (d) => {
      const msg = d.toString();
      if (msg.includes('Ready') || msg.includes('started') || msg.includes(`localhost:${PORT}`)) {
        resolve(srv);
      }
    });

    srv.stderr.on('data', (d) => {
      // console.error(d.toString());
    });

    srv.on('error', reject);

    setTimeout(() => resolve(srv), 4000);
  });
}

(async () => {
  console.log('Starting next server...');
  const server = await startServer();

  try {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to homepage...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });

    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log(`Document scroll height: ${totalHeight}px`);

    // 1. Scroll near footer top
    await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: `${ARTIFACT_DIR}/footer-curtain-top.png` });
    console.log('Saved footer-curtain-top.png');

    // 2. Scroll to the absolute bottom of the page to trigger full reveal
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: `${ARTIFACT_DIR}/footer-bottom-reveal.png` });
    console.log('Saved footer-bottom-reveal.png');

    // Check computed geometry of curtain and reveal
    const geometry = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (!footer) return null;
      const curtain = footer.children[0];
      const reveal = footer.children[1];
      const rCurtain = curtain ? curtain.getBoundingClientRect() : null;
      const rReveal = reveal ? reveal.getBoundingClientRect() : null;
      return {
        scrollY: window.scrollY,
        curtain: rCurtain ? { top: Math.round(rCurtain.top), bottom: Math.round(rCurtain.bottom), height: Math.round(rCurtain.height) } : null,
        reveal: rReveal ? { top: Math.round(rReveal.top), bottom: Math.round(rReveal.bottom), height: Math.round(rReveal.height) } : null,
      };
    });
    console.log('Geometry at bottom:', JSON.stringify(geometry, null, 2));

    // 3. Mobile Viewport (390px)
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: `${ARTIFACT_DIR}/footer-bottom-reveal-mobile.png` });
    console.log('Saved footer-bottom-reveal-mobile.png');

    await browser.close();
  } finally {
    server.kill();
    console.log('Server terminated.');
  }
})();

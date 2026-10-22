import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = '/Users/jayrajchavan/.gemini/antigravity/brain/6fa9a34f-61df-4dda-ab8d-4ea1610b71ba';
const BASE_URL = 'https://jcapexv.com';

async function main() {
  console.log('Launching Puppeteer browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // 1. Desktop 1440x900 - Hero
  await page.setViewport({ width: 1440, height: 900 });
  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(`${BASE_URL}/?_t=${Date.now()}`, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'live-v2-desktop-hero.png'),
  });
  console.log('Captured live-v2-desktop-hero.png');

  // 2. Desktop 1440x900 - Services Section 3
  const secServices = await page.$('#divisions');
  if (secServices) {
    await secServices.scrollIntoView();
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'live-v2-desktop-services.png'),
    });
    console.log('Captured live-v2-desktop-services.png');
  }

  // 3. Desktop 1440x900 - Section 5 Affiliations
  const secAffil = await page.$('#affiliations');
  if (secAffil) {
    await secAffil.scrollIntoView();
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'live-v2-desktop-affiliations.png'),
    });
    console.log('Captured live-v2-desktop-affiliations.png');
  }

  // 4. Desktop 1440x900 - Section 8 Calculators
  const secCalc = await page.$('#calculators');
  if (secCalc) {
    await secCalc.scrollIntoView();
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'live-v2-desktop-calculators.png'),
    });
    console.log('Captured live-v2-desktop-calculators.png');
  }

  // 5. Desktop 1440x900 - Bottom Footer Reveal
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'live-v2-desktop-footer.png'),
  });
  console.log('Captured live-v2-desktop-footer.png');

  // 6. Mobile 390x844 - Section 4 Mobile Swipe Carousel
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/#projects?_t=${Date.now()}`, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  const secProjects = await page.$('#projects');
  if (secProjects) {
    await secProjects.scrollIntoView();
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'live-v2-mobile-projects.png'),
    });
    console.log('Captured live-v2-mobile-projects.png');
  }

  // 7. Subpage /solis Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/solis?_t=${Date.now()}`, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'live-v2-subpage-solis.png'),
  });
  console.log('Captured live-v2-subpage-solis.png');

  // 8. Subpage /sanyog Desktop
  await page.goto(`${BASE_URL}/sanyog?_t=${Date.now()}`, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'live-v2-subpage-sanyog.png'),
  });
  console.log('Captured live-v2-subpage-sanyog.png');

  await browser.close();
  console.log('All live captures complete!');
}

main().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});

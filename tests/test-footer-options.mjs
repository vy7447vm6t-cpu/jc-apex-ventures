import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const html = `<!DOCTYPE html>
<html>
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; background: #0A0D10; color: #FFFFFF; font-family: 'Inter', sans-serif; }
    .container { width: 100%; height: 420px; display: flex; flex-direction: column; justify-content: center; align-items: center; border-bottom: 2px solid #222; position: relative; overflow: hidden; padding: 20px 40px; box-sizing: border-box; }
    .eyebrow { font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: #C29F53; font-weight: 700; margin-bottom: 20px; }
    .subtext { font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-top: 20px; }
  </style>
</head>
<body>
  <!-- Option A: Side-by-side with Umbrella Mark -->
  <div class="container">
    <div class="eyebrow">[ MULTI-DISCIPLINARY ENGINEERING CONSORTIUM · MUMBAI ]</div>
    <div style="width: 100%; max-width: 1340px;">
      <svg viewBox="0 0 1340 180" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(20, 10)">
          <circle cx="50" cy="18" r="10" fill="#D4AF37" />
          <path d="M15 55 Q 50 15 85 55" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" fill="none" />
          <path d="M24 55 Q 50 25 76 55" stroke="#C29F53" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.9" />
          <path d="M50 48 L 50 95 Q 50 115 36 115 Q 28 115 28 108" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        </g>
        <text x="160" y="115" fill="#FFFFFF" font-family="'Instrument Serif', Georgia, serif" font-size="140" font-weight="400" letter-spacing="-0.02em">
          JC APEX VENTURES
        </text>
      </svg>
    </div>
    <div class="subtext">ONE INTERNATIONAL CENTRE · ELPHINSTONE · MUMBAI 400013</div>
  </div>

  <!-- Option B: Centered with Floating Crest above Giant Edge-to-Edge Wordmark -->
  <div class="container">
    <div class="eyebrow">[ CONSORTIUM OF PRACTICE DISCIPLINES · EST. MUMBAI ]</div>
    <div style="width: 100%; max-width: 1340px; display: flex; flex-direction: column; align-items: center;">
      <svg viewBox="0 0 100 100" width="56" height="56" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 8px;">
        <circle cx="50" cy="18" r="9" fill="#D4AF37" />
        <path d="M20 50 Q 50 20 80 50" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" fill="none" />
        <path d="M28 50 Q 50 28 72 50" stroke="#C29F53" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.9" />
        <path d="M50 45 L 50 82 Q 50 94 40 94 Q 34 94 34 89" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      </svg>
      <svg viewBox="0 0 1340 130" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="105" text-anchor="middle" fill="#FFFFFF" font-family="'Instrument Serif', Georgia, serif" font-size="145" font-weight="400" letter-spacing="-0.02em">
          JC APEX VENTURES
        </text>
      </svg>
    </div>
    <div class="subtext">LICENSED PWD CLASS-A · MERC · DISCOM LIAISONING · SOLAR EPC · SPATIAL FIT-OUT</div>
  </div>
</body>
</html>`;

  await page.setContent(html, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: '/Users/jayrajchavan/.gemini/antigravity/brain/6fa9a34f-61df-4dda-ab8d-4ea1610b71ba/footer-logo-options.png' });
  await browser.close();
  console.log('Saved footer-logo-options.png');
})();

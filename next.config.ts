import type { NextConfig } from "next";
import path from "path";
import fs from "fs";

if (!process.env.NEXT_FONT_GOOGLE_MOCKED_RESPONSES) {
  const cacheDir = path.join(__dirname, "node_modules/.cache");
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
  const mockPath = path.join(cacheDir, "next-font-mock.json");
  const mockData: Record<string, string> = {
    "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400..700&display=swap": `
/* latin */
@font-face {
  font-family: 'Instrument Sans';
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/instrumentsans/v1/mock.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
`,
    "https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,200..800;1,200..800&display=swap": `
/* latin */
@font-face {
  font-family: 'Newsreader';
  font-style: normal;
  font-weight: 200 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/newsreader/v1/mock.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin */
@font-face {
  font-family: 'Newsreader';
  font-style: italic;
  font-weight: 200 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/newsreader/v1/mock-italic.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
`,
  };
  fs.writeFileSync(mockPath, JSON.stringify(mockData, null, 2));
  process.env.NEXT_FONT_GOOGLE_MOCKED_RESPONSES = mockPath;
}

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "./"),
};

export default nextConfig;



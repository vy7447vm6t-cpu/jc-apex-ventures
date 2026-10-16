import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (/\.(tsx|ts|jsx|js)$/.test(file)) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = walk('src');
const missing = [];
const checked = new Set();

const regex = /['"`](\/images\/[^'"`$\s]+\.(?:png|jpg|jpeg|svg|webp))['"`]/g;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    const imgPath = match[1];
    checked.add(imgPath);
    const diskPath = path.join(process.cwd(), 'public', imgPath);
    if (!fs.existsSync(diskPath)) {
      missing.push({ file, imgPath, diskPath });
    }
  }
}

console.log('Total unique image paths checked:', checked.size);
for (const p of Array.from(checked).sort()) {
  console.log('  Found image path:', p);
}

if (missing.length > 0) {
  console.error('MISSING IMAGES FOUND:', missing);
  process.exit(1);
} else {
  console.log('SUCCESS: ALL IMAGE PATHS EXIST ON DISK! (Zero broken image paths)');
}

const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

const BUILD_DIR = path.resolve(__dirname, '../dist');
const SRC_DIR = path.resolve(__dirname, '../src');
const MANIFEST_DIR = path.resolve(__dirname, '../manifest');

async function build(browser) {
  const distDir = path.join(BUILD_DIR, browser);
  const packageDir = path.join(BUILD_DIR, 'packages');
  
  // Ensure directories exist
  await fs.ensureDir(distDir);
  await fs.ensureDir(packageDir);
  
  // Copy source files
  await fs.copy(SRC_DIR, distDir);
  
  // Copy manifest
  const manifestFile = browser === 'chrome' ? 'manifest.json' : 'manifest.firefox.json';
  await fs.copy(
    path.join(MANIFEST_DIR, manifestFile),
    path.join(distDir, 'manifest.json')
  );
  
  // Copy browser-polyfill
  await fs.copy(
    path.resolve(__dirname, '../node_modules/webextension-polyfill/dist/browser-polyfill.js'),
    path.join(distDir, 'browser-polyfill.js')
  );
  
  // Create zip file
  const zipFile = path.join(packageDir, `${browser}-extension.zip`);
  const output = fs.createWriteStream(zipFile);
  const archive = archiver('zip', { zlib: { level: 9 }});
  
  archive.pipe(output);
  archive.directory(distDir, false);
  
  await archive.finalize();
}

const browser = process.argv[2];
if (!browser || !['chrome', 'firefox'].includes(browser)) {
  console.error('Please specify browser: chrome or firefox');
  process.exit(1);
}

build(browser).catch(console.error); 
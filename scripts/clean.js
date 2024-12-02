const fs = require('fs-extra');
const path = require('path');

const distPath = path.join(__dirname, '../dist');

async function clean() {
  try {
    await fs.remove(distPath);
    console.log('Cleaned dist directory');
  } catch (err) {
    console.error('Error cleaning dist directory:', err);
    process.exit(1);
  }
}

clean(); 
const fs = require('fs-extra');
const path = require('path');

const standalonePath = path.join(__dirname, '../../dist/apps/nicoletta-portfolio/.next/standalone');
const buildOutputPath = path.join(__dirname, '../../dist/apps/nicoletta-portfolio');

// Copy the public folder
fs.copySync(
  path.join(__dirname, '../../apps/nicoletta-portfolio/nicoletta-portfolio-app/public'),
  path.join(standalonePath, 'public')
);

// Copy the .env file if needed
const envFile = path.join(__dirname, '../../apps/nicoletta-portfolio/nicoletta-portfolio-app/.env');
if (fs.existsSync(envFile)) {
  fs.copySync(envFile, path.join(standalonePath, '.env'));
}

console.log('✅ Copied public assets and env files into the standalone build.');

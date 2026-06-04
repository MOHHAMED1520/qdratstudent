import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const files = [
  'lib/config.js',
  'lib/auth.js',
  'lib/storage.js',
  'lib/telegram.js',
  'lib/handlers.js',
  'api/health.js',
  'api/settings.js',
  'api/orders.js',
  'api/results.js',
  'api/admin/login.js',
  'api/admin/settings.js',
  'api/admin/orders.js',
  'api/admin/results.js',
  'netlify/functions/health.mjs',
  'netlify/functions/settings.mjs',
  'netlify/functions/orders.mjs',
  'netlify/functions/results.mjs',
  'netlify/functions/admin-login.mjs',
  'netlify/functions/admin-settings.mjs',
  'netlify/functions/admin-orders.mjs',
  'netlify/functions/admin-results.mjs',
  'js/main.js',
  'js/admin.js'
];

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.error(`Missing file: ${file}`);
    process.exit(1);
  }
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
console.log('All frontend and backend files passed syntax check.');

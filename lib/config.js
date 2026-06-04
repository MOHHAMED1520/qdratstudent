import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
export const DATA_DIR = path.join(ROOT_DIR, 'data');
export const DEFAULT_SETTINGS_FILE = path.join(DATA_DIR, 'default-settings.json');
export const LOCAL_SETTINGS_FILE = path.join(DATA_DIR, 'settings.local.json');
export const LOCAL_ORDERS_FILE = path.join(DATA_DIR, 'orders.local.json');
export const LOCAL_RESULTS_FILE = path.join(DATA_DIR, 'results.local.json');

export function getEnv(name, fallback = '') {
  if (typeof process !== 'undefined' && process.env && process.env[name] !== undefined) {
    return process.env[name];
  }
  return fallback;
}

export const APP_CONFIG = {
  adminUsername: getEnv('ADMIN_USERNAME', 'admin'),
  adminPassword: getEnv('ADMIN_PASSWORD', 'change-me'),
  adminSessionSecret: getEnv('ADMIN_SESSION_SECRET', 'change-this-secret'),
  telegramBotToken: getEnv('TELEGRAM_BOT_TOKEN', ''),
  telegramChatId: getEnv('TELEGRAM_CHAT_ID', ''),
  telegramChannelUsername: getEnv('TELEGRAM_CHANNEL_USERNAME', ''),
  publicTelegramLink: getEnv('PUBLIC_TELEGRAM_LINK', 'https://t.me/qudrat_2026'),
  supabaseUrl: getEnv('SUPABASE_URL', ''),
  supabaseServiceRoleKey: getEnv('SUPABASE_SERVICE_ROLE_KEY', '')
};

export function hasSupabase() {
  return Boolean(APP_CONFIG.supabaseUrl && APP_CONFIG.supabaseServiceRoleKey);
}

export async function readJsonFile(filePath, fallback) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch {
    return fallback;
  }
}

export async function writeJsonFile(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), 'utf8');
}

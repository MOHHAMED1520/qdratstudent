import crypto from 'node:crypto';
import { APP_CONFIG } from './config.js';

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function signPayload(payload) {
  return crypto
    .createHmac('sha256', APP_CONFIG.adminSessionSecret)
    .update(payload)
    .digest('base64url');
}

export function createAdminToken() {
  const payload = {
    sub: APP_CONFIG.adminUsername,
    role: 'admin',
    exp: Date.now() + 1000 * 60 * 60 * 12
  };
  const encoded = base64url(JSON.stringify(payload));
  const signature = signPayload(encoded);
  return `${encoded}.${signature}`;
}

export function verifyAdminToken(token) {
  if (!token || !token.includes('.')) return null;
  const [encoded, signature] = token.split('.');
  const expected = signPayload(encoded);
  const signatureBuffer = Buffer.from(signature || '');
  const expectedBuffer = Buffer.from(expected || '');
  if (signatureBuffer.length !== expectedBuffer.length) return null;
  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function parseBearerToken(request) {
  const header = request.headers.get('authorization') || '';
  if (!header.startsWith('Bearer ')) return '';
  return header.slice(7).trim();
}

export function isValidAdminCredentials(username, password) {
  return username === APP_CONFIG.adminUsername && password === APP_CONFIG.adminPassword;
}

import { APP_CONFIG } from './config.js';

function getTelegramChatTarget() {
  if (APP_CONFIG.telegramChatId) return APP_CONFIG.telegramChatId;
  if (APP_CONFIG.telegramChannelUsername) {
    return APP_CONFIG.telegramChannelUsername.startsWith('@')
      ? APP_CONFIG.telegramChannelUsername
      : `@${APP_CONFIG.telegramChannelUsername}`;
  }
  return '';
}

async function telegramRequest(method, body, isMultipart = false) {
  if (!APP_CONFIG.telegramBotToken) {
    return { ok: false, skipped: true, reason: 'TELEGRAM_BOT_TOKEN is missing' };
  }

  const response = await fetch(`https://api.telegram.org/bot${APP_CONFIG.telegramBotToken}/${method}`, {
    method: 'POST',
    body: isMultipart ? body : JSON.stringify(body),
    headers: isMultipart ? undefined : { 'Content-Type': 'application/json' }
  });

  const json = await response.json();
  if (!response.ok || !json.ok) {
    throw new Error(json.description || `Telegram API ${method} failed`);
  }
  return json.result;
}

export async function sendOrderToTelegram({ text, receiptFile, receiptName }) {
  const chatId = getTelegramChatTarget();
  if (!chatId) {
    return { ok: false, skipped: true, reason: 'No Telegram target configured' };
  }

  const messageResult = await telegramRequest('sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true
  });

  let fileResult = null;
  if (receiptFile) {
    const form = new FormData();
    form.append('chat_id', chatId);
    form.append('caption', `إيصال تحويل مرفق للطلب ${receiptName || ''}`.trim());

    const isImage = typeof receiptFile.type === 'string' && receiptFile.type.startsWith('image/');
    if (isImage) {
      form.append('photo', receiptFile, receiptName || receiptFile.name || 'receipt.jpg');
      fileResult = await telegramRequest('sendPhoto', form, true);
    } else {
      form.append('document', receiptFile, receiptName || receiptFile.name || 'receipt');
      fileResult = await telegramRequest('sendDocument', form, true);
    }
  }

  return { ok: true, messageResult, fileResult };
}

import crypto from 'node:crypto';
import { APP_CONFIG } from './config.js';
import { createAdminToken, isValidAdminCredentials, parseBearerToken, verifyAdminToken } from './auth.js';
import { createOrder, createQuizResult, getSettings, listOrders, listQuizResults, saveSettings } from './storage.js';
import { sendOrderToTelegram } from './telegram.js';

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      ...(init.headers || {})
    }
  });
}

function okOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
    }
  });
}

function unauthorized(message = 'Unauthorized') {
  return json({ ok: false, message }, { status: 401 });
}

function badRequest(message) {
  return json({ ok: false, message }, { status: 400 });
}

function requireAdmin(request) {
  const token = parseBearerToken(request);
  const payload = verifyAdminToken(token);
  return payload;
}

function normalizeCoursesForValidation(selectedCourseIds, settings) {
  const selectedSet = new Set(selectedCourseIds);
  return settings.courses.filter(course => selectedSet.has(course.id));
}

function buildRecommendation(course, reason) {
  if (!course) return null;
  return {
    courseId: course.id,
    title: course.title,
    reason
  };
}

function chooseCourseRecommendation({ score, target, daysLeft, studyHours }, settings) {
  const map = new Map(settings.courses.map(course => [course.id, course]));
  let course = map.get('comprehensive') || settings.courses[0];
  let reason = 'اختيار متوازن بين التأسيس والمراجعة.';

  if (daysLeft !== null && daysLeft <= 14 && map.get('intensive')) {
    course = map.get('intensive');
    reason = 'موعد الاختبار قريب، لذلك المسار المكثف هو الأنسب لرفع أسرع في وقت أقصر.';
  }

  if (score !== null && score < 60 && map.get('basic')) {
    course = map.get('basic');
    reason = 'نتيجتك الحالية تدل على حاجة واضحة لتثبيت الأساسيات وبناء الفهم قبل أي تسريع.';
  }

  if ((target !== null && target >= 90) && map.get('premium')) {
    course = map.get('premium');
    reason = 'بما أن هدفك 90+ فأنت تحتاج مساراً أقوى من مجرد تأسيس أو مراجعة عامة.';
  }

  if ((score !== null && score >= 60 && score < 80) && (target === null || target < 90) && (daysLeft === null || daysLeft > 14) && map.get('comprehensive')) {
    course = map.get('comprehensive');
    reason = 'مستواك متوسط، وأفضل خيار لك الآن مسار شامل يبني ويثبت ويراجع تدريجياً.';
  }

  if ((studyHours !== null && studyHours <= 1.5) && (daysLeft !== null && daysLeft <= 21) && map.get('intensive')) {
    course = map.get('intensive');
    reason = 'ساعات المذاكرة اليومية محدودة، فالأفضل لك دورة مركزة تستثمر وقتك بأعلى كفاءة.';
  }

  return buildRecommendation(course, reason);
}

export async function healthHandler(request) {
  if (request.method === 'OPTIONS') return okOptions();
  return json({ ok: true, status: 'healthy', now: new Date().toISOString() });
}

export async function settingsHandler(request) {
  if (request.method === 'OPTIONS') return okOptions();
  if (request.method !== 'GET') return badRequest('Method not allowed');
  const settings = await getSettings();
  return json({ ok: true, settings, publicConfig: { telegramLink: APP_CONFIG.publicTelegramLink } });
}

export async function adminLoginHandler(request) {
  if (request.method === 'OPTIONS') return okOptions();
  if (request.method !== 'POST') return badRequest('Method not allowed');

  const body = await request.json().catch(() => null);
  if (!body?.username || !body?.password) return badRequest('Username and password are required');
  if (!isValidAdminCredentials(body.username, body.password)) return unauthorized('بيانات الدخول غير صحيحة');

  return json({ ok: true, token: createAdminToken(), username: body.username });
}

export async function adminSettingsHandler(request) {
  if (request.method === 'OPTIONS') return okOptions();
  if (!requireAdmin(request)) return unauthorized('جلسة المدير غير صالحة');

  if (request.method === 'GET') {
    return json({ ok: true, settings: await getSettings() });
  }

  if (request.method !== 'PUT') return badRequest('Method not allowed');
  const body = await request.json().catch(() => null);
  if (!body?.settings) return badRequest('settings payload is required');
  const saved = await saveSettings(body.settings);
  return json({ ok: true, settings: saved });
}

export async function adminOrdersHandler(request) {
  if (request.method === 'OPTIONS') return okOptions();
  if (!requireAdmin(request)) return unauthorized('جلسة المدير غير صالحة');
  if (request.method !== 'GET') return badRequest('Method not allowed');
  const orders = await listOrders();
  return json({ ok: true, orders });
}

export async function adminResultsHandler(request) {
  if (request.method === 'OPTIONS') return okOptions();
  if (!requireAdmin(request)) return unauthorized('جلسة المدير غير صالحة');
  if (request.method !== 'GET') return badRequest('Method not allowed');
  const results = await listQuizResults();
  return json({ ok: true, results });
}

export async function quizResultsHandler(request) {
  if (request.method === 'OPTIONS') return okOptions();
  if (request.method !== 'POST') return badRequest('Method not allowed');

  const body = await request.json().catch(() => null);
  if (!body?.summary) return badRequest('summary is required');

  const settings = await getSettings();
  const recommendation = chooseCourseRecommendation({
    score: typeof body.summary.combinedPercent === 'number' ? body.summary.combinedPercent : null,
    target: typeof body.targetScore === 'number' ? body.targetScore : null,
    daysLeft: typeof body.daysLeft === 'number' ? body.daysLeft : null,
    studyHours: typeof body.studyHours === 'number' ? body.studyHours : null
  }, settings);

  const payload = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    customer_name: body.customerName || null,
    summary: body.summary,
    recommendation,
    meta: {
      targetScore: body.targetScore || null,
      daysLeft: body.daysLeft || null,
      studyHours: body.studyHours || null
    }
  };

  await createQuizResult(payload);
  return json({ ok: true, recommendation, resultId: payload.id });
}

export async function ordersHandler(request) {
  if (request.method === 'OPTIONS') return okOptions();
  if (request.method !== 'POST') return badRequest('Method not allowed');

  const settings = await getSettings();
  const formData = await request.formData().catch(() => null);
  if (!formData) return badRequest('Invalid form data');

  const payloadRaw = formData.get('payload');
  if (!payloadRaw || typeof payloadRaw !== 'string') return badRequest('payload is required');

  const payload = (() => {
    try {
      return JSON.parse(payloadRaw);
    } catch {
      return null;
    }
  })();
  if (!payload) return badRequest('payload must be valid JSON');

  const customer = payload.customer || {};
  const selectedCourseIds = Array.isArray(payload.courseIds) ? payload.courseIds : [];
  if (!customer.name || !customer.phone || !customer.email || !customer.targetScore) {
    return badRequest('Customer information is incomplete');
  }
  if (!selectedCourseIds.length) {
    return badRequest('At least one course must be selected');
  }

  const selectedCourses = normalizeCoursesForValidation(selectedCourseIds, settings);
  if (!selectedCourses.length) {
    return badRequest('Selected courses are invalid');
  }

  const total = selectedCourses.reduce((sum, course) => sum + Number(course.price || 0), 0);
  const recommendation = payload.recommendation || null;
  const quizSummary = payload.quizSummary || null;
  const receipt = formData.get('receipt');
  const receiptFile = receipt && typeof receipt === 'object' && 'arrayBuffer' in receipt ? receipt : null;

  const order = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    customer_name: customer.name,
    customer_phone: customer.phone,
    customer_email: customer.email,
    target_score: customer.targetScore,
    courses: selectedCourses,
    total,
    receipt_name: receiptFile?.name || null,
    recommendation,
    quiz_summary: quizSummary,
    channel: 'website'
  };

  const courseLines = selectedCourses.map((course, index) => `${index + 1}. ${course.title} (${course.edition}) - ${course.price} ر.س`).join('\n');
  const recommendationLine = recommendation?.title
    ? `\nالدورة المقترحة: ${recommendation.title}\nسبب الترشيح: ${recommendation.reason || '-'}\n`
    : '';
  const quizLine = quizSummary?.combinedPercent !== undefined
    ? `\nنتيجة الاختبار داخل الموقع: ${quizSummary.combinedPercent}%\n`
    : '';

  const telegramText = [
    '🛒 <b>طلب شراء جديد من موقع دورات القدرات 2026</b>',
    '',
    `<b>الاسم:</b> ${customer.name}`,
    `<b>رقم التواصل:</b> ${customer.phone}`,
    `<b>البريد الإلكتروني:</b> ${customer.email}`,
    `<b>الدرجة المستهدفة:</b> ${customer.targetScore}`,
    '',
    '<b>الدورات المختارة:</b>',
    courseLines,
    '',
    `<b>الإجمالي:</b> ${total} ر.س`,
    recommendationLine.trim(),
    quizLine.trim(),
    `<b>رقم الطلب:</b> ${order.id}`
  ].filter(Boolean).join('\n');

  const telegram = await sendOrderToTelegram({
    text: telegramText,
    receiptFile,
    receiptName: receiptFile?.name || order.id
  }).catch(error => ({ ok: false, error: error.message }));

  order.telegram = telegram;
  await createOrder(order);

  return json({
    ok: true,
    orderId: order.id,
    total,
    telegram,
    message: telegram?.ok
      ? 'تم إرسال الطلب إلى تيليجرام بنجاح.'
      : 'تم حفظ الطلب، لكن إرسال تيليجرام يحتاج مراجعة إعدادات البوت أو معرف المحادثة.'
  });
}

import { healthHandler, settingsHandler, adminLoginHandler, quizResultsHandler, ordersHandler } from '../lib/handlers.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function readJson(response) {
  const text = await response.text();
  return JSON.parse(text);
}

async function main() {
  const health = await readJson(await healthHandler(new Request('http://local/api/health')));
  assert(health.ok === true, 'health handler failed');

  const settings = await readJson(await settingsHandler(new Request('http://local/api/settings')));
  assert(settings.ok === true, 'settings handler failed');
  assert(Array.isArray(settings.settings.courses), 'settings courses missing');

  const login = await readJson(await adminLoginHandler(new Request('http://local/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'change-me' })
  })));
  assert(login.ok === true && login.token, 'admin login failed');

  const resultPayload = {
    summary: {
      lafzi: { percent: 72, answeredCount: 12, correct: 9 },
      kami: { percent: 68, answeredCount: 10, correct: 7 },
      totalAnswered: 22,
      totalCorrect: 16,
      combinedPercent: 73
    },
    targetScore: 90,
    daysLeft: 12,
    studyHours: 1.5
  };
  const quizResult = await readJson(await quizResultsHandler(new Request('http://local/api/results', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resultPayload)
  })));
  assert(quizResult.ok === true, 'quiz results handler failed');
  assert(quizResult.recommendation?.courseId, 'quiz recommendation missing');

  const formData = new FormData();
  formData.append('payload', JSON.stringify({
    customer: {
      name: 'طالب تجربة',
      phone: '0500000000',
      email: 'student@example.com',
      targetScore: '90'
    },
    courseIds: ['premium', 'intensive'],
    recommendation: quizResult.recommendation,
    quizSummary: resultPayload.summary
  }));
  formData.append('receipt', new File(['fake receipt'], 'receipt.txt', { type: 'text/plain' }));

  const order = await readJson(await ordersHandler(new Request('http://local/api/orders', {
    method: 'POST',
    body: formData
  })));
  assert(order.ok === true, 'order handler failed');
  assert(order.orderId, 'order id missing');

  console.log(JSON.stringify({
    health,
    settingsLoaded: settings.settings.courses.length,
    recommendation: quizResult.recommendation,
    order
  }, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});

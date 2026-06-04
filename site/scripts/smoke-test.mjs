process.env.ADMIN_USERNAME = 'admin';
process.env.ADMIN_PASSWORD = 'secret123';
process.env.ADMIN_SESSION_SECRET = 'super-secret-for-tests';
process.env.PUBLIC_TELEGRAM_LINK = 'https://t.me/qudrat_2026';

const handlers = await import('../lib/handlers.js');

async function readJson(response) {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function run() {
  const settingsRes = await handlers.settingsHandler(new Request('http://local/api/settings'));
  const settingsData = await readJson(settingsRes);
  if (!settingsData?.ok || !Array.isArray(settingsData.settings?.courses)) {
    throw new Error('settingsHandler failed');
  }

  const loginRes = await handlers.adminLoginHandler(new Request('http://local/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'secret123' })
  }));
  const loginData = await readJson(loginRes);
  if (!loginData?.ok || !loginData?.token) {
    throw new Error('adminLoginHandler failed');
  }

  const resultsRes = await handlers.quizResultsHandler(new Request('http://local/api/results', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      summary: {
        lafzi: { percent: 72, answeredCount: 10, correct: 7 },
        kami: { percent: 80, answeredCount: 10, correct: 8 },
        totalAnswered: 20,
        totalCorrect: 15,
        combinedPercent: 75
      },
      targetScore: 90,
      daysLeft: 12,
      studyHours: 1.5
    })
  }));
  const resultsData = await readJson(resultsRes);
  if (!resultsData?.ok || !resultsData?.recommendation?.courseId) {
    throw new Error('quizResultsHandler failed');
  }

  const form = new FormData();
  form.append('payload', JSON.stringify({
    customer: {
      name: 'طالب تجريبي',
      phone: '0500000000',
      email: 'student@example.com',
      targetScore: '90'
    },
    courseIds: ['premium', 'intensive'],
    recommendation: {
      courseId: 'premium',
      title: 'دورة قدرات المميزة',
      reason: 'اختبار دخان'
    },
    quizSummary: {
      combinedPercent: 75,
      totalAnswered: 20
    }
  }));
  form.append('receipt', new File(['fake receipt'], 'receipt.txt', { type: 'text/plain' }));

  const orderRes = await handlers.ordersHandler(new Request('http://local/api/orders', {
    method: 'POST',
    body: form
  }));
  const orderData = await readJson(orderRes);
  if (!orderData?.ok || !orderData?.orderId || orderData.total !== 648) {
    throw new Error('ordersHandler failed');
  }

  const adminOrdersRes = await handlers.adminOrdersHandler(new Request('http://local/api/admin/orders', {
    headers: { Authorization: `Bearer ${loginData.token}` }
  }));
  const adminOrdersData = await readJson(adminOrdersRes);
  if (!adminOrdersData?.ok || !Array.isArray(adminOrdersData.orders) || !adminOrdersData.orders.length) {
    throw new Error('adminOrdersHandler failed');
  }

  console.log('Smoke test passed.');
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});

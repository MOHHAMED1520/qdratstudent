const ADMIN_TOKEN_KEY = 'qudrat_admin_token';

const adminState = {
  token: localStorage.getItem(ADMIN_TOKEN_KEY) || '',
  settings: null,
  orders: [],
  results: []
};

function toast(message) {
  const el = document.getElementById('adminToast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 2600);
}

async function apiRequest(url, options = {}) {
  const headers = new Headers(options.headers || {});
  if (adminState.token) headers.set('Authorization', `Bearer ${adminState.token}`);
  const response = await fetch(url, { ...options, headers });
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json().catch(() => ({}))
    : await response.text().catch(() => '');

  if (!response.ok) {
    const message = typeof data === 'object' ? data.message || 'فشل الطلب.' : 'فشل الطلب.';
    throw new Error(message);
  }
  return data;
}

function setAuthenticated(isAuth) {
  document.getElementById('loginCard').classList.toggle('hidden', isAuth);
  document.getElementById('dashboard').classList.toggle('hidden', !isAuth);
}

function switchTab(tabName) {
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.panel').forEach(panel => {
    panel.classList.toggle('active', panel.dataset.panel === tabName);
  });
}

function formatDate(value) {
  if (!value) return '-';
  try {
    return new Date(value).toLocaleString('ar-SA');
  } catch {
    return value;
  }
}

function formatPrice(value) {
  return `${Number(value || 0)} ر.س`;
}

function renderStats() {
  const orders = adminState.orders || [];
  const results = adminState.results || [];
  const courses = adminState.settings?.courses || [];
  const salesTotal = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);

  document.getElementById('ordersCount').textContent = orders.length;
  document.getElementById('salesTotal').textContent = formatPrice(salesTotal);
  document.getElementById('resultsCount').textContent = results.length;
  document.getElementById('coursesCount').textContent = courses.length;
}

function renderOverview() {
  const orders = adminState.orders || [];
  const results = adminState.results || [];
  const lastOrder = orders[0];
  const lastResult = results[0];
  const overviewList = document.getElementById('overviewList');
  const latestOrdersPreview = document.getElementById('latestOrdersPreview');

  overviewList.innerHTML = `
    <div class="overview-item">
      <strong>وضع تيليجرام</strong>
      <span>التكامل يعمل من خلال متغيرات البيئة في السيرفر. لو ظهر داخل الطلبات “تم الإرسال بنجاح”، يبقى الربط شغال.</span>
    </div>
    <div class="overview-item">
      <strong>آخر طلب</strong>
      <span>${lastOrder ? `${lastOrder.customer_name} — ${formatPrice(lastOrder.total)}` : 'لا توجد طلبات بعد'}</span>
    </div>
    <div class="overview-item">
      <strong>آخر نتيجة اختبار</strong>
      <span>${lastResult ? `${lastResult.summary?.combinedPercent ?? 0}% — ${lastResult.recommendation?.title || 'بدون توصية'}` : 'لا توجد نتائج بعد'}</span>
    </div>
  `;

  latestOrdersPreview.innerHTML = orders.slice(0, 5).map(order => `
    <div class="mini-item">
      <strong>${order.customer_name || 'عميل بدون اسم'} — ${formatPrice(order.total)}</strong>
      <small>${formatDate(order.created_at)}</small>
      <span>${(order.courses || []).map(course => course.title).join('، ') || 'بدون دورات'}</span>
    </div>
  `).join('') || '<div class="mini-item"><strong>لا توجد طلبات بعد</strong><span>بمجرد وصول أول طلب هيظهر هنا.</span></div>';
}

function courseEditorTemplate(course, index) {
  return `
    <article class="course-editor-card" data-index="${index}">
      <div class="card-head compact">
        <div>
          <h4>${course.title}</h4>
          <div class="badge-line">
            <span>${course.id}</span>
            <span>${course.level || 'بدون مستوى'}</span>
          </div>
        </div>
      </div>

      <div class="fields-grid two-col">
        <label><span>اسم الدورة</span><input type="text" data-field="title" value="${course.title || ''}" /></label>
        <label><span>التحديث</span><input type="text" data-field="edition" value="${course.edition || ''}" /></label>
        <label><span>السعر الحالي</span><input type="number" data-field="price" value="${course.price || 0}" /></label>
        <label><span>السعر السابق</span><input type="number" data-field="oldPrice" value="${course.oldPrice || 0}" /></label>
        <label><span>المستوى</span><input type="text" data-field="level" value="${course.level || ''}" /></label>
        <label><span>البادج</span><input type="text" data-field="badge" value="${course.badge || ''}" /></label>
        <label><span>التقييم</span><input type="text" data-field="rating" value="${course.rating || ''}" /></label>
        <label><span>المدة</span><input type="text" data-field="duration" value="${course.duration || ''}" /></label>
        <label><span>الفئة المناسبة</span><input type="text" data-field="target" value="${course.target || ''}" /></label>
        <label><span>لون الخلفية</span><input type="text" data-field="theme" value="${course.theme || ''}" /></label>
      </div>

      <label><span>وصف قصير</span><textarea rows="2" data-field="short">${course.short || ''}</textarea></label>
      <label><span>الأنسب لـ</span><textarea rows="2" data-field="audience">${course.audience || ''}</textarea></label>
      <label><span>الجملة التسويقية</span><textarea rows="2" data-field="sellingPoint">${course.sellingPoint || ''}</textarea></label>
      <label><span>المزايا (كل ميزة في سطر)</span><textarea rows="4" data-array="features">${(course.features || []).join('\n')}</textarea></label>
      <label><span>أسباب الترشيح (كل سبب في سطر)</span><textarea rows="4" data-array="recommendationReasons">${(course.recommendationReasons || []).join('\n')}</textarea></label>
    </article>
  `;
}

function renderSettingsForm() {
  const settings = adminState.settings;
  if (!settings) return;

  document.getElementById('siteName').value = settings.site?.name || '';
  document.getElementById('siteTagline').value = settings.site?.tagline || '';
  document.getElementById('heroTitle').value = settings.site?.heroTitle || '';
  document.getElementById('heroSubtitle').value = settings.site?.heroSubtitle || '';
  document.getElementById('bankName').value = settings.bank?.bankName || '';
  document.getElementById('bankAccountNumber').value = settings.bank?.accountNumber || '';
  document.getElementById('bankIban').value = settings.bank?.iban || '';
  document.getElementById('bankBeneficiary').value = settings.bank?.beneficiary || '';
  document.getElementById('telegramPublicLink').value = settings.telegram?.publicLink || '';
  document.getElementById('telegramUsername').value = settings.telegram?.username || '';
  document.getElementById('coursesEditor').innerHTML = (settings.courses || []).map(courseEditorTemplate).join('');
}

function collectSettingsFromForm() {
  const courses = [...document.querySelectorAll('.course-editor-card')].map(card => {
    const index = Number(card.dataset.index);
    const original = adminState.settings.courses[index];
    const next = { ...original };

    card.querySelectorAll('[data-field]').forEach(input => {
      const field = input.dataset.field;
      next[field] = input.type === 'number' ? Number(input.value || 0) : input.value.trim();
    });

    card.querySelectorAll('[data-array]').forEach(textarea => {
      const field = textarea.dataset.array;
      next[field] = textarea.value.split('\n').map(item => item.trim()).filter(Boolean);
    });

    return next;
  });

  return {
    site: {
      name: document.getElementById('siteName').value.trim(),
      tagline: document.getElementById('siteTagline').value.trim(),
      heroTitle: document.getElementById('heroTitle').value.trim(),
      heroSubtitle: document.getElementById('heroSubtitle').value.trim()
    },
    bank: {
      bankName: document.getElementById('bankName').value.trim(),
      accountNumber: document.getElementById('bankAccountNumber').value.trim(),
      iban: document.getElementById('bankIban').value.trim(),
      beneficiary: document.getElementById('bankBeneficiary').value.trim()
    },
    telegram: {
      publicLink: document.getElementById('telegramPublicLink').value.trim(),
      username: document.getElementById('telegramUsername').value.trim()
    },
    courses
  };
}

function renderOrders() {
  const body = document.getElementById('ordersTableBody');
  const orders = adminState.orders || [];
  body.innerHTML = orders.map(order => {
    const telegramOk = order.telegram?.ok;
    return `
      <tr>
        <td>${formatDate(order.created_at)}</td>
        <td>
          <strong>${order.customer_name || '-'}</strong><br />
          <small>${order.customer_phone || '-'}</small><br />
          <small>${order.customer_email || '-'}</small>
        </td>
        <td>
          <div class="inline-course-list">
            ${(order.courses || []).map(course => `<span>${course.title}</span>`).join('') || '<span>-</span>'}
          </div>
        </td>
        <td>${formatPrice(order.total)}</td>
        <td>${order.target_score || '-'}</td>
        <td>${telegramOk ? '<span class="badge-ok">تم الإرسال</span>' : '<span class="badge-warn">يحتاج مراجعة</span>'}</td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="6">لا توجد طلبات بعد.</td></tr>';
}

function renderResults() {
  const body = document.getElementById('resultsTableBody');
  const results = adminState.results || [];
  body.innerHTML = results.map(result => `
    <tr>
      <td>${formatDate(result.created_at)}</td>
      <td>${result.summary?.combinedPercent ?? 0}%</td>
      <td>${result.summary?.lafzi?.percent ?? 0}%</td>
      <td>${result.summary?.kami?.percent ?? 0}%</td>
      <td>
        <strong>${result.recommendation?.title || '-'}</strong><br />
        <small>${result.recommendation?.reason || ''}</small>
      </td>
      <td>
        الهدف: ${result.meta?.targetScore ?? '-'}<br />
        الأيام: ${result.meta?.daysLeft ?? '-'}<br />
        الساعات: ${result.meta?.studyHours ?? '-'}
      </td>
    </tr>
  `).join('') || '<tr><td colspan="6">لا توجد نتائج اختبارات بعد.</td></tr>';
}

async function loadSettings() {
  const response = await apiRequest('/api/admin/settings');
  adminState.settings = response.settings;
}

async function loadOrders() {
  const response = await apiRequest('/api/admin/orders');
  adminState.orders = response.orders || [];
}

async function loadResults() {
  const response = await apiRequest('/api/admin/results');
  adminState.results = response.results || [];
}

async function refreshAll() {
  await Promise.all([loadSettings(), loadOrders(), loadResults()]);
  renderSettingsForm();
  renderOrders();
  renderResults();
  renderStats();
  renderOverview();
}

async function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  try {
    const response = await apiRequest('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    adminState.token = response.token;
    localStorage.setItem(ADMIN_TOKEN_KEY, response.token);
    setAuthenticated(true);
    await refreshAll();
    toast('تم تسجيل الدخول بنجاح.');
  } catch (error) {
    toast(error.message || 'بيانات الدخول غير صحيحة.');
  }
}

async function saveSettings(event) {
  event.preventDefault();
  const settings = collectSettingsFromForm();

  try {
    const response = await apiRequest('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings })
    });

    adminState.settings = response.settings;
    renderSettingsForm();
    renderStats();
    toast('تم حفظ الإعدادات بنجاح.');
  } catch (error) {
    toast(error.message || 'تعذر حفظ الإعدادات.');
  }
}

function logout() {
  adminState.token = '';
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  setAuthenticated(false);
  toast('تم تسجيل الخروج.');
}

function bindEvents() {
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('settingsForm').addEventListener('submit', saveSettings);
  document.getElementById('logoutBtn').addEventListener('click', logout);
  document.getElementById('refreshAllBtn').addEventListener('click', async () => {
    try {
      await refreshAll();
      toast('تم تحديث البيانات.');
    } catch (error) {
      toast(error.message || 'تعذر تحديث البيانات.');
    }
  });
  document.getElementById('refreshOrdersBtn').addEventListener('click', async () => {
    try {
      await loadOrders();
      renderOrders();
      renderStats();
      renderOverview();
      toast('تم تحديث الطلبات.');
    } catch (error) {
      toast(error.message || 'تعذر تحديث الطلبات.');
    }
  });
  document.getElementById('refreshResultsBtn').addEventListener('click', async () => {
    try {
      await loadResults();
      renderResults();
      renderStats();
      renderOverview();
      toast('تم تحديث النتائج.');
    } catch (error) {
      toast(error.message || 'تعذر تحديث النتائج.');
    }
  });

  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

async function boot() {
  bindEvents();
  if (!adminState.token) {
    setAuthenticated(false);
    return;
  }

  try {
    setAuthenticated(true);
    await refreshAll();
  } catch (error) {
    logout();
    toast(error.message || 'انتهت جلسة الإدارة.');
  }
}

boot();

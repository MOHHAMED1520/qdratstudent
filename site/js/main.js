const STORAGE_KEY = 'qudrat_store_cart_v2';
const ADMIN_TOKEN_KEY = 'qudrat_admin_token';

const defaultCourses = [
  {
    id: 'basic',
    title: 'دورة قدرات الأساسية',
    edition: 'تحديث 2026',
    price: 149,
    oldPrice: 299,
    level: 'بداية التأسيس',
    rating: 'الأفضل للمبتدئين',
    badge: 'خصم 50%',
    short: 'مناسبة للطالب الذي يريد تأسيس واضح وبداية منظمة من الصفر أو من مستوى متذبذب.',
    audience: 'لمن نتيجته أقل من 60 أو يحتاج تأسيس القواعد خطوة بخطوة.',
    duration: '4 أسابيع',
    target: 'حتى 75+',
    theme: 'linear-gradient(135deg, #0f9f6e, #10b981)',
    recommendationReasons: [
      'إذا كنت تشعر أن أساسك غير ثابت فهذه الدورة تمنحك بداية مرتبة بعيداً عن التشتت.',
      'سعرها الاقتصادي يجعلها المدخل الأنسب لتبدأ فوراً بدون تأجيل.',
      'تأخذك من فهم الأساسيات إلى القدرة على حل الأنماط الشائعة بثقة أكبر.'
    ],
    features: [
      'تأسيس اللفظي من العلاقات، الإكمال، والاستيعاب بشكل مبسط.',
      'تأسيس الكمي من النسب، الأعداد، المسائل اللفظية، والهندسة الأساسية.',
      'خطة تعلم تدريجية مناسبة للمبتدئ.',
      'شرح مختصر وواضح يزيل رهبة البداية.'
    ],
    sellingPoint: 'ابدأ صح قبل ما تبحث عن الرفع السريع.'
  },
  {
    id: 'premium',
    title: 'دورة قدرات المميزة',
    edition: 'نسختها الحديثة لاختبار القدرات 2026',
    price: 349,
    oldPrice: 749,
    level: 'رفع الدرجات',
    rating: 'هدفك +90',
    badge: 'الأقوى لرفع الدرجة',
    short: 'موجهة للطالب الطموح الذي يريد الوصول لدرجة عالية جداً مع مسار أقوى وأذكى.',
    audience: 'لمن هدفه 90+ أو لديه أساس جيد ويريد القفز إلى مستوى أعلى.',
    duration: '6 أسابيع',
    target: '90+ بإذن الله',
    theme: 'linear-gradient(135deg, #7c3aed, #ec4899)',
    recommendationReasons: [
      'إذا هدفك درجة عالية جداً فهذه ليست مجرد دورة تأسيس، بل مسار رفع حقيقي للنتيجة.',
      'تجمع بين الإتقان والتكتيك، لذلك تناسب الطالب الذي يريد التميز لا مجرد النجاح.',
      'السعر الحالي أقل بكثير من قيمتها الأصلية، وهذه فرصة ممتازة قبل عودة السعر الأعلى.'
    ],
    features: [
      'استراتيجيات متقدمة لأسئلة اللفظي والكمي الشائعة والصعبة.',
      'بناء سرعة حل مع دقة أعلى للطلاب المستهدفين 90+.',
      'تركيز على نقاط الفرق التي ترفع الدرجة النهائية.',
      'مناسبة للطالب الجاد الذي يريد بداية صحيحة لمسار الدرجة العالية.'
    ],
    sellingPoint: 'هدفك درجة عالية +90… فهنا البداية الصح!'
  },
  {
    id: 'intensive',
    title: 'دورة قدرات المكثفة',
    edition: 'تحديث 2026',
    price: 299,
    oldPrice: 549,
    level: 'استعداد سريع',
    rating: 'الأفضل للوقت الضيق',
    badge: 'نتيجة أسرع',
    short: 'مثالية إذا كان موعد الاختبار قريب وتحتاج خطة أسرع وأشد تركيزاً.',
    audience: 'لمن وقته ضيق ويريد استثمار الأيام المتبقية بأقصى كفاءة.',
    duration: '14 يوم',
    target: 'قفزة سريعة',
    theme: 'linear-gradient(135deg, #f97316, #f59e0b)',
    recommendationReasons: [
      'إذا لم يبق على اختبارك وقت طويل فالمهم الآن هو التركيز على الأكثر تأثيراً لا التوسع المرهق.',
      'هذه الدورة مصممة لتضغط لك المفيد في وقت قصير وتدفعك لنتيجة أسرع.',
      'بدلاً من التشتت بين مصادر كثيرة، ستحصل على مسار مكثف وواضح يقودك مباشرة للحل العملي.'
    ],
    features: [
      'تركيز على أهم الأسئلة والتكرارات والأنماط ذات العائد الأعلى.',
      'خطة سريعة قبل الاختبار للطالب المستعجل.',
      'ترتيب الأولويات لتقليل إهدار الوقت.',
      'مناسبة جداً لفترة المراجعة الأخيرة والرفع السريع.'
    ],
    sellingPoint: 'مثالية إذا وقتك ضيق وتحتاج نتيجة سريعة قبل الاختبار.'
  },
  {
    id: 'comprehensive',
    title: 'دورة قدرات الشاملة',
    edition: 'تحديث 2026',
    price: 249,
    oldPrice: 399,
    level: 'مسار متوازن',
    rating: 'أفضل توازن',
    badge: 'الأكثر توازناً',
    short: 'مسار متكامل يجمع بين البناء والمراجعة بشكل مرتب لمن يريد رحلة متوازنة.',
    audience: 'لمن يريد تأسيس جيد مع مراجعة منظمة وتدرج واضح في الصعوبة.',
    duration: '5 أسابيع',
    target: '80 - 88',
    theme: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
    recommendationReasons: [
      'إذا مستواك متوسط وتريد دورة تجمع بين التأسيس والمراجعة فهذه أنسب نقطة توازن.',
      'لن تضيع بين دورة للمبتدئ تماماً أو دورة متقدمة جداً؛ هذه تعطيك مساراً عملياً ومتدرجاً.',
      'سعرها مناسب جداً مقابل شمولها، لذلك تعتبر خياراً ذكياً لمن يريد قيمة قوية بسعر متزن.'
    ],
    features: [
      'بناء أساس قوي ثم مراجعة خطوة بخطوة.',
      'تغطية متوازنة لاحتياجات أغلب الطلاب.',
      'تنظيم واضح للمحتوى من الأسهل إلى الأعلى.',
      'مسار مناسب للطالب الذي يريد الثبات والتحسن المتدرج.'
    ],
    sellingPoint: 'مناسبة تبني أساس قوي وتراجع خطوة بخطوة.'
  }
];

const defaultSettings = {
  site: {
    name: 'مبادرة حلم',
    tagline: 'قدرات ثانوية 2026',
    heroTitle: 'اختَر دورة القدرات المناسبة لك وارفع فرصتك لتحقيق الدرجة التي تستهدفها',
    heroSubtitle: 'منصة مبادرة حلم لدورات القدرات الثانوية 2026 — تجربة عصرية متكاملة، تفاصيل مرتبة لكل دورة، سلة شراء تلقائية، واختبار تحديد مستوى ذكي يرشدك للمسار الأنسب.'
  },
  bank: {
    bankName: 'بنك الإنماء',
    accountNumber: '68206067557000',
    iban: 'SA4905000068206067557000',
    beneficiary: 'Creative Global Institution'
  },
  telegram: {
    publicLink: 'https://t.me/qiyas_2026_2030',
    username: '@qiyas_2026_2030'
  },
  courses: defaultCourses
};

const state = {
  settings: deepClone(defaultSettings),
  cart: [],
  courseFilter: 'all',
  lafziAnswered: new Array(lafziQuestions.length).fill(null),
  kamiAnswered: new Array(kamiQuestions.length).fill(null),
  lafziFiltered: [],
  kamiFiltered: [],
  lafziCurrentIdx: 0,
  kamiCurrentIdx: 0,
  lafziCategory: 'all',
  kamiCategory: 'all',
  latestOrderSummary: '',
  latestOrderBlobUrl: '',
  latestRecommendation: null,
  latestOrderResponse: null,
  settingsLoaded: false
};

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getCourses() {
  return Array.isArray(state.settings?.courses) && state.settings.courses.length
    ? state.settings.courses
    : defaultCourses;
}

function getTelegramLink() {
  return state.settings?.telegram?.publicLink || 'https://t.me/qudrat_2026';
}

function getTelegramUsername() {
  const explicit = state.settings?.telegram?.username;
  if (explicit) return explicit.startsWith('@') ? explicit : `@${explicit}`;
  const link = getTelegramLink();
  try {
    const url = new URL(link);
    const username = url.pathname.replace(/^\//, '').split('/')[0];
    return username ? `@${username}` : '@qiyas_2026_2030';
  } catch {
    return '@qiyas_2026_2030';
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.dataset.type = type;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

async function apiRequest(url, options = {}) {
  const response = await fetch(url, options);
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json().catch(() => ({}))
    : await response.text().catch(() => '');

  if (!response.ok) {
    const message = typeof data === 'object' ? data.message || 'تعذر إكمال العملية.' : 'تعذر إكمال العملية.';
    throw new Error(message);
  }
  return data;
}

function createCourseIllustration(course) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.04"/>
      </linearGradient>
    </defs>
    <rect width="320" height="320" rx="42" fill="url(#g)"/>
    <circle cx="245" cy="70" r="38" fill="#ffffff" fill-opacity="0.15"/>
    <circle cx="85" cy="250" r="62" fill="#ffffff" fill-opacity="0.10"/>
    <rect x="70" y="60" width="180" height="210" rx="24" fill="#ffffff" fill-opacity="0.90"/>
    <rect x="92" y="92" width="136" height="20" rx="10" fill="#2563eb" fill-opacity="0.16"/>
    <rect x="92" y="126" width="108" height="14" rx="7" fill="#94a3b8" fill-opacity="0.40"/>
    <rect x="92" y="150" width="120" height="14" rx="7" fill="#94a3b8" fill-opacity="0.28"/>
    <rect x="92" y="174" width="98" height="14" rx="7" fill="#94a3b8" fill-opacity="0.28"/>
    <rect x="92" y="206" width="72" height="32" rx="16" fill="#f97316" fill-opacity="0.85"/>
    <text x="128" y="227" font-size="16" text-anchor="middle" fill="#ffffff" font-family="Tajawal, Arial">${course.price} ر.س</text>
    <path d="M204 230 l16 16 l34 -42" stroke="#10b981" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function formatPrice(value) {
  return `${Number(value || 0)} ر.س`;
}

function getCourse(courseId) {
  return getCourses().find(course => course.id === courseId);
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

function loadCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    state.cart = Array.isArray(parsed) ? parsed : [];
  } catch {
    state.cart = [];
  }
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.getElementById('mainNav')?.classList.remove('open');
}

function toggleMenu() {
  document.getElementById('mainNav')?.classList.toggle('open');
}

function toggleCart(open) {
  const drawer = document.getElementById('cartDrawer');
  drawer.classList.toggle('open', open);
  drawer.setAttribute('aria-hidden', String(!open));
}

function filterStoreCourses(level) {
  state.courseFilter = level;
  document.querySelectorAll('.course-filter-chips .chip').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === level);
  });
  renderCourses();
}

function addToCart(courseId) {
  if (!getCourse(courseId)) return;
  if (state.cart.includes(courseId)) {
    showToast('هذه الدورة موجودة بالفعل في السلة.');
    toggleCart(true);
    return;
  }
  state.cart.push(courseId);
  saveCart();
  renderCart();
  renderCheckoutSummary();
  showToast('تمت إضافة الدورة إلى السلة بنجاح.', 'success');
}

function removeFromCart(courseId) {
  state.cart = state.cart.filter(id => id !== courseId);
  saveCart();
  renderCart();
  renderCheckoutSummary();
  showToast('تم حذف الدورة من السلة.');
}

function getCartCourses() {
  return state.cart.map(id => getCourse(id)).filter(Boolean);
}

function getCartTotal() {
  return getCartCourses().reduce((sum, course) => sum + Number(course.price || 0), 0);
}

function updateCartCounter() {
  const count = state.cart.length;
  const countEl = document.getElementById('cartCount');
  const orderItemsCount = document.getElementById('orderItemsCount');
  if (countEl) countEl.textContent = count;
  if (orderItemsCount) orderItemsCount.textContent = `${count} ${count === 1 ? 'عنصر' : 'عناصر'}`;
}

function renderCourses() {
  const grid = document.getElementById('coursesGrid');
  const courses = getCourses();
  const filteredCourses = state.courseFilter === 'all'
    ? courses
    : courses.filter(course => course.level === state.courseFilter);

  grid.innerHTML = filteredCourses.map(course => `
    <article class="course-card">
      <div class="course-visual">
        <div class="course-badge-row">
          <span class="sale-badge">${escapeHtml(course.badge || 'عرض خاص')}</span>
          <span class="level-badge">${escapeHtml(course.level || '')}</span>
        </div>
        <div class="course-visual-inner" style="background:${escapeHtml(course.theme || 'linear-gradient(135deg, #1d4ed8, #0ea5e9)')}">
          <div class="course-visual-copy">
            <small>${escapeHtml(course.edition || 'تحديث 2026')}</small>
            <h3>${escapeHtml(course.title)}</h3>
          </div>
          <img src="${createCourseIllustration(course)}" alt="صورة توضيحية ${escapeHtml(course.title)}" loading="lazy" />
        </div>
      </div>
      <div class="course-body">
        <div class="course-title-row">
          <div>
            <h3>${escapeHtml(course.title)} <small>(${escapeHtml(course.edition || '')})</small></h3>
            <p class="course-subtitle">${escapeHtml(course.short || '')}</p>
          </div>
          <div class="rating-chip">${escapeHtml(course.rating || '')}</div>
        </div>

        <div class="price-line">
          <strong class="current-price">${formatPrice(course.price)}</strong>
          <span class="old-price">بدلاً من ${formatPrice(course.oldPrice)}</span>
        </div>

        <ul class="course-meta">
          <li><small>الأنسب لـ</small>${escapeHtml(course.audience || '')}</li>
          <li><small>المدة المقترحة</small>${escapeHtml(course.duration || '')}</li>
          <li><small>الهدف المتوقع</small>${escapeHtml(course.target || '')}</li>
        </ul>

        <ul class="course-feature-list">
          ${(course.features || []).slice(0, 3).map(item => `<li><i class="fas fa-check-circle"></i> ${escapeHtml(item)}</li>`).join('')}
        </ul>

        <details class="course-details">
          <summary>عرض المحتوى والتفاصيل</summary>
          <div style="margin-top:14px;">
            <p style="font-weight:800; margin-bottom:10px;">شرح مختصر:</p>
            <p style="margin-bottom:14px; color:var(--muted);">${escapeHtml(course.sellingPoint || '')}</p>
            <ul class="course-feature-list">
              ${(course.features || []).map(item => `<li>${escapeHtml(item)}</li>`).join('')}
            </ul>
          </div>
        </details>

        <div class="course-actions">
          <button class="btn btn-primary" type="button" onclick="addToCart('${course.id}')">
            <i class="fas fa-cart-plus"></i>
            إضافة إلى السلة
          </button>
          <button class="course-secondary-btn" type="button" onclick="recommendSpecificCourse('${course.id}')" title="رشّح لي هذه الدورة">
            <i class="fas fa-star"></i>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderComparisonTable() {
  const body = document.getElementById('comparisonBody');
  body.innerHTML = getCourses().map(course => `
    <tr>
      <td><strong>${escapeHtml(course.title)}</strong><br><small>${escapeHtml(course.edition || '')}</small></td>
      <td>${escapeHtml(course.audience || '')}</td>
      <td><strong>${formatPrice(course.price)}</strong></td>
      <td><span class="old-price">${formatPrice(course.oldPrice)}</span></td>
      <td class="table-cta">${escapeHtml(course.sellingPoint || '')}</td>
    </tr>
  `).join('');
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const courses = getCartCourses();
  updateCartCounter();

  if (!courses.length) {
    container.innerHTML = `
      <div class="placeholder-state" style="padding:30px 10px; min-height: 260px;">
        <i class="fas fa-bag-shopping"></i>
        <h3>سلتك فارغة حالياً</h3>
        <p>أضف الدورات التي تناسبك وسيتم حساب الإجمالي هنا مباشرة.</p>
      </div>
    `;
    document.getElementById('cartTotal').textContent = formatPrice(0);
    return;
  }

  container.innerHTML = `
    <div class="cart-list">
      ${courses.map(course => `
        <div class="cart-item">
          <div>
            <strong>${escapeHtml(course.title)}</strong>
            <small>${escapeHtml(course.edition || '')}</small>
          </div>
          <div style="text-align:left;">
            <div class="price">${formatPrice(course.price)}</div>
            <button class="cart-remove-btn" type="button" onclick="removeFromCart('${course.id}')">إزالة</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('cartTotal').textContent = formatPrice(getCartTotal());
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkoutSummary');
  const courses = getCartCourses();
  updateCartCounter();

  if (!courses.length) {
    container.innerHTML = `
      <div class="placeholder-state" style="padding:24px 6px; min-height: 240px;">
        <i class="fas fa-cart-shopping"></i>
        <h3>لا توجد دورات في الطلب</h3>
        <p>ابدأ بإضافة الدورات إلى السلة، ثم عد إلى هذه الصفحة لإكمال الشراء.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="order-list">
      ${courses.map(course => `
        <div class="order-item">
          <div>
            <strong>${escapeHtml(course.title)}</strong>
            <small>${escapeHtml(course.edition || '')}</small>
          </div>
          <div class="price">${formatPrice(course.price)}</div>
        </div>
      `).join('')}
      <div class="summary-total">
        <span>الإجمالي النهائي</span>
        <strong>${formatPrice(getCartTotal())}</strong>
      </div>
    </div>
  `;
}

function goToCheckout() {
  if (!state.cart.length) {
    showToast('السلة فارغة، أضف دورة واحدة على الأقل أولاً.');
    return;
  }
  toggleCart(false);
  scrollToSection('checkout');
}

function getCategories(questions) {
  const set = new Set(['all']);
  questions.forEach(q => set.add(q.category));
  return [...set];
}

function showQuizTab(type, btn) {
  document.querySelectorAll('.quiz-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));
  document.getElementById(`${type}-tab`).classList.add('active');
  btn.classList.add('active');
}

function buildQuiz(containerId, questions, quizType) {
  const container = document.getElementById(containerId);
  const filtered = quizType === 'lafzi' ? state.lafziFiltered : state.kamiFiltered;
  const currentIdx = quizType === 'lafzi' ? state.lafziCurrentIdx : state.kamiCurrentIdx;
  const answered = quizType === 'lafzi' ? state.lafziAnswered : state.kamiAnswered;
  const selectedCategory = quizType === 'lafzi' ? state.lafziCategory : state.kamiCategory;
  const categories = getCategories(questions);

  if (!filtered.length) {
    container.innerHTML = '<div class="question-card"><p class="quiz-empty">لا توجد أسئلة حالياً في هذا التصنيف.</p></div>';
    return;
  }

  const question = filtered[currentIdx];
  const globalIdx = questions.findIndex(q => q.id === question.id);
  const userAnswer = answered[globalIdx];
  const isAnswered = userAnswer !== null;
  const correctCount = answered.filter((a, i) => a !== null && a === questions[i].correct).length;
  const answeredCount = answered.filter(a => a !== null).length;
  const percent = filtered.length ? Math.round(((currentIdx + 1) / filtered.length) * 100) : 0;
  const letters = ['أ', 'ب', 'ج', 'د'];

  container.innerHTML = `
    <div class="category-tabs">
      ${categories.map(cat => `
        <button class="cat-tab ${selectedCategory === cat ? 'active' : ''}" type="button" onclick="filterCategory('${quizType}', '${cat.replace(/'/g, "\\'")}')">
          ${cat === 'all' ? '📚 الكل' : escapeHtml(cat)}
        </button>
      `).join('')}
    </div>

    <div class="quiz-info-bar">
      <div class="quiz-score-live"><i class="fas fa-check"></i> الصحيحة: ${correctCount}</div>
      <div class="quiz-wrong-live"><i class="fas fa-times"></i> الخاطئة: ${answeredCount - correctCount}</div>
      <div class="quiz-total-live"><i class="fas fa-list"></i> المعروضة: ${filtered.length}</div>
    </div>

    <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${percent}%"></div></div>
    <div class="progress-text">السؤال ${currentIdx + 1} من ${filtered.length}</div>

    <div class="question-card">
      <div class="q-header">
        <div class="q-num">${currentIdx + 1}</div>
        <div class="q-category">${escapeHtml(question.category)}</div>
      </div>
      <div class="q-text">${escapeHtml(question.text).replace(/\n/g, '<br>')}</div>
      <div class="options-grid">
        ${question.options.map((option, idx) => {
          let cls = '';
          let icon = letters[idx];
          if (isAnswered && idx === question.correct) {
            cls = 'correct';
            icon = '✓';
          } else if (isAnswered && idx === userAnswer && userAnswer !== question.correct) {
            cls = 'wrong';
            icon = '✗';
          }
          return `
            <button class="option-btn ${cls}" type="button" ${isAnswered ? 'disabled' : ''}
              onclick="${isAnswered ? '' : `selectAnswer('${quizType}', ${idx}, '${question.id}')`}">
              <span class="option-letter">${icon}</span>
              <span>${escapeHtml(option)}</span>
            </button>
          `;
        }).join('')}
      </div>

      ${isAnswered ? (userAnswer === question.correct
        ? `<div class="feedback-box correct"><i class="fas fa-circle-check"></i> إجابة صحيحة، ممتاز!</div>`
        : `<div class="feedback-box wrong"><i class="fas fa-circle-xmark"></i> الإجابة الصحيحة: <strong>${letters[question.correct]}) ${escapeHtml(question.options[question.correct])}</strong></div>`) : ''}

      ${isAnswered && question.explanation ? `<div class="explanation-box"><strong>التوضيح:</strong> ${escapeHtml(question.explanation)}</div>` : ''}

      <div class="nav-btns">
        ${currentIdx > 0 ? `<button class="nav-btn prev" type="button" onclick="prevQuestion('${quizType}')"><i class="fas fa-arrow-right"></i> السابق</button>` : ''}
        <button class="nav-btn next" type="button" onclick="nextQuestion('${quizType}')">التالي <i class="fas fa-arrow-left"></i></button>
      </div>
    </div>

    ${currentIdx === filtered.length - 1 && isAnswered ? renderFinalScore(quizType, questions, answered) : ''}
  `;
}

function renderFinalScore(quizType, questions, answered) {
  const correct = answered.filter((a, i) => a !== null && a === questions[i].correct).length;
  const answeredCount = answered.filter(a => a !== null).length;
  const percent = answeredCount ? Math.round((correct / answeredCount) * 100) : 0;

  let label = 'ابدأ بالتأسيس ثم أعد التدريب.';
  let emoji = '📘';
  if (percent >= 90) { label = 'مستواك قوي جداً — أنت قريب من مسار 90+.'; emoji = '🏆'; }
  else if (percent >= 75) { label = 'مستواك جيد جداً — أنت جاهز لمرحلة رفع أعلى.'; emoji = '🌟'; }
  else if (percent >= 60) { label = 'مستواك متوسط — تحتاج مساراً متوازناً مع مراجعة ذكية.'; emoji = '🚀'; }
  else if (percent >= 40) { label = 'تحتاج دعماً أوضح في الأساسيات وبعض المراجعة.'; emoji = '💪'; }

  return `
    <div class="score-panel">
      <div style="font-size:3rem;">${emoji}</div>
      <div class="score-big">${percent}%</div>
      <div class="score-label">${label}</div>
      <div class="score-details">
        <div class="score-stat"><span>${correct}</span><span>صحيح</span></div>
        <div class="score-stat"><span>${answeredCount - correct}</span><span>خاطئ</span></div>
        <div class="score-stat"><span>${questions.length - answeredCount}</span><span>غير مجاب</span></div>
      </div>
      <div class="telegram-actions" style="justify-content:center; margin-top:18px;">
        <button class="btn btn-soft" type="button" onclick="applyQuizScoreToAdvisor()"><i class="fas fa-wand-magic-sparkles"></i> استخدم نتيجتي في الموصي</button>
        <button class="restart-btn" type="button" onclick="restartQuiz('${quizType}')"><i class="fas fa-rotate-right"></i> إعادة الاختبار</button>
      </div>
    </div>
  `;
}

function selectAnswer(quizType, optionIdx, questionId) {
  const questions = quizType === 'lafzi' ? lafziQuestions : kamiQuestions;
  const answered = quizType === 'lafzi' ? state.lafziAnswered : state.kamiAnswered;
  const globalIdx = questions.findIndex(q => q.id === questionId);
  if (answered[globalIdx] !== null) return;
  answered[globalIdx] = optionIdx;
  buildQuiz(quizType === 'lafzi' ? 'lafziQuiz' : 'kamiQuiz', questions, quizType);
  renderAssessmentSummary();
}

function nextQuestion(quizType) {
  if (quizType === 'lafzi') {
    if (state.lafziCurrentIdx < state.lafziFiltered.length - 1) state.lafziCurrentIdx++;
    buildQuiz('lafziQuiz', lafziQuestions, 'lafzi');
  } else {
    if (state.kamiCurrentIdx < state.kamiFiltered.length - 1) state.kamiCurrentIdx++;
    buildQuiz('kamiQuiz', kamiQuestions, 'kami');
  }
}

function prevQuestion(quizType) {
  if (quizType === 'lafzi') {
    if (state.lafziCurrentIdx > 0) state.lafziCurrentIdx--;
    buildQuiz('lafziQuiz', lafziQuestions, 'lafzi');
  } else {
    if (state.kamiCurrentIdx > 0) state.kamiCurrentIdx--;
    buildQuiz('kamiQuiz', kamiQuestions, 'kami');
  }
}

function filterCategory(quizType, category) {
  const questions = quizType === 'lafzi' ? lafziQuestions : kamiQuestions;
  if (quizType === 'lafzi') {
    state.lafziCategory = category;
    state.lafziFiltered = category === 'all' ? [...questions] : questions.filter(q => q.category === category);
    state.lafziCurrentIdx = 0;
    buildQuiz('lafziQuiz', lafziQuestions, 'lafzi');
  } else {
    state.kamiCategory = category;
    state.kamiFiltered = category === 'all' ? [...questions] : questions.filter(q => q.category === category);
    state.kamiCurrentIdx = 0;
    buildQuiz('kamiQuiz', kamiQuestions, 'kami');
  }
}

function restartQuiz(quizType) {
  if (quizType === 'lafzi') {
    state.lafziAnswered = new Array(lafziQuestions.length).fill(null);
    state.lafziCategory = 'all';
    state.lafziCurrentIdx = 0;
    state.lafziFiltered = [...lafziQuestions];
    buildQuiz('lafziQuiz', lafziQuestions, 'lafzi');
  } else {
    state.kamiAnswered = new Array(kamiQuestions.length).fill(null);
    state.kamiCategory = 'all';
    state.kamiCurrentIdx = 0;
    state.kamiFiltered = [...kamiQuestions];
    buildQuiz('kamiQuiz', kamiQuestions, 'kami');
  }
  renderAssessmentSummary();
}

function getQuizStats(questions, answers) {
  const answeredCount = answers.filter(a => a !== null).length;
  const correct = answers.filter((a, i) => a !== null && a === questions[i].correct).length;
  const percent = answeredCount ? Math.round((correct / answeredCount) * 100) : 0;
  return { answeredCount, correct, percent };
}

function getQuizSummary() {
  const lafzi = getQuizStats(lafziQuestions, state.lafziAnswered);
  const kami = getQuizStats(kamiQuestions, state.kamiAnswered);
  const totalAnswered = lafzi.answeredCount + kami.answeredCount;
  const totalCorrect = lafzi.correct + kami.correct;
  const combinedPercent = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : null;
  return { lafzi, kami, totalAnswered, totalCorrect, combinedPercent };
}

function renderAssessmentSummary() {
  const container = document.getElementById('assessmentSummary');
  const summary = getQuizSummary();
  container.innerHTML = `
    <div class="assessment-mini-card"><strong>${summary.lafzi.percent}%</strong><span>اللفظي</span></div>
    <div class="assessment-mini-card"><strong>${summary.kami.percent}%</strong><span>الكمي</span></div>
    <div class="assessment-mini-card"><strong>${summary.combinedPercent ?? 0}%</strong><span>المتوسط العام</span></div>
    <div class="assessment-mini-card"><strong>${summary.totalAnswered}</strong><span>عدد الإجابات الحالية</span></div>
  `;
}

function applyQuizScoreToAdvisor() {
  const summary = getQuizSummary();
  if (summary.combinedPercent === null) {
    showToast('أجب على بعض أسئلة التحديد أولاً حتى نستخدم نتيجتك.');
    return;
  }
  document.getElementById('currentScore').value = summary.combinedPercent;
  document.getElementById('useQuizScore').checked = true;
  showToast(`تم جلب متوسط نتيجتك الحالية: ${summary.combinedPercent}%`, 'success');
  scrollToSection('advisor');
}

function chooseCourseRecommendation({ score, target, daysLeft, studyHours }) {
  const map = new Map(getCourses().map(course => [course.id, course]));
  let recommended = map.get('comprehensive') || getCourses()[0];
  const reasons = [];

  if (daysLeft !== null && daysLeft <= 14 && map.get('intensive')) {
    recommended = map.get('intensive');
    reasons.push('موعد الاختبار قريب، لذلك تحتاج خطة سريعة ومركزة على أعلى عائد في أقل وقت.');
  }

  if (score !== null && score < 60 && map.get('basic')) {
    recommended = map.get('basic');
    reasons.push('نتيجتك الحالية تشير إلى حاجة واضحة لتثبيت الأساسيات قبل الانتقال لمسارات أعلى.');
  }

  if ((target !== null && target >= 90) && map.get('premium')) {
    recommended = map.get('premium');
    reasons.push('هدفك مرتفع ويحتاج مساراً أقوى من مجرد التأسيس أو المراجعة العامة.');
  }

  if ((score !== null && score >= 60 && score < 80) && !(target !== null && target >= 90) && !(daysLeft !== null && daysLeft <= 14) && map.get('comprehensive')) {
    recommended = map.get('comprehensive');
    reasons.push('مستواك الحالي متوسط، وأفضل خيار لك هو مسار متوازن يبني ويراجع في الوقت نفسه.');
  }

  if ((studyHours !== null && studyHours <= 1.5) && (daysLeft !== null && daysLeft <= 21) && map.get('intensive')) {
    recommended = map.get('intensive');
    reasons.push('عدد ساعات المذاكرة اليومي محدود، لذلك الأفضل لك دورة مركزة تساعدك على استثمار وقتك بذكاء.');
  }

  if (!reasons.length) {
    reasons.push('اختيارنا لك مبني على الموازنة بين مستواك الحالي، هدفك، وكمية الوقت المتاحة قبل الاختبار.');
  }

  return {
    recommended,
    reasons,
    persuasive: Array.isArray(recommended?.recommendationReasons) ? recommended.recommendationReasons : []
  };
}

function renderRecommendationCard({ recommended, reasons = [], persuasive = [] }) {
  const result = document.getElementById('advisorResult');
  if (!recommended) return;

  result.innerHTML = `
    <div class="advice-result-card">
      <div class="advice-top">
        <div class="advice-badge" style="background:${escapeHtml(recommended.theme || 'linear-gradient(135deg, #1d4ed8, #0ea5e9)')}"><i class="fas fa-star"></i></div>
        <div class="advice-copy">
          <h3>نرشّح لك: ${escapeHtml(recommended.title)}</h3>
          <p>${escapeHtml(recommended.sellingPoint || '')}</p>
        </div>
      </div>

      <div class="advice-price-line">
        <span class="current-price">${formatPrice(recommended.price)}</span>
        <span class="old-price">بدلاً من ${formatPrice(recommended.oldPrice)}</span>
      </div>

      <ul class="recommendation-points">
        ${reasons.map(item => `<li><i class="fas fa-check-circle"></i> ${escapeHtml(item)}</li>`).join('')}
      </ul>

      <div>
        <h4 style="margin-bottom:12px;">لماذا تستحق الاشتراك الآن؟</h4>
        <ul class="advice-reasons">
          ${persuasive.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </div>

      <div class="telegram-actions">
        <button class="btn btn-primary" type="button" onclick="addToCart('${recommended.id}')"><i class="fas fa-cart-plus"></i> أضف الدورة الموصى بها للسلة</button>
        <button class="btn btn-outline" type="button" onclick="scrollToSection('courses')"><i class="fas fa-store"></i> استعراض كل الدورات</button>
      </div>
    </div>
  `;
}

async function syncQuizResultToBackend(payload) {
  try {
    const response = await apiRequest('/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return response;
  } catch {
    return null;
  }
}

async function handleAdvisorSubmit(event) {
  event.preventDefault();
  const useQuiz = document.getElementById('useQuizScore').checked;
  const manualScoreValue = document.getElementById('currentScore').value;
  const targetValue = document.getElementById('targetScore').value;
  const daysValue = document.getElementById('daysLeft').value;
  const studyValue = document.getElementById('studyHours').value;
  const summary = getQuizSummary();

  const score = useQuiz && summary.combinedPercent !== null
    ? summary.combinedPercent
    : (manualScoreValue ? Number(manualScoreValue) : null);
  const target = targetValue ? Number(targetValue) : null;
  const daysLeft = daysValue ? Number(daysValue) : null;
  const studyHours = studyValue ? Number(studyValue) : null;

  if (score === null && target === null && daysLeft === null && studyHours === null) {
    showToast('أدخل على الأقل بعض البيانات حتى تظهر التوصية الذكية.');
    return;
  }

  let recommendation = chooseCourseRecommendation({ score, target, daysLeft, studyHours });

  if (summary.combinedPercent !== null && summary.totalAnswered > 0) {
    const backendResult = await syncQuizResultToBackend({
      summary,
      targetScore: target,
      daysLeft,
      studyHours
    });

    if (backendResult?.recommendation?.courseId) {
      const recommended = getCourse(backendResult.recommendation.courseId) || recommendation.recommended;
      recommendation = {
        recommended,
        reasons: [backendResult.recommendation.reason, ...recommendation.reasons].filter(Boolean),
        persuasive: Array.isArray(recommended?.recommendationReasons) ? recommended.recommendationReasons : []
      };
    }
  }

  state.latestRecommendation = {
    courseId: recommendation.recommended.id,
    title: recommendation.recommended.title,
    reason: recommendation.reasons[0] || recommendation.persuasive[0] || ''
  };

  renderRecommendationCard(recommendation);
  showToast('تم تحليل بياناتك وإظهار الدورة الأنسب لك.', 'success');
}

function recommendSpecificCourse(courseId) {
  const course = getCourse(courseId);
  if (!course) return;

  state.latestRecommendation = {
    courseId: course.id,
    title: course.title,
    reason: (course.recommendationReasons || [])[0] || course.sellingPoint || ''
  };

  renderRecommendationCard({
    recommended: course,
    reasons: course.recommendationReasons || [],
    persuasive: course.recommendationReasons || []
  });
  scrollToSection('advisor');
}

function previewReceiptFile(file) {
  const preview = document.getElementById('receiptPreview');
  if (!file) {
    preview.innerHTML = `
      <div class="receipt-placeholder">
        <i class="fas fa-file-arrow-up"></i>
        <p>لم يتم اختيار ملف بعد</p>
      </div>
    `;
    return;
  }

  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = () => {
      preview.innerHTML = `<img src="${reader.result}" alt="معاينة الإيصال" />`;
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = `
      <div class="receipt-placeholder">
        <i class="fas fa-file-pdf"></i>
        <p>${escapeHtml(file.name)}</p>
        <small>تم اختيار الملف بنجاح.</small>
      </div>
    `;
  }
}

function buildReadableOrderSummary({ customer, recommendation, orderId, telegramStatus }) {
  const selectedCourses = getCartCourses();
  const summary = getQuizSummary();
  const courseLines = selectedCourses.map((course, idx) => `${idx + 1}- ${course.title} (${course.edition}) — ${formatPrice(course.price)}`).join('\n');
  const quizLine = summary.combinedPercent !== null ? `\nنتيجة اختبار الموقع: ${summary.combinedPercent}%` : '';
  const recommendationLine = recommendation?.title ? `\nالدورة المقترحة: ${recommendation.title}\nسبب الترشيح: ${recommendation.reason || '-'}` : '';
  const orderLine = orderId ? `\nرقم الطلب: ${orderId}` : '';
  const telegramLine = telegramStatus ? `\nحالة تيليجرام: ${telegramStatus}` : '';

  return [
    'ملخص طلب شراء من متجر دورات القدرات 2026',
    '',
    `الاسم: ${customer.name}`,
    `رقم التواصل: ${customer.phone}`,
    `البريد الإلكتروني: ${customer.email}`,
    `الدرجة المستهدفة: ${customer.targetScore}`,
    '',
    'الدورات المختارة:',
    courseLines,
    '',
    `الإجمالي: ${formatPrice(getCartTotal())}`,
    quizLine.trim(),
    recommendationLine.trim(),
    orderLine.trim(),
    telegramLine.trim()
  ].filter(Boolean).join('\n');
}

function setCheckoutLoading(isLoading) {
  const submitBtn = document.querySelector('#checkoutForm button[type="submit"]');
  if (!submitBtn) return;
  submitBtn.disabled = isLoading;
  submitBtn.dataset.original = submitBtn.dataset.original || submitBtn.innerHTML;
  submitBtn.innerHTML = isLoading
    ? '<i class="fas fa-spinner fa-spin"></i> جاري إرسال الطلب...'
    : submitBtn.dataset.original;
}

async function handleCheckoutSubmit(event) {
  event.preventDefault();
  if (!state.cart.length) {
    showToast('لا يمكن إكمال الطلب قبل إضافة الدورات إلى السلة.');
    return;
  }

  const receiptFile = document.getElementById('receiptFile').files[0] || null;
  const customer = {
    name: document.getElementById('customerName').value.trim(),
    phone: document.getElementById('customerPhone').value.trim(),
    email: document.getElementById('customerEmail').value.trim(),
    targetScore: document.getElementById('customerTarget').value.trim()
  };

  if (!customer.name || !customer.phone || !customer.email || !customer.targetScore) {
    showToast('أكمل كل بيانات العميل أولاً.');
    return;
  }

  const payload = {
    customer,
    courseIds: [...state.cart],
    recommendation: state.latestRecommendation,
    quizSummary: getQuizSummary()
  };

  const formData = new FormData();
  formData.append('payload', JSON.stringify(payload));
  if (receiptFile) formData.append('receipt', receiptFile);

  setCheckoutLoading(true);

  try {
    const response = await apiRequest('/api/orders', {
      method: 'POST',
      body: formData
    });

    state.latestOrderResponse = response;
    const telegramStatus = response.telegram?.ok
      ? 'تم الإرسال بنجاح إلى تيليجرام'
      : 'تم حفظ الطلب لكن يحتاج إعداد تيليجرام أو chat_id صحيح';

    const readableSummary = buildReadableOrderSummary({
      customer,
      recommendation: state.latestRecommendation,
      orderId: response.orderId,
      telegramStatus
    });

    state.latestOrderSummary = readableSummary;
    document.getElementById('telegramMessage').value = readableSummary;
    document.getElementById('confirmationTitle').textContent = response.telegram?.ok
      ? 'تم إرسال الطلب إلى تيليجرام بنجاح'
      : 'تم حفظ الطلب ونحتاج مراجعة إعدادات تيليجرام';
    document.getElementById('confirmationText').textContent = `${response.message} رقم الطلب: ${response.orderId}`;
    document.getElementById('telegramNoteText').textContent = response.telegram?.ok
      ? 'تم الإرسال الفعلي من الباك إند مباشرة. يمكنك الاحتفاظ بهذا الملخص للمتابعة أو الأرشفة.'
      : 'الطلب محفوظ بالفعل، لكن الإرسال المباشر إلى تيليجرام لم يكتمل بسبب الإعدادات. استخدم الرابط الاحتياطي لحين ضبط المتغيرات.';
    document.getElementById('confirmationCard').classList.remove('hidden');
    document.getElementById('confirmationCard').scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (response.telegram?.ok) {
      state.cart = [];
      saveCart();
      renderCart();
      renderCheckoutSummary();
      document.getElementById('checkoutForm').reset();
      previewReceiptFile(null);
    }

    showToast(response.message, response.telegram?.ok ? 'success' : 'info');
  } catch (error) {
    const fallbackSummary = buildReadableOrderSummary({
      customer,
      recommendation: state.latestRecommendation,
      telegramStatus: 'تعذر الوصول للباك إند الآن'
    });
    state.latestOrderSummary = fallbackSummary;
    document.getElementById('telegramMessage').value = fallbackSummary;
    document.getElementById('confirmationTitle').textContent = 'تعذر إرسال الطلب الآن';
    document.getElementById('confirmationText').textContent = `${error.message} — يمكنك استخدام الرابط الاحتياطي لحين إعادة المحاولة.`;
    document.getElementById('confirmationCard').classList.remove('hidden');
    showToast(error.message || 'حصل خطأ أثناء إرسال الطلب.', 'error');
  } finally {
    setCheckoutLoading(false);
  }
}

async function copyTelegramMessage() {
  const text = document.getElementById('telegramMessage').value;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    showToast('تم نسخ ملخص الطلب.', 'success');
  } catch {
    showToast('تعذر النسخ التلقائي، انسخ النص يدوياً.');
  }
}

function openTelegramOrder() {
  const link = getTelegramLink();
  window.open(link, '_blank', 'noopener');
}

function downloadOrderSummary() {
  const text = document.getElementById('telegramMessage').value;
  if (!text) {
    showToast('لا يوجد ملخص طلب لتحميله بعد.');
    return;
  }
  if (state.latestOrderBlobUrl) URL.revokeObjectURL(state.latestOrderBlobUrl);
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  state.latestOrderBlobUrl = url;
  const a = document.createElement('a');
  a.href = url;
  a.download = 'order-summary-qudrat-2026.txt';
  a.click();
}

function initReceiptListener() {
  document.getElementById('receiptFile').addEventListener('change', event => {
    const file = event.target.files[0] || null;
    previewReceiptFile(file);
  });
}

function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 500 ? 'grid' : 'none';
  });
}

function applySettingsToUI() {
  const settings = state.settings || defaultSettings;
  const site = settings.site || {};
  const bank = settings.bank || {};
  const telegram = settings.telegram || {};

  const siteNameText = document.getElementById('siteNameText');
  const siteTaglineText = document.getElementById('siteTaglineText');
  const heroTitleText = document.getElementById('heroTitleText');
  const heroSubtitleText = document.getElementById('heroSubtitleText');
  const bankNameText = document.getElementById('bankNameText');
  const bankAccountText = document.getElementById('bankAccountText');
  const bankIbanText = document.getElementById('bankIbanText');
  const bankBeneficiaryText = document.getElementById('bankBeneficiaryText');
  const telegramUsernameText = document.getElementById('telegramUsernameText');
  const telegramPublicLink = document.getElementById('telegramPublicLink');
  const footerTelegramLink = document.getElementById('footerTelegramLink');

  if (siteNameText) siteNameText.textContent = site.name || defaultSettings.site.name;
  if (siteTaglineText) siteTaglineText.textContent = site.tagline || defaultSettings.site.tagline;
  if (heroTitleText && site.heroTitle) heroTitleText.textContent = site.heroTitle;
  if (heroSubtitleText && site.heroSubtitle) heroSubtitleText.textContent = site.heroSubtitle;
  if (bankNameText) bankNameText.textContent = bank.bankName || defaultSettings.bank.bankName;
  if (bankAccountText) bankAccountText.textContent = bank.accountNumber || defaultSettings.bank.accountNumber;
  if (bankIbanText) bankIbanText.textContent = bank.iban || defaultSettings.bank.iban;
  if (bankBeneficiaryText) bankBeneficiaryText.textContent = bank.beneficiary || defaultSettings.bank.beneficiary;

  const username = telegram.username || getTelegramUsername();
  const publicLink = telegram.publicLink || getTelegramLink();
  if (telegramUsernameText) telegramUsernameText.textContent = username;
  if (telegramPublicLink) telegramPublicLink.href = publicLink;
  if (footerTelegramLink) footerTelegramLink.href = publicLink;
}

async function loadSettings() {
  try {
    const response = await apiRequest('/api/settings');
    if (response?.settings) {
      state.settings = deepClone(response.settings);
      state.settingsLoaded = true;
      if (!Array.isArray(state.settings.courses) || !state.settings.courses.length) {
        state.settings.courses = deepClone(defaultCourses);
      }
      applySettingsToUI();
      renderCourses();
      renderComparisonTable();
      renderCart();
      renderCheckoutSummary();
      return;
    }
  } catch {
    // fallback to defaults
  }

  state.settings = deepClone(defaultSettings);
  state.settingsLoaded = false;
  applySettingsToUI();
  renderCourses();
  renderComparisonTable();
  renderCart();
  renderCheckoutSummary();
}

function initCourseFilters() {
  document.querySelectorAll('.course-filter-chips .chip').forEach(btn => {
    btn.addEventListener('click', () => filterStoreCourses(btn.dataset.filter));
  });
}

function initMainNav() {
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => document.getElementById('mainNav').classList.remove('open'));
  });
}

function exposeGlobals() {
  window.scrollToSection = scrollToSection;
  window.toggleMenu = toggleMenu;
  window.toggleCart = toggleCart;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.goToCheckout = goToCheckout;
  window.showQuizTab = showQuizTab;
  window.selectAnswer = selectAnswer;
  window.nextQuestion = nextQuestion;
  window.prevQuestion = prevQuestion;
  window.filterCategory = filterCategory;
  window.restartQuiz = restartQuiz;
  window.applyQuizScoreToAdvisor = applyQuizScoreToAdvisor;
  window.recommendSpecificCourse = recommendSpecificCourse;
  window.copyTelegramMessage = copyTelegramMessage;
  window.openTelegramOrder = openTelegramOrder;
  window.downloadOrderSummary = downloadOrderSummary;
}

document.addEventListener('DOMContentLoaded', async () => {
  exposeGlobals();
  loadCart();
  state.lafziFiltered = [...lafziQuestions];
  state.kamiFiltered = [...kamiQuestions];

  document.querySelectorAll('.course-filter-chips .chip').forEach((chip, index) => {
    const filters = ['all', 'بداية التأسيس', 'رفع الدرجات', 'استعداد سريع'];
    chip.dataset.filter = filters[index] || 'all';
  });

  initCourseFilters();
  applySettingsToUI();
  renderCourses();
  renderComparisonTable();
  renderCart();
  renderCheckoutSummary();
  renderAssessmentSummary();
  buildQuiz('lafziQuiz', lafziQuestions, 'lafzi');
  buildQuiz('kamiQuiz', kamiQuestions, 'kami');

  document.getElementById('advisorForm').addEventListener('submit', handleAdvisorSubmit);
  document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);

  initReceiptListener();
  initScrollTop();
  initMainNav();
  await loadSettings();
});

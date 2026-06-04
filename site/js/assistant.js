/**
 * مساعد حلم الذكي — AI Floating Assistant
 * مبادرة حلم قدرات ثانوية 2026
 */

const TELEGRAM_LINK = 'https://t.me/qiyas_2026_2030';

let aiPanelOpen = false;

// =========== Knowledge Base ===========
const aiKnowledge = {
  courses: {
    basic: {
      name: 'دورة قدرات الأساسية',
      price: 149,
      oldPrice: 299,
      level: 'مبتدئ — أقل من 60',
      target: 'حتى 75+',
      duration: '4 أسابيع',
      badge: 'خصم 50%',
      best: 'من يريد تأسيس قوي من الصفر'
    },
    premium: {
      name: 'دورة قدرات المميزة',
      price: 349,
      oldPrice: 749,
      level: 'متقدم — لمن هدفه 90+',
      target: '90+ بإذن الله',
      duration: '6 أسابيع',
      badge: 'الأقوى لرفع الدرجة',
      best: 'من لديه أساس جيد ويريد درجة عالية'
    },
    intensive: {
      name: 'دورة قدرات المكثفة',
      price: 299,
      oldPrice: 549,
      level: 'للوقت الضيق',
      target: 'قفزة سريعة',
      duration: '14 يوم',
      badge: 'نتيجة أسرع',
      best: 'من الاختبار قريب وعنده 14 يوم أو أقل'
    },
    comprehensive: {
      name: 'دورة قدرات الشاملة',
      price: 249,
      oldPrice: 399,
      level: 'متوسط — 60-79',
      target: '80 - 88',
      duration: '5 أسابيع',
      badge: 'الأكثر توازناً',
      best: 'من يريد تأسيس جيد مع مراجعة منظمة'
    }
  },
  faq: {
    contact: `للتواصل والاستفسارات والاشتراك، تواصل معنا مباشرة عبر تيليجرام:\n👉 ${TELEGRAM_LINK}`,
    subscribe: 'للاشتراك: اختر الدورة من القسم أعلاه، أضفها للسلة، ثم أكمل بيانات الدفع وأرسل الطلب عبر تيليجرام.',
    payment: 'طريقة الدفع: تحويل بنكي عبر بنك الإنماء، ثم إرسال الإيصال مع بيانات الطلب عبر تيليجرام.',
    telegram: `حساب مبادرة حلم على تيليجرام:\n👉 ${TELEGRAM_LINK}`,
    about: 'مبادرة حلم قدرات ثانوية — منصة احترافية تساعد طلاب الثانوية على التحضير لاختبار القدرات 2026 بأفضل الدورات والمواد التعليمية.',
    beginner: 'إذا كنت مبتدئاً أو درجتك أقل من 60، فالدورة الأساسية هي الأنسب لك (149 ر.س). تأسيس قوي وخطة واضحة من الصفر.',
    advanced: 'إذا كان هدفك 90+ وعندك أساس جيد، الدورة المميزة هي الخيار الأمثل (349 ر.س). مسار متقدم لرفع الدرجة.',
    time: 'إذا وقتك ضيق (14 يوم أو أقل)، الدورة المكثفة هي الأنسب (299 ر.س). تركيز على الأهم في أقل وقت.',
    balanced: 'إذا درجتك بين 60-79 وتريد مسار متوازن، الدورة الشاملة مناسبة جداً (249 ر.س).',
    assessment: 'يمكنك اختبار مستواك الآن من قسم "اختبار تحديد المستوى" في الصفحة، وستحصل على توصية بالدورة الأنسب لك.'
  }
};

// =========== Intent Detection ===========
function detectIntent(text) {
  const t = text.toLowerCase().trim();

  if (/دور|كورس|course|برامج|مسار/.test(t)) return 'courses';
  if (/سع|ثمن|كلف|price|تكلف|كم/.test(t)) return 'prices';
  if (/اشتر|اسجل|تسجيل|subscribe|انضم|انضمام/.test(t)) return 'subscribe';
  if (/دفع|payment|تحويل|بنك|iban|إيصال/.test(t)) return 'payment';
  if (/تواصل|contact|واتس|تليجرام|telegram|رابط/.test(t)) return 'telegram';
  if (/مبتدئ|جديد|من الصفر|صفر|ابتدئ|60|55|50|40/.test(t)) return 'beginner';
  if (/90|95|100|عالي|ممتاز|متقدم|قوي/.test(t)) return 'advanced';
  if (/ضيق|سريع|مكثف|قريب|قصير|14|أسبوع|أسبوعين/.test(t)) return 'time';
  if (/توازن|متوازن|شامل|80|85|متوسط/.test(t)) return 'balanced';
  if (/اختبار|تحديد|مستوى|quiz|قياس/.test(t)) return 'assessment';
  if (/مبادرة|حلم|من أنتم|عنكم|عن الموقع|منو/.test(t)) return 'about';
  if (/مرحب|أهلاً|هلا|السلام|مساء|صباح/.test(t)) return 'greeting';
  if (/شكر|ممتاز|حلو|رائع|جميل/.test(t)) return 'thanks';
  if (/ما هي|ايش|كيف|كيفية|وش|اشرح/.test(t)) return 'general';

  return 'unknown';
}

// =========== Response Generator ===========
function generateResponse(intent, userText) {
  switch (intent) {
    case 'greeting':
      return `أهلاً وسهلاً! 🌟 كيف أقدر أساعدك اليوم؟\n\nأنا هنا لمساعدتك في اختيار دورة القدرات المناسبة أو للإجابة على أي استفسار.`;

    case 'courses':
      return `📚 **دورات مبادرة حلم المتاحة:**\n\n` +
        Object.values(aiKnowledge.courses).map(c =>
          `✦ **${c.name}** — ${c.price} ر.س ~~${c.oldPrice} ر.س~~\n  🎯 ${c.best}`
        ).join('\n\n') +
        `\n\nأي دورة تريد معرفة تفاصيلها أكثر؟`;

    case 'prices':
      return `💰 **أسعار دورات مبادرة حلم:**\n\n` +
        Object.values(aiKnowledge.courses).map(c =>
          `• ${c.name}: **${c.price} ر.س** (كان ${c.oldPrice} ر.س) — ${c.badge}`
        ).join('\n') +
        `\n\n🔥 جميع الأسعار خاصة لفترة محدودة!`;

    case 'subscribe':
      return `✅ **طريقة الاشتراك:**\n\n1. اختر الدورة من قسم "الدورات" في الأعلى\n2. اضغط "أضف للسلة"\n3. اكمل بيانات الطلب في قسم "إتمام الاشتراك"\n4. تواصل معنا عبر تيليجرام لتأكيد اشتراكك\n\n📱 ${aiKnowledge.faq.telegram}`;

    case 'payment':
      return `💳 **طريقة الدفع:**\n\n• تحويل بنكي عبر **بنك الإنماء**\n• بعد التحويل: أرفق الإيصال في النموذج\n• ثم أرسل الطلب وتواصل معنا لتأكيد اشتراكك\n\n📱 للاستفسار: ${TELEGRAM_LINK}`;

    case 'telegram':
      return `📱 **تواصل معنا على تيليجرام:**\n\n${TELEGRAM_LINK}\n\nنرد على جميع الاستفسارات: الاشتراك، الدفع، محتوى الدورات، والمساعدة في الاختيار. ✨`;

    case 'beginner':
      return `🎯 **أنت مبتدئ؟ هذه دورتك:**\n\n**${aiKnowledge.courses.basic.name}**\n💰 السعر: ${aiKnowledge.courses.basic.price} ر.س (كان ${aiKnowledge.courses.basic.oldPrice} ر.س)\n⏱️ المدة: ${aiKnowledge.courses.basic.duration}\n🎯 الهدف: ${aiKnowledge.courses.basic.target}\n\nتأسيس قوي خطوة بخطوة من الصفر — الخيار الأمثل للبداية الصحيحة. 💪`;

    case 'advanced':
      return `🏆 **هدفك درجة عالية؟ هذه دورتك:**\n\n**${aiKnowledge.courses.premium.name}**\n💰 السعر: ${aiKnowledge.courses.premium.price} ر.س (كان ${aiKnowledge.courses.premium.oldPrice} ر.س)\n⏱️ المدة: ${aiKnowledge.courses.premium.duration}\n🎯 الهدف: ${aiKnowledge.courses.premium.target}\n\nاستراتيجيات متقدمة وتكتيكات لرفع درجتك لأعلى مستوى! 🚀`;

    case 'time':
      return `⚡ **وقتك ضيق؟ هذه دورتك:**\n\n**${aiKnowledge.courses.intensive.name}**\n💰 السعر: ${aiKnowledge.courses.intensive.price} ر.س (كان ${aiKnowledge.courses.intensive.oldPrice} ر.س)\n⏱️ المدة: ${aiKnowledge.courses.intensive.duration}\n🎯 الهدف: ${aiKnowledge.courses.intensive.target}\n\nتركيز على الأهم في أقل وقت — مصممة لمن الاختبار قريب! ⏰`;

    case 'balanced':
      return `⚖️ **تريد مسار متوازن؟ هذه دورتك:**\n\n**${aiKnowledge.courses.comprehensive.name}**\n💰 السعر: ${aiKnowledge.courses.comprehensive.price} ر.س (كان ${aiKnowledge.courses.comprehensive.oldPrice} ر.س)\n⏱️ المدة: ${aiKnowledge.courses.comprehensive.duration}\n🎯 الهدف: ${aiKnowledge.courses.comprehensive.target}\n\nتأسيس جيد مع مراجعة منظمة وتدرج واضح! 📈`;

    case 'assessment':
      return `📊 **اختبار تحديد المستوى:**\n\nيمكنك اختبار مستواك الآن من قسم "اختبار تحديد المستوى" في الصفحة 👆\n\nيشمل:\n• أسئلة القسم اللفظي\n• أسئلة القسم الكمي\n• توصية بالدورة الأنسب لك بناءً على نتيجتك\n\nجرّب الآن وسيرشدك الموقع للمسار الصحيح! 🎯`;

    case 'about':
      return `🌟 **مبادرة حلم قدرات ثانوية:**\n\n${aiKnowledge.faq.about}\n\nهدفنا مساعدة كل طالب على تحقيق حلمه والوصول للدرجة التي يطمح إليها في اختبار القدرات 2026 💪\n\nللتواصل: ${TELEGRAM_LINK}`;

    case 'thanks':
      return `😊 على الرحب والسعة! سعداء بمساعدتك.\n\nإذا احتجت أي شيء آخر أنا هنا دائماً. بالتوفيق في اختبارك! 🌟`;

    case 'general':
      return `يمكنني مساعدتك في:\n\n📚 **اختيار الدورة المناسبة**\n💰 **الاستفسار عن الأسعار**\n✅ **طريقة الاشتراك**\n📱 **التواصل مع المبادرة**\n📊 **اختبار المستوى**\n\nما الذي تريد معرفته بالتحديد؟`;

    default:
      return `شكراً على سؤالك! 🙏\n\nللحصول على أفضل مساعدة، يمكنك:\n• تصفح قسم الدورات أعلاه\n• استخدام الموصي الذكي\n• التواصل المباشر معنا:\n\n📱 ${TELEGRAM_LINK}`;
  }
}

// =========== Quick Reply Handler ===========
function aiQuickReply(text) {
  const input = document.getElementById('aiInput');
  if (input) {
    input.value = text;
    sendAIMessage();
  }
}

// =========== Toggle Assistant ===========
function toggleAIAssistant() {
  const panel = document.getElementById('aiChatPanel');
  if (!panel) return;

  aiPanelOpen = !aiPanelOpen;

  if (aiPanelOpen) {
    panel.classList.remove('hidden');
    panel.classList.add('visible');
    setTimeout(() => {
      const input = document.getElementById('aiInput');
      if (input) input.focus();
    }, 350);
  } else {
    panel.classList.remove('visible');
    panel.classList.add('hidden');
  }
}

// =========== Send Message ===========
function sendAIMessage() {
  const input = document.getElementById('aiInput');
  const messagesContainer = document.getElementById('aiMessages');
  if (!input || !messagesContainer) return;

  const text = input.value.trim();
  if (!text) return;

  input.value = '';

  // Remove quick buttons after first message
  const quickBtns = document.getElementById('aiQuickBtns');
  if (quickBtns) quickBtns.style.display = 'none';

  // Add user message
  appendUserMessage(text, messagesContainer);

  // Show typing indicator
  const typingEl = appendTyping(messagesContainer);

  // Simulate response delay
  setTimeout(() => {
    typingEl.remove();
    const intent = detectIntent(text);
    const response = generateResponse(intent, text);
    appendBotMessage(response, messagesContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 800 + Math.random() * 600);
}

// =========== Message Builders ===========
function appendUserMessage(text, container) {
  const div = document.createElement('div');
  div.className = 'ai-msg user-msg';
  div.innerHTML = `
    <div class="ai-bubble">${escapeHTML(text)}</div>
    <div class="ai-avatar">
      <i class="fas fa-user" style="color:var(--muted);font-size:0.9rem"></i>
    </div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function appendBotMessage(text, container) {
  const div = document.createElement('div');
  div.className = 'ai-msg bot-msg';

  // Convert markdown-ish text to HTML
  const html = formatBotMessage(text);

  div.innerHTML = `
    <div class="ai-avatar">
      <img src="logo.png" alt="مساعد حلم" />
    </div>
    <div class="ai-bubble">${html}</div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;

  // Add telegram button if response includes telegram link
  if (text.includes('t.me/qiyas_2026_2030')) {
    const btnWrap = document.createElement('div');
    btnWrap.style.cssText = 'padding: 4px 0 0 44px;';
    btnWrap.innerHTML = `
      <a href="${TELEGRAM_LINK}" target="_blank" rel="noopener"
         style="display:inline-flex;align-items:center;gap:8px;padding:10px 16px;
                background:linear-gradient(135deg,#229ed9,#0088cc);color:#fff;
                border-radius:12px;font-weight:800;font-size:0.88rem;text-decoration:none;
                font-family:var(--font);">
        <i class="fab fa-telegram"></i> فتح تيليجرام مبادرة حلم
      </a>`;
    container.appendChild(btnWrap);
    container.scrollTop = container.scrollHeight;
  }
}

function appendTyping(container) {
  const div = document.createElement('div');
  div.className = 'ai-msg bot-msg';
  div.innerHTML = `
    <div class="ai-avatar">
      <img src="logo.png" alt="" />
    </div>
    <div class="ai-typing">
      <span></span><span></span><span></span>
    </div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div;
}

// =========== Text Formatter ===========
function formatBotMessage(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/~~(.*?)~~/g, '<del>$1</del>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}

function escapeHTML(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// =========== Init ===========
document.addEventListener('DOMContentLoaded', () => {
  const panel = document.getElementById('aiChatPanel');
  if (panel) {
    panel.classList.add('hidden');
  }

  // Show tooltip after 3 seconds on desktop
  if (window.innerWidth > 768) {
    setTimeout(() => {
      const btn = document.getElementById('aiToggleBtn');
      if (btn && !aiPanelOpen) {
        const tooltip = document.createElement('div');
        tooltip.style.cssText = `
          position: absolute;
          bottom: 80px;
          left: 0;
          background: linear-gradient(135deg, #1d4ed8, #7c3aed);
          color: white;
          padding: 10px 16px;
          border-radius: 16px;
          font-family: var(--font);
          font-weight: 700;
          font-size: 0.9rem;
          white-space: nowrap;
          box-shadow: 0 8px 24px rgba(29,78,216,0.35);
          animation: fadeInUp 0.3s ease forwards;
          cursor: pointer;
          z-index: 9998;
        `;
        tooltip.innerHTML = '💬 أحتاج مساعدة في اختيار دورة؟';
        tooltip.onclick = toggleAIAssistant;
        const parent = document.getElementById('aiAssistant');
        if (parent) {
          parent.appendChild(tooltip);
          setTimeout(() => {
            if (tooltip.parentNode) tooltip.remove();
          }, 5000);
        }
      }
    }, 3000);
  }
});

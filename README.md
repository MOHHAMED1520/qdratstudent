# قدرات 2026 ستور برو

نسخة احترافية كاملة لمتجر بيع دورات القدرات 2026، تشمل:
- واجهة متجر عربية RTL احترافية
- سلة مشتريات + صفحة Checkout
- رفع إيصال التحويل
- باك إند Serverless متوافق مع Vercel و Netlify
- إرسال الطلبات إلى تيليجرام من السيرفر
- لوحة إدارة كاملة لإدارة الدورات والمحتوى والطلبات ونتائج الاختبارات
- نظام اختبار وتحليل ذكي يقترح الدورة الأنسب للطالب

---

## 1) هيكل المشروع

```bash
.
├── index.html                    # الواجهة الرئيسية للمتجر
├── admin.html                    # لوحة الإدارة
├── css/
│   ├── style.css                 # تصميم المتجر
│   └── admin.css                 # تصميم لوحة الإدارة
├── js/
│   ├── main.js                   # منطق المتجر، السلة، الاختبار، الطلبات
│   ├── admin.js                  # منطق لوحة الإدارة
│   ├── lafzi-questions.js        # بنك الأسئلة اللفظي
│   └── kami-questions.js         # بنك الأسئلة الكمي
├── api/                          # Vercel Functions
│   ├── health.js
│   ├── settings.js
│   ├── orders.js
│   ├── results.js
│   └── admin/
│       ├── login.js
│       ├── settings.js
│       ├── orders.js
│       └── results.js
├── netlify/functions/            # Netlify Functions wrappers
├── lib/
│   ├── config.js                 # قراءة ENV + ملفات البيانات
│   ├── auth.js                   # جلسة المدير
│   ├── storage.js                # تخزين محلي أو Supabase
│   ├── telegram.js               # تكامل Telegram Bot API
│   └── handlers.js               # منطق الـ API
├── data/
│   └── default-settings.json     # الإعدادات الافتراضية والدورات
├── sql/
│   └── supabase-schema.sql       # جداول Supabase
├── vercel.json                   # إعدادات Vercel
├── netlify.toml                  # إعدادات Netlify
├── .env.example                  # متغيرات البيئة المطلوبة
└── package.json
```

---

## 2) ملفات التشغيل المطلوبة

### ملفات أساسية:
- `index.html` واجهة المتجر
- `admin.html` لوحة الإدارة
- `api/*` أو `netlify/functions/*` للباك إند
- `lib/*` منطق السيرفر
- `data/default-settings.json` الإعدادات الافتراضية
- `.env` أو متغيرات البيئة على المنصة

### متغيرات البيئة المطلوبة:
انسخ `.env.example` إلى `.env` أثناء التطوير المحلي:

```bash
cp .env.example .env
```

ثم عدّل القيم:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-me
ADMIN_SESSION_SECRET=replace-with-long-random-secret

TELEGRAM_BOT_TOKEN=123456:replace_me
TELEGRAM_CHAT_ID=-1001234567890
# أو بدلاً منه إن كان الهدف قناة عامة:
# TELEGRAM_CHANNEL_USERNAME=@your_channel_username

PUBLIC_TELEGRAM_LINK=https://t.me/qudrat_2026

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 3) كيف يعمل تيليجرام فعلياً؟

الباك إند يرسل الطلب من السيرفر مباشرة باستخدام Telegram Bot API.

### سيناريوهات الربط الصحيحة:
1. **لو الهدف قناة تيليجرام عامة**
   - أضف البوت كـ Admin في القناة
   - استخدم `TELEGRAM_CHANNEL_USERNAME=@channel_username`
   - أو استخدم `TELEGRAM_CHAT_ID`

2. **لو الهدف جروب أو قناة خاصة**
   - أضف البوت
   - استخرج `chat_id`
   - ضع القيمة داخل `TELEGRAM_CHAT_ID`

3. **لو الهدف حساب شخصي**
   - لازم صاحب الحساب يبدأ المحادثة مع البوت أولاً
   - ثم تستخدم الـ numeric `chat_id`
   - الاعتماد على username فقط لا يكفي للحسابات الشخصية

### إرسال الإيصال:
- لو الملف صورة: يتم استخدام `sendPhoto`
- لو PDF أو ملف آخر: يتم استخدام `sendDocument`

> مهم: لو لم تضبط متغيرات تيليجرام صح، الطلب سيتحفظ داخل النظام لكن الإرسال المباشر لن يكتمل.

---

## 4) التخزين

### الوضع الافتراضي المحلي
أثناء التطوير المحلي، يتم حفظ البيانات داخل:
- `data/settings.local.json`
- `data/orders.local.json`
- `data/results.local.json`

### وضع الإنتاج الموصى به
استخدم **Supabase** حتى تظل البيانات محفوظة بعد النشر على Vercel أو Netlify.

نفّذ ملف الجداول:
- `sql/supabase-schema.sql`

ثم أضف:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## 5) التشغيل محلياً

### الخيار 1: Vercel Dev
```bash
npm install
npm run dev:vercel
```

### الخيار 2: Netlify Dev
```bash
npm install
npm run dev:netlify
```

### الخيار 3: معاينة الواجهة فقط بدون API
```bash
npm install
npm run dev:static
```

### فحص سلامة الملفات
```bash
npm run check
```

---

## 6) الدخول إلى لوحة الإدارة

بعد التشغيل:
- المتجر: `/`
- لوحة الإدارة: `/admin`

الدخول يتم من خلال:
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

من لوحة التحكم تقدر تعدّل:
- اسم المتجر والنصوص الرئيسية
- بيانات البنك
- رابط واسم تيليجرام الظاهرين
- أسعار ومحتوى جميع الدورات
- متابعة الطلبات
- متابعة نتائج الاختبارات والتوصيات

---

## 7) خطوات النشر على Vercel

1. ارفع المشروع إلى GitHub.
2. افتح Vercel واعمل **New Project**.
3. اختر الريبو.
4. لا تحتاج Build خاص لموقع Static + Functions.
5. أضف Environment Variables من `.env.example`.
6. لو ستستخدم Supabase، أضف متغيراتها أيضاً.
7. Deploy.
8. بعد النشر اختبر:
   - `/api/health`
   - `/`
   - `/admin`
   - إرسال طلب تجريبي من المتجر

### ملفات Vercel المستخدمة:
- `vercel.json`
- مجلد `api/`

---

## 8) خطوات النشر على Netlify

1. ارفع المشروع إلى GitHub.
2. افتح Netlify واعمل **Add new site**.
3. اربط الريبو.
4. Publish directory = `.`
5. Functions directory = `netlify/functions`
6. أضف Environment Variables.
7. Deploy.
8. اختبر:
   - `/api/health`
   - `/`
   - `/admin`
   - إرسال طلب فعلي

### ملفات Netlify المستخدمة:
- `netlify.toml`
- `netlify/functions/`

---

## 9) الـ API endpoints

### عامة
- `GET /api/health`
- `GET /api/settings`
- `POST /api/results`
- `POST /api/orders`

### الإدارة
- `POST /api/admin/login`
- `GET /api/admin/settings`
- `PUT /api/admin/settings`
- `GET /api/admin/orders`
- `GET /api/admin/results`

---

## 10) ملخص سير العمل داخل المتجر

1. المستخدم يتصفح الدورات
2. يضيف دورة أو أكثر إلى السلة
3. يدخل بياناته في صفحة الإتمام
4. يرفع إيصال التحويل
5. الباك إند يحفظ الطلب
6. الباك إند يرسل رسالة تيليجرام مباشرة مع بيانات الطلب
7. تظهر النتيجة للمستخدم داخل الواجهة
8. المدير يتابع كل شيء من `/admin`

---

## 11) ملاحظات مهمة للإنتاج

- استخدم **Supabase** أو قاعدة بيانات دائمة، لأن التخزين المحلي في السيرفرلس غير مناسب للإنتاج طويل المدى.
- استخدم كلمة مرور قوية للوحة الإدارة.
- استخدم `ADMIN_SESSION_SECRET` طويل وعشوائي.
- اختبر تيليجرام على بيئة Staging قبل الإنتاج.
- لو كنت سترسل إلى حساب شخصي في تيليجرام، لا تعتمد على username فقط.

---

## 12) جاهز للتطوير لاحقاً

يمكن إضافة لاحقاً:
- كوبونات خصم
- بوابات دفع إلكترونية
- صلاحيات متعددة للمشرفين
- تقارير CSV/PDF
- تنبيهات بريدية موازية لتيليجرام
- صفحات هبوط إضافية للحملات الإعلانية

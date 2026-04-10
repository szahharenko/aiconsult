import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot, BarChart3, Workflow, CheckCircle2,
  Mail, Linkedin, FileText, ArrowRight,
  Zap, TrendingUp, Building2, DollarSign,
  X, Shield, Send, User, Loader2,
  Play, Quote, Clock, Users, Euro,
  ChevronRight, Calculator
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// КОНФИГУРАЦИЯ
// ─────────────────────────────────────────────────────────────────────────────
const BRAND_NAME    = "Sergei · AI Consult"  // TODO: замени на свой бренд
const YOUR_NAME     = "Sergei"
const CONTACT_EMAIL = "acrashik@gmail.com"
const LINKEDIN_URL  = "https://www.linkedin.com/in/sergei-zahharenko/"
const FORMSPREE_ID  = "mdapryan"
const VIDEO_EMBED_URL = "https://www.youtube.com/embed/3TzsLcU5748"
// ─────────────────────────────────────────────────────────────────────────────

type Lang = 'en' | 'ru'

// ── Анимации ──────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

// ── Утилиты ───────────────────────────────────────────────────────────────────
function Section({ children, dark, id }: { children: React.ReactNode; dark?: boolean; id?: string }) {
  return (
    <section id={id} className={`py-16 px-6 ${dark ? 'bg-slate-900' : ''}`}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  )
}
function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
      {sub && <p className="text-slate-400 text-lg">{sub}</p>}
    </motion.div>
  )
}

// ── Фото-заглушка ─────────────────────────────────────────────────────────────
// TODO: положи photo.jpg в /public/ и замени на:
// <img src="/photo.jpg" alt={YOUR_NAME} className="w-32 h-32 rounded-2xl object-cover" />
function PhotoPlaceholder() {
  return (
    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-coffee/30 to-coffee/10 border-2 border-coffee/40 flex flex-col items-center justify-center flex-shrink-0 gap-1">
      <User size={36} className="text-coffee" />
      <span className="text-coffee/60 text-xs font-medium">Добавь фото</span>
    </div>
  )
}

// ── Видео-заглушка ────────────────────────────────────────────────────────────
function VideoSection({ lang }: { lang: Lang }) {
  const isRu = lang === 'ru'
  return (
    <Section id="video">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <SectionHeader
          title={isRu ? "Посмотри, как я помогаю бизнесу внедрять AI" : "Watch How I Help Businesses Implement AI"}
          sub={isRu ? "2 минуты — и ты поймёшь, подходит ли это тебе" : "2 minutes — see if this is right for your business"}
        />
        <motion.div variants={fadeUp}>
          {VIDEO_EMBED_URL ? (
            // Реальный embed — вставится когда заполнишь VIDEO_EMBED_URL
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 aspect-video">
              <iframe
                src={VIDEO_EMBED_URL}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            // Заглушка — убирается как только заполнишь VIDEO_EMBED_URL
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 border-dashed aspect-video flex flex-col items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-coffee/5 to-transparent pointer-events-none" />

              {/* Play button */}
              <div className="w-20 h-20 rounded-full bg-coffee/20 border-2 border-coffee/50 flex items-center justify-center mb-5 group-hover:bg-coffee/30 transition-colors">
                <Play size={32} className="text-coffee ml-1" fill="currentColor" />
              </div>

              <p className="text-white font-bold text-xl mb-2 text-center px-4">
                {isRu ? "Здесь будет твоё вступительное видео" : "Your intro video goes here"}
              </p>
              <p className="text-slate-400 text-sm text-center px-8 max-w-lg">
                {isRu
                  ? "Запиши 2–3 минутное видео и вставь ссылку YouTube или Loom в переменную VIDEO_EMBED_URL в начале файла"
                  : "Record a 2–3 min intro and paste your YouTube or Loom URL into VIDEO_EMBED_URL at the top of the file"}
              </p>

              {/* Рамка с инструкцией */}
              <div className="mt-6 bg-slate-800/80 border border-slate-600 rounded-xl px-5 py-3 flex items-center gap-3">
                <Play size={14} className="text-coffee flex-shrink-0" />
                <code className="text-slate-300 text-xs">VIDEO_EMBED_URL = "https://www.youtube.com/embed/YOUR_ID"</code>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </Section>
  )
}

// ── Кейсы ─────────────────────────────────────────────────────────────────────
function CaseStudies({ lang }: { lang: Lang }) {
  const isRu = lang === 'ru'

  const cases = isRu ? [
    {
      badge: "E-commerce · Таллин",
      title: "Интернет-магазин одежды",
      problem: "4 часа в день уходило на ручную обработку заказов, возвратов и однотипных обращений клиентов.",
      solution: "AI-агент для поддержки клиентов + автоматизация возвратов через интеграцию с CRM.",
      metrics: [
        { icon: <Clock size={16} className="text-coffee" />, value: "3.5 ч/день", label: "сэкономлено" },
        { icon: <Zap size={16} className="text-sage-green" />, value: "2 мин", label: "время ответа (было 4 ч)" },
        { icon: <Euro size={16} className="text-blue-400" />, value: "~1 400 €", label: "экономия в месяц" },
      ],
      color: "coffee",
    },
    {
      badge: "Бухгалтерия · Эстония",
      title: "Бухгалтерская компания",
      problem: "8 сотрудников тратили 2 дня в месяц на ручное составление отчётов для 40+ клиентов.",
      solution: "Автоматическая генерация отчётов из Google Sheets + рассылка клиентам по расписанию.",
      metrics: [
        { icon: <Clock size={16} className="text-coffee" />, value: "3 часа", label: "вместо 2 дней" },
        { icon: <Users size={16} className="text-sage-green" />, value: "+15 клиентов", label: "без нового найма" },
        { icon: <TrendingUp size={16} className="text-blue-400" />, value: "+37%", label: "рост выручки" },
      ],
      color: "sage-green",
    },
    {
      badge: "Производство · Эстония",
      title: "Производитель мебели",
      problem: "150+ запросов в месяц на расчёт стоимости — каждый требовал 30–40 минут менеджера.",
      solution: "AI-калькулятор стоимости на сайте + автоматическая передача лидов в CRM.",
      metrics: [
        { icon: <Bot size={16} className="text-coffee" />, value: "80%", label: "запросов автоматически" },
        { icon: <TrendingUp size={16} className="text-sage-green" />, value: "+23%", label: "конверсия в сделку" },
        { icon: <Clock size={16} className="text-blue-400" />, value: "60 ч/мес", label: "высвобождено" },
      ],
      color: "blue",
    },
  ] : [
    {
      badge: "E-commerce · Tallinn",
      title: "Online Clothing Store",
      problem: "4 hours daily spent on manually handling orders, returns, and repetitive customer inquiries.",
      solution: "AI customer support agent + automated returns processing via CRM integration.",
      metrics: [
        { icon: <Clock size={16} className="text-coffee" />, value: "3.5 h/day", label: "saved" },
        { icon: <Zap size={16} className="text-sage-green" />, value: "2 min", label: "response time (was 4h)" },
        { icon: <Euro size={16} className="text-blue-400" />, value: "~€1,400", label: "saved per month" },
      ],
      color: "coffee",
    },
    {
      badge: "Accounting · Estonia",
      title: "Accounting Firm",
      problem: "8-person team spent 2 days per month manually generating reports for 40+ clients.",
      solution: "Automated report generation from Google Sheets + scheduled client delivery.",
      metrics: [
        { icon: <Clock size={16} className="text-coffee" />, value: "3 hours", label: "instead of 2 days" },
        { icon: <Users size={16} className="text-sage-green" />, value: "+15 clients", label: "without new hires" },
        { icon: <TrendingUp size={16} className="text-blue-400" />, value: "+37%", label: "revenue growth" },
      ],
      color: "sage-green",
    },
    {
      badge: "Manufacturing · Estonia",
      title: "Furniture Manufacturer",
      problem: "150+ monthly price quote requests — each requiring 30–40 minutes of a manager's time.",
      solution: "AI pricing calculator on website + automatic lead transfer to CRM.",
      metrics: [
        { icon: <Bot size={16} className="text-coffee" />, value: "80%", label: "requests automated" },
        { icon: <TrendingUp size={16} className="text-sage-green" />, value: "+23%", label: "conversion to sale" },
        { icon: <Clock size={16} className="text-blue-400" />, value: "60 h/mo", label: "freed up" },
      ],
      color: "blue",
    },
  ]

  return (
    <Section id="cases">
      <SectionHeader
        title={isRu ? "Реальные результаты" : "Real Results"}
        sub={isRu
          ? "Анонимизированные кейсы из эстонского МСБ — конкретные задачи, конкретные цифры"
          : "Anonymized cases from Estonian SMB — real problems, real numbers"}
      />
      <motion.div className="grid md:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {cases.map((c, i) => (
          <motion.div key={i} variants={fadeUp}
            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col hover:border-slate-500 transition-colors">
            <span className="self-start bg-slate-800 border border-slate-600 text-slate-300 text-xs font-medium px-3 py-1 rounded-full mb-4">
              {c.badge}
            </span>
            <h3 className="text-white font-bold text-lg mb-3">{c.title}</h3>

            {/* Problem */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                {isRu ? "Задача" : "Problem"}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">{c.problem}</p>
            </div>

            {/* Solution */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                {isRu ? "Решение" : "Solution"}
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">{c.solution}</p>
            </div>

            {/* Metrics */}
            <div className="mt-auto border-t border-slate-700 pt-4 grid grid-cols-3 gap-2">
              {c.metrics.map((m, j) => (
                <div key={j} className="text-center">
                  <div className="flex justify-center mb-1">{m.icon}</div>
                  <p className="text-white font-bold text-sm">{m.value}</p>
                  <p className="text-slate-500 text-xs leading-tight">{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA под кейсами */}
      <motion.div className="mt-8 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <p className="text-slate-400 text-sm mb-3">
          {isRu ? "Все кейсы анонимизированы по просьбе клиентов" : "All cases anonymized at client request"}
        </p>
        <a href="#contact"
          className="inline-flex items-center gap-2 text-coffee hover:text-coffee/80 font-semibold text-sm transition-colors">
          {isRu ? "Получить похожие результаты" : "Get similar results"} <ChevronRight size={16} />
        </a>
      </motion.div>
    </Section>
  )
}

// ── Отзывы ────────────────────────────────────────────────────────────────────
function Testimonials({ lang }: { lang: Lang }) {
  const isRu = lang === 'ru'

  // TODO: замени placeholder-тексты на реальные отзывы клиентов
  const testimonials = isRu ? [
    {
      quote: "Благодаря AI-автоматизации мы сократили время обработки заявок с 4 часов до 15 минут. Это кардинально изменило нашу операционную эффективность.",
      name: "[Имя клиента]",
      title: "[Должность]",
      company: "[Компания, Таллин]",
      initials: "?",
    },
    {
      quote: "Ожидал долгого внедрения и технических проблем — получил работающую систему за 3 недели. Теперь отчёты генерируются автоматически каждое утро.",
      name: "[Имя клиента]",
      title: "[Должность]",
      company: "[Компания, Эстония]",
      initials: "?",
    },
    {
      quote: "Инвестиция окупилась в первый же месяц. AI-калькулятор на сайте работает круглосуточно и конвертирует лучше, чем наши менеджеры по продажам.",
      name: "[Имя клиента]",
      title: "[Должность]",
      company: "[Компания, Эстония]",
      initials: "?",
    },
  ] : [
    {
      quote: "Thanks to AI automation, we cut request processing time from 4 hours to 15 minutes. It completely transformed our operational efficiency.",
      name: "[Client Name]",
      title: "[Job Title]",
      company: "[Company, Tallinn]",
      initials: "?",
    },
    {
      quote: "I expected a long implementation with technical issues — instead I got a working system in 3 weeks. Reports now generate automatically every morning.",
      name: "[Client Name]",
      title: "[Job Title]",
      company: "[Company, Estonia]",
      initials: "?",
    },
    {
      quote: "The investment paid off in the first month. The AI calculator on our site works 24/7 and converts better than our sales managers did.",
      name: "[Client Name]",
      title: "[Job Title]",
      company: "[Company, Estonia]",
      initials: "?",
    },
  ]

  return (
    <Section dark id="testimonials">
      <SectionHeader
        title={isRu ? "Что говорят клиенты" : "What Clients Say"}
        sub={isRu ? "TODO: замени заглушки на реальные отзывы" : "TODO: replace placeholders with real client quotes"}
      />
      <motion.div className="grid md:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {testimonials.map((t, i) => (
          <motion.div key={i} variants={fadeUp}
            className="bg-slate-800 border border-slate-700 border-dashed rounded-2xl p-6 flex flex-col relative">
            {/* Заглушка-пометка */}
            <div className="absolute top-3 right-3 bg-coffee/20 border border-coffee/30 rounded-lg px-2 py-0.5">
              <span className="text-coffee text-xs font-medium">Placeholder</span>
            </div>

            <Quote size={24} className="text-coffee/40 mb-4 flex-shrink-0" />
            <p className="text-slate-300 text-sm leading-relaxed flex-1 italic mb-5">"{t.quote}"</p>

            <div className="flex items-center gap-3 border-t border-slate-700 pt-4">
              <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-slate-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-slate-500 text-xs">{t.title} · {t.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

// ── ROI Калькулятор ───────────────────────────────────────────────────────────
function ROICalculator({ lang }: { lang: Lang }) {
  const isRu = lang === 'ru'
  const [employees, setEmployees] = useState(15)
  const [salary, setSalary] = useState(2000)
  const [hoursPerDay, setHoursPerDay] = useState(3)

  const hourlyRate = salary / 22 / 8
  const automatedHours = hoursPerDay * 0.6
  const annualSavings = Math.round(employees * automatedHours * hourlyRate * 250)
  const monthlySavings = Math.round(annualSavings / 12)
  const hoursFreed = Math.round(employees * automatedHours * 250)

  const fmt = (n: number) => n.toLocaleString('ru-RU')

  return (
    <Section id="roi">
      <SectionHeader
        title={isRu ? "ROI-калькулятор" : "ROI Calculator"}
        sub={isRu
          ? "Рассчитай потенциальную экономию от AI-автоматизации для твоего бизнеса"
          : "Estimate your potential savings from AI automation"}
      />
      <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">

            {/* Сотрудники */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-3 flex items-center gap-2">
                <Users size={16} className="text-coffee" />
                {isRu ? "Сотрудников" : "Employees"}
              </label>
              <input type="range" min={2} max={200} value={employees}
                onChange={e => setEmployees(Number(e.target.value))}
                className="w-full accent-coffee mb-2" />
              <div className="text-center text-white font-bold text-xl">{employees}</div>
            </div>

            {/* Зарплата */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-3 flex items-center gap-2">
                <Euro size={16} className="text-coffee" />
                {isRu ? "Средняя зарплата (€/мес)" : "Avg salary (€/mo)"}
              </label>
              <input type="range" min={800} max={6000} step={100} value={salary}
                onChange={e => setSalary(Number(e.target.value))}
                className="w-full accent-coffee mb-2" />
              <div className="text-center text-white font-bold text-xl">{fmt(salary)} €</div>
            </div>

            {/* Часы рутины */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-3 flex items-center gap-2">
                <Clock size={16} className="text-coffee" />
                {isRu ? "Часов рутины в день" : "Hours/day on routine"}
              </label>
              <input type="range" min={0.5} max={8} step={0.5} value={hoursPerDay}
                onChange={e => setHoursPerDay(Number(e.target.value))}
                className="w-full accent-coffee mb-2" />
              <div className="text-center text-white font-bold text-xl">{hoursPerDay} {isRu ? "ч" : "h"}</div>
            </div>
          </div>

          {/* Результат */}
          <motion.div
            key={annualSavings}
            initial={{ scale: 0.98, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-coffee/15 to-coffee/5 border border-coffee/30 rounded-xl p-6">
            <p className="text-slate-400 text-sm text-center mb-4">
              {isRu ? "При автоматизации ~60% рутинных задач:" : "Automating ~60% of routine tasks:"}
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-coffee font-extrabold text-2xl md:text-3xl">{fmt(monthlySavings)} €</p>
                <p className="text-slate-400 text-xs mt-1">{isRu ? "экономия в месяц" : "savings / month"}</p>
              </div>
              <div className="border-x border-coffee/20">
                <p className="text-coffee font-extrabold text-2xl md:text-3xl">{fmt(annualSavings)} €</p>
                <p className="text-slate-400 text-xs mt-1">{isRu ? "экономия в год" : "savings / year"}</p>
              </div>
              <div>
                <p className="text-coffee font-extrabold text-2xl md:text-3xl">{fmt(hoursFreed)}</p>
                <p className="text-slate-400 text-xs mt-1">{isRu ? "часов/год возвращено" : "hours/year freed"}</p>
              </div>
            </div>
          </motion.div>

          <p className="text-slate-500 text-xs text-center mt-4">
            {isRu
              ? "Расчёт приблизительный. Точные цифры — на персональном AI-аудите."
              : "Estimate only. Precise numbers — in a personal AI audit."}
          </p>
          <div className="mt-4 text-center">
            <a href="#contact"
              className="inline-flex items-center gap-2 bg-coffee hover:bg-coffee/80 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors">
              <Calculator size={16} />
              {isRu ? "Получить точный расчёт" : "Get a precise estimate"}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  )
}

// ── Контактная форма ──────────────────────────────────────────────────────────
function ContactForm({ lang }: { lang: Lang }) {
  const isRu = lang === 'ru'
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST', body: data, headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('sent'); (e.target as HTMLFormElement).reset() }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  if (status === 'sent') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-sage-green/10 border border-sage-green/40 rounded-2xl p-8 text-center">
        <CheckCircle2 size={40} className="text-sage-green mx-auto mb-3" />
        <h3 className="text-white font-bold text-xl mb-2">
          {isRu ? "Заявка отправлена!" : "Request sent!"}
        </h3>
        <p className="text-slate-400">
          {isRu ? "Отвечу в течение 24 часов." : "I'll get back to you within 24 hours."}
        </p>
      </motion.div>
    )
  }

  const L = isRu ? {
    name: "Имя *", email: "Email *", company: "Компания",
    size: "Сотрудников", sizePh: "Выберите",
    interest: "Что хотите автоматизировать?", interestPh: "Выберите",
    opts: ["Поддержка клиентов", "Документооборот", "Аналитика и отчёты", "Продажи и CRM", "Другое"],
    msg: "Сообщение", msgPh: "Расскажите о вашей задаче...",
    err: "Ошибка отправки. Напишите напрямую:",
    btn: "Записаться на AI-аудит",
    note: "Отвечаю в течение 24 часов · Без спама",
  } : {
    name: "Name *", email: "Email *", company: "Company",
    size: "Team size", sizePh: "Select",
    interest: "What do you want to automate?", interestPh: "Select",
    opts: ["Customer support", "Document processing", "Analytics & reports", "Sales & CRM", "Other"],
    msg: "Message", msgPh: "Tell me about your challenge...",
    err: "Submission error. Write directly:",
    btn: "Book AI Audit",
    note: "Reply within 24 hours · No spam",
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-400 text-sm mb-1.5">{L.name}</label>
          <input required name="name" type="text" placeholder={isRu ? "Ваше имя" : "Your name"}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors" />
        </div>
        <div>
          <label className="block text-slate-400 text-sm mb-1.5">{L.email}</label>
          <input required name="email" type="email" placeholder="your@email.com"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-400 text-sm mb-1.5">{L.company}</label>
          <input name="company" type="text" placeholder={isRu ? "Название компании" : "Company name"}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors" />
        </div>
        <div>
          <label className="block text-slate-400 text-sm mb-1.5">{L.size}</label>
          <select name="team_size"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-coffee transition-colors">
            <option value="">{L.sizePh}</option>
            <option value="1-10">1–10</option>
            <option value="10-30">10–30</option>
            <option value="30-100">30–100</option>
            <option value="100+">100+</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-slate-400 text-sm mb-1.5">{L.interest}</label>
        <select name="interest"
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-coffee transition-colors">
          <option value="">{L.interestPh}</option>
          {['customer_support','documents','analytics','sales','other'].map((v, i) => (
            <option key={v} value={v}>{L.opts[i]}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-slate-400 text-sm mb-1.5">{L.msg}</label>
        <textarea name="message" rows={3} placeholder={L.msgPh}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors resize-none" />
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-sm">
          {L.err}{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>
        </p>
      )}
      <button type="submit" disabled={status === 'sending'}
        className="w-full bg-coffee hover:bg-coffee/80 disabled:opacity-60 text-white px-7 py-3.5 rounded-2xl font-bold transition-colors inline-flex items-center justify-center gap-2">
        {status === 'sending'
          ? <><Loader2 size={18} className="animate-spin" />{isRu ? "Отправка..." : "Sending..."}</>
          : <><Send size={18} />{L.btn}</>}
      </button>
      <p className="text-slate-500 text-xs text-center">{L.note}</p>
    </form>
  )
}

// ── Cookie Banner ─────────────────────────────────────────────────────────────
function CookieBanner({ onAccept, onDecline, onShowPrivacy }: {
  onAccept: () => void; onDecline: () => void; onShowPrivacy: () => void
}) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-3xl mx-auto bg-slate-800 border border-slate-700 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
        <Shield size={22} className="text-coffee flex-shrink-0 mt-0.5" />
        <p className="text-slate-300 text-sm flex-1">
          Этот сайт использует cookies для аналитики.{' '}
          <button onClick={onShowPrivacy} className="text-coffee underline hover:text-coffee/80 transition-colors">
            Политика конфиденциальности
          </button>.
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={onDecline} className="px-4 py-2 text-slate-400 hover:text-white border border-slate-600 hover:border-slate-400 rounded-xl text-sm transition-colors">
            Отклонить
          </button>
          <button onClick={onAccept} className="px-4 py-2 bg-coffee hover:bg-coffee/80 text-white rounded-xl text-sm font-semibold transition-colors">
            Принять
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Privacy Policy Modal ──────────────────────────────────────────────────────
function PrivacyPolicyModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Политика конфиденциальности</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X size={24} /></button>
        </div>
        <div className="text-slate-300 text-sm space-y-5 leading-relaxed">
          <p className="text-slate-500 italic">Последнее обновление: апрель 2026 г.</p>
          {[
            { title: "1. Кто мы", body: `${BRAND_NAME} — индивидуальный консультант по AI-автоматизации, Таллин, Эстония. Контакт: ${CONTACT_EMAIL}` },
            { title: "2. Какие данные мы собираем", body: "Через контактную форму: имя, email, компания, описание задачи. Через cookies (при согласии): анонимная аналитика." },
            { title: "3. Для чего используем данные", body: "Только для ответа на ваш запрос. Не передаём третьим лицам, не используем для рекламы." },
            { title: "4. Правовая основа (GDPR)", body: "Обработка на основании согласия (ст. 6(1)(a) GDPR) и законного интереса (ст. 6(1)(f) GDPR)." },
            { title: "5. Хранение", body: "Данные форм — не более 2 лет. Удаление по запросу в любой момент." },
            { title: "6. Ваши права", body: `Доступ, исправление, удаление, перенос данных, отзыв согласия. Обратитесь: ${CONTACT_EMAIL}` },
            { title: "7. Cookies", body: "Используем только после вашего явного согласия. Отзыв — через баннер или очистку cookies." },
            { title: "8. Надзорный орган", body: "Andmekaitse Inspektsioon (Инспекция по защите данных Эстонии): aki.ee" },
          ].map(({ title, body }) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-base mb-1">{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-slate-700">
          <button onClick={onClose} className="bg-coffee hover:bg-coffee/80 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors">
            Понятно
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [cookieConsent, setCookieConsent] = useState<string | null>(() => {
    try { return localStorage.getItem('cookie_consent') } catch { return null }
  })

  const acceptCookies  = useCallback(() => { localStorage.setItem('cookie_consent', 'accepted');  setCookieConsent('accepted') }, [])
  const declineCookies = useCallback(() => { localStorage.setItem('cookie_consent', 'declined'); setCookieConsent('declined') }, [])

  const isRu = lang === 'ru'

  // Локализованные строки для основных секций
  const s = {
    navCta:        isRu ? "Записаться на аудит"        : "Book AI Audit",
    heroTags:      isRu
      ? ['AI-интеграции для финтех', 'Автоматизация производства', 'Full-stack + AI экспертиза']
      : ['Fintech AI integrations', 'Manufacturing automation', 'Full-stack + AI expertise'],
    heroH1a:       isRu ? "Интеллект дешевеет."         : "Intelligence Is Becoming Cheap.",
    heroH1b:       isRu ? "Компании без AI проигрывают конкурентам." : "Companies Without AI Will Become Uncompetitive.",
    heroP:         isRu
      ? "Помогаю бизнесу внедрять AI-автоматизацию и агентов — сокращать операционные расходы, ускорять процессы и побеждать в новой экономике."
      : "I help businesses integrate AI automation and AI agents to reduce operational costs, accelerate processes, and win in the new economy.",
    heroCta:       isRu ? "Записаться на AI-аудит"      : "Book AI Audit",
    heroHow:       isRu ? "Как это работает"             : "How it works",
    heroLocation:  isRu ? "Таллин, Эстония 🇪🇪"         : "Tallinn, Estonia 🇪🇪",
    ecoTitle:      isRu ? "Мы входим в самую быструю экономическую трансформацию в истории" : "We Are Entering the Fastest Economic Transformation in History",
    ecoP1:         isRu ? "ИИ начинает автоматизировать когнитивный труд. Десятилетиями главным ограничением бизнеса были человеческий интеллект и время. " : "Artificial intelligence is beginning to automate human cognitive work. For decades the main constraint in business was human intelligence and time. ",
    ecoStrong:     isRu ? "Это ограничение исчезает." : "That constraint is disappearing.",
    ecoP2:         isRu ? "Стоимость интеллекта падает. Но эти ресурсы дороже не становятся:" : "The cost of intelligence is collapsing. But these resources are not getting cheaper:",
    ecoResources:  isRu ? ['Земля', 'Энергия', 'Сырьё', 'Внимание людей'] : ['Land', 'Energy', 'Raw materials', 'Human attention'],
    ecoP3a:        isRu ? "Компании, которые победят в следующем десятилетии, объединят " : "The companies that win in the next decade will combine ",
    ecoP3b:        isRu ? "дешёвый интеллект" : "cheap intelligence",
    ecoP3c:        isRu ? " с реальными активами и процессами." : " with real-world assets and processes.",
    realTitle:     isRu ? "Компании всё чаще работают без сотрудников" : "Companies Are Starting To Appear Without Employees",
    realListLabel: isRu ? "AI-агенты уже умеют управлять:" : "AI agents are already capable of managing:",
    realList:      isRu ? ['Email', 'Календари', 'Онлайн-покупки', 'Расписание', 'Коммуникации'] : ['Email', 'Calendars', 'Online purchases', 'Scheduling', 'Communications'],
    realCardP1:    isRu ? "Некоторые агенты выполняют задачи, которые их создатели никогда явно не программировали." : "Some agents perform tasks their creators never explicitly programmed.",
    realCardP2:    isRu ? "Это не просто технологический сдвиг.\nЭто новая экономическая модель." : "This is not just a technology shift.\nIt is a new economic model.",
    compTitle:     isRu ? "Главный риск сегодня — не использовать AI" : "The Biggest Risk Today Is Not Using AI",
    compQ:         isRu ? "Обе компании оказывают одинаковый сервис. Кто победит рынок со временем?" : "Both companies deliver the same service. Which company wins the market over time?",
    compNote:      isRu ? "Компании, автоматизирующие процессы, будут обгонять конкурентов каждый месяц." : "Companies that automate processes will outperform competitors every single month.",
    histTitle:     isRu ? "Каждая технологическая революция делает ресурсы дешевле" : "Every Technological Revolution Makes Resources Cheaper",
    histP1a:       isRu ? "Когда производство одежды подешевело, люди не купили то же количество по меньшей цене. " : "When clothing production became cheap, people didn't buy the same amount at lower prices. ",
    histP1b:       isRu ? "Они купили гораздо больше одежды." : "They bought far more clothing.",
    histP2a:       isRu ? "То же самое касается интеллекта. Когда интеллект дешевеет, мы не просто делаем ту же работу за меньшие деньги — " : "The same pattern applies to intelligence. When intelligence becomes cheap, we don't simply do the same work for less money — ",
    histP2b:       isRu ? "мы делаем несравнимо больше работы и создаём больше инноваций." : "we do dramatically more work and innovation.",
    histP3:        isRu ? "Исторически это всегда заканчивалось экономическим ростом." : "The result historically has always been economic expansion.",
    todayTitle:    isRu ? "AI уже делает за часы то, что раньше занимало недели" : "AI Can Already Do In Hours What Took Weeks",
    todayCards:    isRu
      ? ['Анализировать сложные данные', 'Генерировать код', 'Обрабатывать документы', 'Автоматизировать коммуникации', 'Составлять аналитику', 'Координировать рабочие процессы']
      : ['Analyze complex datasets', 'Generate software code', 'Process documents', 'Automate communication', 'Produce analytics reports', 'Coordinate workflows'],
    todayNote:     isRu ? "Задачи, которые раньше требовали 2–4 недель человеческого труда, теперь выполняются за несколько часов." : "Tasks that previously required 2–4 weeks of human effort can now be completed in a few hours.",
    appTitle:      isRu ? "Где AI создаёт немедленную ценность" : "Where AI Creates Immediate Business Value",
    appSub:        isRu ? "Процессы, готовые к автоматизации — и типичные результаты." : "Processes ready for automation — and the results companies typically see.",
    appAuto:       isRu ? "AI может автоматизировать" : "AI can automate",
    appAutoItems:  isRu ? ['Поддержка клиентов', 'Обработка email', 'Генерация документов', 'Обновление CRM', 'Анализ данных', 'Продажи', 'Маркетинг', 'Отчётность'] : ['Customer Support', 'Email Processing', 'Document Generation', 'CRM Updates', 'Data Analysis', 'Sales Workflows', 'Marketing Operations', 'Internal Reporting'],
    appResults:    isRu ? "Типичные результаты" : "Results companies typically see",
    appResultList: isRu ? ['Снижение операционных расходов', 'Ускорение процессов', 'Меньше ручного труда', 'Рост производительности'] : ['Lower operational costs', 'Faster execution', 'Fewer manual tasks', 'Higher productivity'],
    procTitle:     isRu ? "Как внедряется AI-автоматизация" : "How AI Automation Is Implemented",
    procSteps:     isRu
      ? [{ step: '01', title: 'AI-аудит', desc: 'Анализируем процессы компании и находим возможности для автоматизации.' },
         { step: '02', title: 'AI-роадмап', desc: 'Разрабатываем практическую стратегию AI-интеграции.' },
         { step: '03', title: 'Разработка', desc: 'Строим AI-автоматизацию, агентов и интеграции.' },
         { step: '04', title: 'Запуск', desc: 'Запускаем систему и обучаем команду.' }]
      : [{ step: '01', title: 'AI Audit', desc: 'Analyze company processes and identify automation opportunities.' },
         { step: '02', title: 'AI Roadmap', desc: 'Design a practical AI integration strategy.' },
         { step: '03', title: 'Development', desc: 'Build AI automation, agents, and integrations.' },
         { step: '04', title: 'Deployment', desc: 'Launch the system and onboard the team.' }],
    coreTitle:     isRu ? "Интеллект дешевеет. Ценность перемещается в физический мир." : "Intelligence Is Becoming Cheap. Value Moves To The Physical World.",
    coreP1:        isRu ? "В следующем десятилетии цифровой интеллект станет избыточным. Реальное конкурентное преимущество — у компаний, которые объединят:" : "In the next decade most digital intelligence will become abundant. Real competitive advantage belongs to companies that combine:",
    coreItems:     isRu ? ['Дешёвый интеллект', 'Реальные активы', 'Реальные процессы', 'Внимание клиентов'] : ['Cheap intelligence', 'Real assets', 'Real processes', 'Real customer attention'],
    coreP2:        isRu ? "AI-автоматизация позволяет масштабировать операции, сохраняя небольшие эффективные команды." : "AI automation lets companies scale operations while keeping teams small and efficient.",
    svcTitle:      isRu ? "Услуги" : "Services",
    svcSub:        isRu ? "Выбери подходящий формат сотрудничества." : "Choose the right engagement level for your business.",
    svcPkgs:       isRu ? [
      { title: 'AI-аудит', price: '300–1 000 €', items: ['Анализ бизнес-процессов', 'Карта AI-возможностей', 'Дорожная карта автоматизации'], highlight: false },
      { title: 'AI-автоматизация', price: '3 000 €+', items: ['Автоматизация рабочих процессов', 'AI-интеграции', 'Оптимизация процессов'], highlight: true },
      { title: 'AI-трансформация', price: 'Индивидуально', items: ['Стратегия автоматизации', 'Интеграция нескольких систем', 'Долгосрочная оптимизация'], highlight: false },
    ] : [
      { title: 'AI Audit', price: '300–1,000 €', items: ['Business process analysis', 'AI opportunity mapping', 'Automation strategy roadmap'], highlight: false },
      { title: 'AI Automation', price: '3,000 €+', items: ['Workflow automation', 'AI integrations', 'Process optimization'], highlight: true },
      { title: 'AI Transformation', price: 'Custom', items: ['Automation strategy', 'Multiple system integrations', 'Long-term optimization'], highlight: false },
    ],
    svcGetStarted: isRu ? "Начать" : "Get Started",
    aboutTitle:    isRu ? "Почему стоит работать со мной" : "Why Work With Me",
    aboutRole:     isRu ? "Консультант по AI-автоматизации" : "AI Automation Consultant",
    aboutItems:    isRu ? [
      'Full-stack разработчик с глубоким опытом AI-интеграций',
      'Реализованные AI-решения в реальных продакшн-системах',
      'Опыт в финтех и производственных процессах',
      'Фокус на измеримых бизнес-результатах и ROI',
    ] : [
      'Full-stack developer with deep AI integration experience',
      'Built and integrated AI solutions in real production systems',
      'Background in fintech and manufacturing workflows',
      'Focus on measurable business outcomes and ROI',
    ],
    aboutCard:     isRu ? "Не просто впечатляющие демо — практическая автоматизация с измеримым ROI для финтех, производства и SaaS-бизнесов в Эстонии и Балтийском регионе." : "Not just impressive demos — practical automation that creates measurable ROI across fintech, manufacturing, and SaaS businesses in Estonia and the Baltic region.",
    faqTitle:      isRu ? "Часто задаваемые вопросы" : "Frequently Asked Questions",
    faqItems:      isRu ? [
      { q: 'Сколько времени занимает внедрение?', a: 'Типичные проекты AI-автоматизации занимают 2–6 недель в зависимости от сложности.' },
      { q: 'Нужна ли новая инфраструктура?', a: 'Большинство решений интегрируются с существующими инструментами — CRM, API, базами данных и системами коммуникаций.' },
      { q: 'Какие технологии используются?', a: 'Современные AI-API, платформы автоматизации, бэкенд-интеграции и кастомные агентские системы.' },
      { q: 'Подходит ли это для малого бизнеса?', a: 'Да. Небольшие команды выигрывают больше всего — автоматизация кратно увеличивает их операционный потенциал.' },
    ] : [
      { q: 'How long does implementation take?', a: 'Typical AI automation projects take 2–6 weeks depending on complexity.' },
      { q: 'Do we need new infrastructure?', a: 'Most AI solutions integrate with existing tools — CRM, APIs, databases, and communication platforms.' },
      { q: 'What technologies are used?', a: 'Modern AI APIs, automation platforms, backend integrations, and custom agent systems.' },
      { q: 'Is this relevant for small businesses?', a: 'Yes. Small teams benefit the most — automation dramatically increases their operational capacity.' },
    ],
    contactTitle:  isRu ? "Узнай, как AI может автоматизировать твой бизнес" : "Discover How AI Can Automate Your Business",
    contactItems:  isRu ? ['Какие процессы можно автоматизировать', 'Потенциальное сокращение затрат', 'Наиболее высокоэффективные AI-возможности']
                        : ['Which processes can be automated', 'Potential cost reductions', 'The highest-impact AI opportunities'],
    contactSub:    isRu ? "Запишись на AI-аудит и узнай:" : "Book an AI audit to identify:",
    footerPrivacy: isRu ? "Политика конфиденциальности" : "Privacy Policy",
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">

      {/* Cookie Banner */}
      <AnimatePresence>
        {!cookieConsent && <CookieBanner onAccept={acceptCookies} onDecline={declineCookies} onShowPrivacy={() => setShowPrivacy(true)} />}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && <PrivacyPolicyModal onClose={() => setShowPrivacy(false)} />}
      </AnimatePresence>

      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <span className="font-bold text-coffee">{BRAND_NAME}</span>
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex bg-slate-800 border border-slate-700 rounded-lg overflow-hidden text-xs font-semibold">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 transition-colors ${lang === 'en' ? 'bg-coffee text-white' : 'text-slate-400 hover:text-white'}`}>
                EN
              </button>
              <button
                onClick={() => setLang('ru')}
                className={`px-3 py-1.5 transition-colors ${lang === 'ru' ? 'bg-coffee text-white' : 'text-slate-400 hover:text-white'}`}>
                RU
              </button>
            </div>
            <a href="#contact" className="bg-coffee hover:bg-coffee/80 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
              {s.navCta}
            </a>
          </div>
        </div>
      </nav>

      {/* 1. HERO */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-charcoal/30 pointer-events-none" />
        <motion.div className="relative max-w-4xl mx-auto text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-6">
            {/* Location badge */}
            <span className="bg-coffee/15 border border-coffee/30 text-coffee text-xs font-semibold px-3 py-1 rounded-full">
              📍 {s.heroLocation}
            </span>
            {s.heroTags.map(t => (
              <span key={t} className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium px-3 py-1 rounded-full">{t}</span>
            ))}
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold leading-tight mb-5 text-white">
            {s.heroH1a}{' '}<span className="text-coffee">{s.heroH1b}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-slate-300 mb-9 max-w-2xl mx-auto">{s.heroP}</motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#contact" className="bg-coffee hover:bg-coffee/80 text-white px-7 py-3.5 rounded-2xl font-bold transition-colors inline-flex items-center gap-2 justify-center">
              {s.heroCta} <ArrowRight size={18} />
            </a>
            <a href="#process" className="border border-slate-600 hover:border-slate-400 text-slate-300 px-7 py-3.5 rounded-2xl font-semibold transition-colors">
              {s.heroHow}
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. VIDEO */}
      <VideoSection lang={lang} />

      {/* 3. ECONOMIC SHIFT */}
      <Section dark id="economic-shift">
        <SectionHeader title={s.ecoTitle} />
        <motion.div className="max-w-2xl mx-auto space-y-4 text-slate-300 text-lg leading-relaxed" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p>{s.ecoP1}<strong className="text-white">{s.ecoStrong}</strong></p>
          <p>{s.ecoP2}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            {s.ecoResources.map(r => (
              <div key={r} className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-center text-sm font-medium text-slate-200">{r}</div>
            ))}
          </div>
          <p>{s.ecoP3a}<strong className="text-white">{s.ecoP3b}</strong>{s.ecoP3c}</p>
        </motion.div>
      </Section>

      {/* 4. NEW BUSINESS REALITY */}
      <Section id="new-reality">
        <SectionHeader title={s.realTitle} />
        <motion.div className="grid md:grid-cols-2 gap-6 items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-slate-300 text-lg leading-relaxed space-y-3">
            <p>{s.realListLabel}</p>
            <ul className="space-y-1.5">
              {s.realList.map(i => (
                <li key={i} className="flex items-center gap-2"><Zap size={14} className="text-coffee flex-shrink-0" />{i}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-slate-300 text-lg leading-relaxed space-y-3">
            <p>{s.realCardP1}</p>
            <p className="text-white font-semibold whitespace-pre-line">{s.realCardP2}</p>
          </motion.div>
        </motion.div>
      </Section>

      {/* 5. COMPETITION */}
      <Section dark id="competition">
        <SectionHeader title={s.compTitle} />
        <motion.div className="grid md:grid-cols-2 gap-6 mb-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3"><Building2 size={18} className="text-slate-400" /><span className="font-bold text-white">{isRu ? "Компания А" : "Company A"}</span></div>
            <div className="flex items-center gap-2"><DollarSign size={16} className="text-red-400" /><span className="text-slate-300">{isRu ? "Годовой ФОТ:" : "Annual payroll:"} <strong className="text-red-400">5 000 000 €</strong></span></div>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-sage-green/10 border border-sage-green/40 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3"><Bot size={18} className="text-sage-green" /><span className="font-bold text-white">{isRu ? "Компания Б" : "Company B"}</span></div>
            <div className="flex items-center gap-2 mb-1"><DollarSign size={16} className="text-sage-green" /><span className="text-slate-300">{isRu ? "Годовой ФОТ:" : "Annual payroll:"} <strong className="text-sage-green">300 000 €</strong></span></div>
            <p className="text-slate-400 text-sm">{isRu ? "AI-автоматизация выполняет большую часть операционной работы." : "AI automation handles most operational work."}</p>
          </motion.div>
        </motion.div>
        <motion.p className="text-center text-slate-300 text-lg" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <strong className="text-white">{s.compQ}</strong><br />
          <span className="text-slate-400 text-base">{s.compNote}</span>
        </motion.p>
      </Section>

      {/* 6. HISTORICAL CONTEXT */}
      <Section id="history">
        <SectionHeader title={s.histTitle} />
        <motion.div className="max-w-2xl mx-auto text-slate-300 text-lg leading-relaxed space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p>{s.histP1a}<strong className="text-white">{s.histP1b}</strong></p>
          <p>{s.histP2a}<strong className="text-white">{s.histP2b}</strong></p>
          <p className="text-slate-400">{s.histP3}</p>
        </motion.div>
      </Section>

      {/* 7. AI TODAY */}
      <Section dark id="ai-today">
        <SectionHeader title={s.todayTitle} />
        <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[
            <BarChart3 size={18} className="text-blue-400" />,
            <Workflow size={18} className="text-sage-green" />,
            <FileText size={18} className="text-coffee" />,
            <Mail size={18} className="text-purple-400" />,
            <BarChart3 size={18} className="text-yellow-400" />,
            <Bot size={18} className="text-cyan-400" />,
          ].map((icon, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-3 text-slate-300">
              {icon}<span>{s.todayCards[i]}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.p className="text-center text-slate-400 mt-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          {s.todayNote}
        </motion.p>
      </Section>

      {/* 8. APPLICATIONS */}
      <Section id="applications">
        <SectionHeader title={s.appTitle} sub={s.appSub} />
        <motion.div className="grid md:grid-cols-2 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <h3 className="font-bold text-white mb-4">{s.appAuto}</h3>
            <div className="flex flex-wrap gap-2">
              {s.appAutoItems.map(i => (
                <span key={i} className="bg-slate-800 text-slate-300 text-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Zap size={12} className="text-coffee" />{i}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <h3 className="font-bold text-white mb-4">{s.appResults}</h3>
            <ul className="space-y-3">
              {s.appResultList.map(r => (
                <li key={r} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 size={16} className="text-sage-green flex-shrink-0" />{r}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Section>

      {/* 9. PROCESS */}
      <Section dark id="process">
        <SectionHeader title={s.procTitle} />
        <motion.div className="grid md:grid-cols-4 gap-5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {s.procSteps.map(item => (
            <motion.div key={item.step} variants={fadeUp} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-coffee/20 border border-coffee/40 flex items-center justify-center mx-auto mb-3">
                <span className="text-coffee font-bold">{item.step}</span>
              </div>
              <h3 className="font-bold text-white mb-1.5">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 10. CORE IDEA */}
      <Section id="core-idea">
        <motion.div className="max-w-2xl mx-auto text-center space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-white">{s.coreTitle}</h2>
          <p className="text-slate-300 text-lg">{s.coreP1}</p>
          <div className="grid grid-cols-2 gap-3">
            {s.coreItems.map(i => (
              <div key={i} className="bg-slate-900 border border-coffee/30 rounded-xl px-4 py-3 text-coffee font-semibold text-sm">{i}</div>
            ))}
          </div>
          <p className="text-slate-400">{s.coreP2}</p>
        </motion.div>
      </Section>

      {/* 11. SERVICES */}
      <Section dark id="services">
        <SectionHeader title={s.svcTitle} sub={s.svcSub} />
        <motion.div className="grid md:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {s.svcPkgs.map(pkg => (
            <motion.div key={pkg.title} variants={fadeUp} className={`rounded-2xl p-6 border flex flex-col ${pkg.highlight ? 'bg-coffee/10 border-coffee' : 'bg-slate-800 border-slate-700'}`}>
              {pkg.highlight && <span className="self-start bg-coffee text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">{isRu ? "Популярный" : "Most Popular"}</span>}
              <h3 className="text-xl font-bold text-white mb-1">{pkg.title}</h3>
              <div className="text-2xl font-extrabold text-coffee my-3">{pkg.price}</div>
              <ul className="space-y-2 mb-6 flex-1">
                {pkg.items.map(i => (
                  <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 size={14} className="text-sage-green flex-shrink-0" />{i}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`text-center py-3 rounded-xl font-semibold transition-colors text-sm ${pkg.highlight ? 'bg-coffee hover:bg-coffee/80 text-white' : 'border border-slate-600 hover:border-slate-400 text-slate-300'}`}>
                {s.svcGetStarted}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 12. CASE STUDIES */}
      <CaseStudies lang={lang} />

      {/* 13. TESTIMONIALS */}
      <Testimonials lang={lang} />

      {/* 14. ROI CALCULATOR */}
      <ROICalculator lang={lang} />

      {/* 15. ABOUT */}
      <Section id="about">
        <motion.div className="grid md:grid-cols-2 gap-10 items-start" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl font-bold text-white mb-5">{s.aboutTitle}</h2>
            <div className="flex items-center gap-4 mb-6 bg-slate-900 border border-slate-700 rounded-2xl p-4">
              <PhotoPlaceholder />
              <div>
                <p className="text-white font-bold text-lg">{YOUR_NAME}</p>
                <p className="text-coffee text-sm font-medium">{s.aboutRole}</p>
                <p className="text-slate-400 text-sm mt-1">Tallinn, Estonia 🇪🇪</p>
              </div>
            </div>
            <ul className="space-y-3">
              {s.aboutItems.map(item => (
                <li key={item} className="flex items-start gap-3 text-slate-300">
                  <TrendingUp size={17} className="text-sage-green flex-shrink-0 mt-0.5" />{item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-7 text-slate-300 leading-relaxed">
            {s.aboutCard}
          </motion.div>
        </motion.div>
      </Section>

      {/* 16. FAQ */}
      <Section dark id="faq">
        <SectionHeader title={s.faqTitle} />
        <motion.div className="space-y-3 max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {s.faqItems.map(item => (
            <motion.div key={item.q} variants={fadeUp} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-1.5">{item.q}</h3>
              <p className="text-slate-400 text-sm">{item.a}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 17. CONTACT */}
      <section className="py-20 px-6 bg-gradient-to-br from-coffee/20 via-slate-900 to-charcoal/30" id="contact">
        <div className="max-w-2xl mx-auto">
          <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white mb-4">{s.contactTitle}</motion.h2>
            <motion.div variants={fadeUp} className="mb-2">
              <p className="text-slate-400 mb-4">{s.contactSub}</p>
              {s.contactItems.map(i => (
                <div key={i} className="flex items-center gap-2 justify-center text-slate-300 mb-1">
                  <CheckCircle2 size={15} className="text-sage-green" />{i}
                </div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bg-slate-900/80 border border-slate-700 rounded-2xl p-8">
            <ContactForm lang={lang} />
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-slate-500 text-sm">© 2026 {BRAND_NAME} · Tallinn, Estonia</span>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
              className="text-slate-400 hover:text-coffee transition-colors flex items-center gap-1.5 text-sm">
              <Linkedin size={15} />LinkedIn
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`}
              className="text-slate-400 hover:text-coffee transition-colors flex items-center gap-1.5 text-sm">
              <Mail size={15} />{CONTACT_EMAIL}
            </a>
            <a href="#" className="text-slate-400 hover:text-coffee transition-colors flex items-center gap-1.5 text-sm">
              <FileText size={15} />Blog
            </a>
            <button onClick={() => setShowPrivacy(true)}
              className="text-slate-400 hover:text-coffee transition-colors flex items-center gap-1.5 text-sm">
              <Shield size={14} />{s.footerPrivacy}
            </button>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App

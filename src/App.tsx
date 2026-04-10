import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot, BarChart3, Workflow, CheckCircle2,
  Mail, Linkedin, FileText, ArrowRight,
  Zap, TrendingUp, Building2, DollarSign,
  X, Shield, Send, User, Loader2
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// КОНФИГУРАЦИЯ — измени эти значения под себя
// ─────────────────────────────────────────────────────────────────────────────
const BRAND_NAME    = "Sergei · AI Consult"  // TODO: замени на свой бренд
const YOUR_NAME     = "Sergei"
const CONTACT_EMAIL = "acrashik@gmail.com"
const LINKEDIN_URL  = "https://www.linkedin.com/in/sergei-zahharenko " // TODO: вставь свою ссылку
const FORMSPREE_ID  = "mdapryan"
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

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

// ── Фото-заглушка (замени на <img> когда будет фото) ─────────────────────────
// Чтобы добавить фото: положи файл photo.jpg в папку /public/ и замени
// этот компонент на: <img src="/photo.jpg" alt={YOUR_NAME} className="w-32 h-32 rounded-2xl object-cover" />
function PhotoPlaceholder() {
  return (
    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-coffee/30 to-coffee/10 border-2 border-coffee/40 flex flex-col items-center justify-center flex-shrink-0 gap-1">
      <User size={36} className="text-coffee" />
      <span className="text-coffee/60 text-xs font-medium">Добавь фото</span>
    </div>
  )
}

// ── Контактная форма с Formspree ─────────────────────────────────────────────
function ContactForm() {
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
        <h3 className="text-white font-bold text-xl mb-2">Заявка отправлена!</h3>
        <p className="text-slate-400">Отвечу в течение 24 часов.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-400 text-sm mb-1.5">Имя *</label>
          <input required name="name" type="text" placeholder="Ваше имя"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors" />
        </div>
        <div>
          <label className="block text-slate-400 text-sm mb-1.5">Email *</label>
          <input required name="email" type="email" placeholder="your@email.com"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-400 text-sm mb-1.5">Компания</label>
          <input name="company" type="text" placeholder="Название компании"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors" />
        </div>
        <div>
          <label className="block text-slate-400 text-sm mb-1.5">Сотрудников</label>
          <select name="team_size"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-coffee transition-colors">
            <option value="">Выберите</option>
            <option value="1-10">1–10</option>
            <option value="10-30">10–30</option>
            <option value="30-100">30–100</option>
            <option value="100+">100+</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-slate-400 text-sm mb-1.5">Что хотите автоматизировать?</label>
        <select name="interest"
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-coffee transition-colors">
          <option value="">Выберите</option>
          <option value="customer_support">Поддержка клиентов</option>
          <option value="documents">Документооборот</option>
          <option value="analytics">Аналитика и отчёты</option>
          <option value="sales">Продажи и CRM</option>
          <option value="other">Другое</option>
        </select>
      </div>
      <div>
        <label className="block text-slate-400 text-sm mb-1.5">Сообщение</label>
        <textarea name="message" rows={3} placeholder="Расскажите о вашей задаче..."
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors resize-none" />
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-sm">
          Ошибка отправки. Напишите напрямую:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>
        </p>
      )}
      <button type="submit" disabled={status === 'sending'}
        className="w-full bg-coffee hover:bg-coffee/80 disabled:opacity-60 text-white px-7 py-3.5 rounded-2xl font-bold transition-colors inline-flex items-center justify-center gap-2">
        {status === 'sending'
          ? <><Loader2 size={18} className="animate-spin" /> Отправка...</>
          : <><Send size={18} /> Записаться на AI-аудит</>}
      </button>
      <p className="text-slate-500 text-xs text-center">Отвечаю в течение 24 часов · Без спама</p>
    </form>
  )
}

// ── GDPR Cookie Banner ────────────────────────────────────────────────────────
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
          Этот сайт использует cookies для аналитики. Нажимая «Принять», вы соглашаетесь с нашей{' '}
          <button onClick={onShowPrivacy} className="text-coffee underline hover:text-coffee/80 transition-colors">
            Политикой конфиденциальности
          </button>.
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={onDecline}
            className="px-4 py-2 text-slate-400 hover:text-white border border-slate-600 hover:border-slate-400 rounded-xl text-sm transition-colors">
            Отклонить
          </button>
          <button onClick={onAccept}
            className="px-4 py-2 bg-coffee hover:bg-coffee/80 text-white rounded-xl text-sm font-semibold transition-colors">
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
            {
              title: "1. Кто мы",
              body: `${BRAND_NAME} — индивидуальный консультант по AI-автоматизации, работающий из Таллина, Эстония. Контакт: ${CONTACT_EMAIL}`
            },
            {
              title: "2. Какие данные мы собираем",
              body: "Через контактную форму: имя, email, название компании, описание задачи. Через cookies (при согласии): анонимная аналитика посещаемости."
            },
            {
              title: "3. Для чего используем данные",
              body: "Исключительно для ответа на ваш запрос и, с вашего согласия, для связи по теме AI-консалтинга. Мы не передаём ваши данные третьим лицам и не используем их для рекламы."
            },
            {
              title: "4. Правовая основа (GDPR)",
              body: "Обработка данных осуществляется на основании вашего согласия (ст. 6(1)(a) GDPR) и законного интереса для ответа на деловые запросы (ст. 6(1)(f) GDPR)."
            },
            {
              title: "5. Хранение данных",
              body: "Данные контактных форм хранятся не более 2 лет. Вы можете запросить удаление в любой момент."
            },
            {
              title: "6. Ваши права",
              body: `Вы имеете право на доступ, исправление, удаление и перенос ваших данных, а также на отзыв согласия. Обратитесь: ${CONTACT_EMAIL}`
            },
            {
              title: "7. Cookies",
              body: "Мы используем cookies только после вашего явного согласия. Вы можете отозвать согласие, нажав «Отклонить» в баннере или очистив cookies браузера."
            },
            {
              title: "8. Надзорный орган",
              body: "По вопросам защиты данных вы можете обратиться в Инспекцию по защите данных Эстонии (Andmekaitse Inspektsioon): aki.ee"
            },
          ].map(({ title, body }) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-base mb-1">{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-slate-700">
          <button onClick={onClose}
            className="bg-coffee hover:bg-coffee/80 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors">
            Понятно
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [cookieConsent, setCookieConsent] = useState<string | null>(() => {
    try { return localStorage.getItem('cookie_consent') } catch { return null }
  })

  const acceptCookies  = () => { localStorage.setItem('cookie_consent', 'accepted');  setCookieConsent('accepted') }
  const declineCookies = () => { localStorage.setItem('cookie_consent', 'declined'); setCookieConsent('declined') }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">

      {/* Cookie Banner */}
      <AnimatePresence>
        {!cookieConsent && (
          <CookieBanner
            onAccept={acceptCookies}
            onDecline={declineCookies}
            onShowPrivacy={() => setShowPrivacy(true)}
          />
        )}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && <PrivacyPolicyModal onClose={() => setShowPrivacy(false)} />}
      </AnimatePresence>

      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-coffee">{BRAND_NAME}</span>
          <a href="#contact" className="bg-coffee hover:bg-coffee/80 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
            Book AI Audit
          </a>
        </div>
      </nav>

      {/* 1. HERO */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-charcoal/30 pointer-events-none" />
        <motion.div className="relative max-w-4xl mx-auto text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-6">
            {['Fintech AI integrations', 'Manufacturing automation', 'Full-stack + AI expertise'].map(t => (
              <span key={t} className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium px-3 py-1 rounded-full">{t}</span>
            ))}
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold leading-tight mb-5 text-white">
            Intelligence Is Becoming Cheap.{' '}
            <span className="text-coffee">Companies Without AI Will Become Uncompetitive.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-slate-300 mb-9 max-w-2xl mx-auto">
            I help businesses integrate AI automation and AI agents to reduce operational costs,
            accelerate processes, and win in the new economy.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#contact" className="bg-coffee hover:bg-coffee/80 text-white px-7 py-3.5 rounded-2xl font-bold transition-colors inline-flex items-center gap-2 justify-center">
              Book AI Audit <ArrowRight size={18} />
            </a>
            <a href="#process" className="border border-slate-600 hover:border-slate-400 text-slate-300 px-7 py-3.5 rounded-2xl font-semibold transition-colors">
              How it works
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. ECONOMIC SHIFT */}
      <Section dark id="economic-shift">
        <SectionHeader title="We Are Entering the Fastest Economic Transformation in History" />
        <motion.div className="max-w-2xl mx-auto space-y-4 text-slate-300 text-lg leading-relaxed" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p>Artificial intelligence is beginning to automate human cognitive work. For decades the main constraint in business was human intelligence and time. <strong className="text-white">That constraint is disappearing.</strong></p>
          <p>The cost of intelligence is collapsing. But these resources are <em>not</em> getting cheaper:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            {['Land', 'Energy', 'Raw materials', 'Human attention'].map(r => (
              <div key={r} className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-center text-sm font-medium text-slate-200">{r}</div>
            ))}
          </div>
          <p>The companies that win in the next decade will combine <strong className="text-white">cheap intelligence</strong> with real-world assets and processes.</p>
        </motion.div>
      </Section>

      {/* 3. NEW BUSINESS REALITY */}
      <Section id="new-reality">
        <SectionHeader title="Companies Are Starting To Appear Without Employees" />
        <motion.div className="grid md:grid-cols-2 gap-6 items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-slate-300 text-lg leading-relaxed space-y-3">
            <p>AI agents are already capable of managing:</p>
            <ul className="space-y-1.5">
              {['Email', 'Calendars', 'Online purchases', 'Scheduling', 'Communications'].map(i => (
                <li key={i} className="flex items-center gap-2"><Zap size={14} className="text-coffee flex-shrink-0" />{i}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-slate-300 text-lg leading-relaxed space-y-3">
            <p>Some agents perform tasks their creators never explicitly programmed.</p>
            <p className="text-white font-semibold">This is not just a technology shift.<br />It is a new economic model.</p>
          </motion.div>
        </motion.div>
      </Section>

      {/* 4. COMPETITION */}
      <Section dark id="competition">
        <SectionHeader title="The Biggest Risk Today Is Not Using AI" />
        <motion.div className="grid md:grid-cols-2 gap-6 mb-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3"><Building2 size={18} className="text-slate-400" /><span className="font-bold text-white">Company A</span></div>
            <div className="flex items-center gap-2"><DollarSign size={16} className="text-red-400" /><span className="text-slate-300">Annual payroll: <strong className="text-red-400">5,000,000 €</strong></span></div>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-sage-green/10 border border-sage-green/40 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3"><Bot size={18} className="text-sage-green" /><span className="font-bold text-white">Company B</span></div>
            <div className="flex items-center gap-2 mb-1"><DollarSign size={16} className="text-sage-green" /><span className="text-slate-300">Annual payroll: <strong className="text-sage-green">300,000 €</strong></span></div>
            <p className="text-slate-400 text-sm">AI automation handles most operational work.</p>
          </motion.div>
        </motion.div>
        <motion.p className="text-center text-slate-300 text-lg" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          Both companies deliver the same service. <strong className="text-white">Which company wins the market over time?</strong><br />
          <span className="text-slate-400 text-base">Companies that automate processes will outperform competitors every single month.</span>
        </motion.p>
      </Section>

      {/* 5. HISTORICAL CONTEXT */}
      <Section id="history">
        <SectionHeader title="Every Technological Revolution Makes Resources Cheaper" />
        <motion.div className="max-w-2xl mx-auto text-slate-300 text-lg leading-relaxed space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p>When clothing production became cheap, people didn't buy the same amount at lower prices. <strong className="text-white">They bought far more clothing.</strong></p>
          <p>The same pattern applies to intelligence. When intelligence becomes cheap, we don't simply do the same work for less money — <strong className="text-white">we do dramatically more work and innovation.</strong></p>
          <p className="text-slate-400">The result historically has always been economic expansion.</p>
        </motion.div>
      </Section>

      {/* 6. WHAT AI CAN DO TODAY */}
      <Section dark id="ai-today">
        <SectionHeader title="AI Can Already Do In Hours What Took Weeks" />
        <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[
            { icon: <BarChart3 size={18} className="text-blue-400" />, text: 'Analyze complex datasets' },
            { icon: <Workflow size={18} className="text-sage-green" />, text: 'Generate software code' },
            { icon: <FileText size={18} className="text-coffee" />, text: 'Process documents' },
            { icon: <Mail size={18} className="text-purple-400" />, text: 'Automate communication' },
            { icon: <BarChart3 size={18} className="text-yellow-400" />, text: 'Produce analytics reports' },
            { icon: <Bot size={18} className="text-cyan-400" />, text: 'Coordinate workflows' },
          ].map(({ icon, text }) => (
            <motion.div key={text} variants={fadeUp} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-3 text-slate-300">
              {icon}<span>{text}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.p className="text-center text-slate-400 mt-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          Tasks that previously required 2–4 weeks of human effort can now be completed in a few hours.
        </motion.p>
      </Section>

      {/* 7. BUSINESS APPLICATIONS */}
      <Section id="applications">
        <SectionHeader title="Where AI Creates Immediate Business Value" sub="Processes ready for automation — and the results companies typically see." />
        <motion.div className="grid md:grid-cols-2 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <h3 className="font-bold text-white mb-4">AI can automate</h3>
            <div className="flex flex-wrap gap-2">
              {['Customer Support', 'Email Processing', 'Document Generation', 'CRM Updates', 'Data Analysis', 'Sales Workflows', 'Marketing Operations', 'Internal Reporting'].map(i => (
                <span key={i} className="bg-slate-800 text-slate-300 text-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Zap size={12} className="text-coffee" />{i}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <h3 className="font-bold text-white mb-4">Results companies typically see</h3>
            <ul className="space-y-3">
              {['Lower operational costs', 'Faster execution', 'Fewer manual tasks', 'Higher productivity'].map(r => (
                <li key={r} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 size={16} className="text-sage-green flex-shrink-0" />{r}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Section>

      {/* 8. IMPLEMENTATION PROCESS */}
      <Section dark id="process">
        <SectionHeader title="How AI Automation Is Implemented" />
        <motion.div className="grid md:grid-cols-4 gap-5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[
            { step: '01', title: 'AI Audit',     desc: 'Analyze company processes and identify automation opportunities.' },
            { step: '02', title: 'AI Roadmap',   desc: 'Design a practical AI integration strategy.' },
            { step: '03', title: 'Development',  desc: 'Build AI automation, agents, and integrations.' },
            { step: '04', title: 'Deployment',   desc: 'Launch the system and onboard the team.' },
          ].map(item => (
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

      {/* 9. CORE IDEA */}
      <Section id="core-idea">
        <motion.div className="max-w-2xl mx-auto text-center space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-white">Intelligence Is Becoming Cheap. Value Moves To The Physical World.</h2>
          <p className="text-slate-300 text-lg">In the next decade most digital intelligence will become abundant. Real competitive advantage belongs to companies that combine:</p>
          <div className="grid grid-cols-2 gap-3">
            {['Cheap intelligence', 'Real assets', 'Real processes', 'Real customer attention'].map(i => (
              <div key={i} className="bg-slate-900 border border-coffee/30 rounded-xl px-4 py-3 text-coffee font-semibold text-sm">{i}</div>
            ))}
          </div>
          <p className="text-slate-400">AI automation lets companies scale operations while keeping teams small and efficient.</p>
        </motion.div>
      </Section>

      {/* 10. SERVICES */}
      <Section dark id="services">
        <SectionHeader title="Services" sub="Choose the right engagement level for your business." />
        <motion.div className="grid md:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[
            { title: 'AI Audit',           price: '300–1,000 €', items: ['Business process analysis', 'AI opportunity mapping', 'Automation strategy roadmap'], highlight: false },
            { title: 'AI Automation',      price: '3,000 €+',    items: ['Workflow automation', 'AI integrations', 'Process optimization'],                    highlight: true  },
            { title: 'AI Transformation',  price: 'Custom',      items: ['Automation strategy', 'Multiple system integrations', 'Long-term optimization'],     highlight: false },
          ].map(pkg => (
            <motion.div key={pkg.title} variants={fadeUp} className={`rounded-2xl p-6 border flex flex-col ${pkg.highlight ? 'bg-coffee/10 border-coffee' : 'bg-slate-800 border-slate-700'}`}>
              {pkg.highlight && <span className="self-start bg-coffee text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">Most Popular</span>}
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
                Get Started
              </a>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 11. ABOUT */}
      <Section id="about">
        <motion.div className="grid md:grid-cols-2 gap-10 items-start" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl font-bold text-white mb-5">Why Work With Me</h2>

            {/* Photo card */}
            <div className="flex items-center gap-4 mb-6 bg-slate-900 border border-slate-700 rounded-2xl p-4">
              <PhotoPlaceholder />
              <div>
                <p className="text-white font-bold text-lg">{YOUR_NAME}</p>
                <p className="text-coffee text-sm font-medium">AI Automation Consultant</p>
                <p className="text-slate-400 text-sm mt-1">Tallinn, Estonia 🇪🇪</p>
              </div>
            </div>

            <ul className="space-y-3">
              {[
                'Full-stack developer with deep AI integration experience',
                'Built and integrated AI solutions in real production systems',
                'Background in fintech and manufacturing workflows',
                'Focus on measurable business outcomes and ROI',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-slate-300">
                  <TrendingUp size={17} className="text-sage-green flex-shrink-0 mt-0.5" />{item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-7 text-slate-300 leading-relaxed">
            Not just impressive demos — practical automation that creates measurable ROI across fintech, manufacturing, and SaaS businesses.
          </motion.div>
        </motion.div>
      </Section>

      {/* 12. FAQ */}
      <Section dark id="faq">
        <SectionHeader title="Frequently Asked Questions" />
        <motion.div className="space-y-3 max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[
            { q: 'How long does implementation take?',  a: 'Typical AI automation projects take 2–6 weeks depending on complexity.' },
            { q: 'Do we need new infrastructure?',      a: 'Most AI solutions integrate with existing tools — CRM, APIs, databases, and communication platforms.' },
            { q: 'What technologies are used?',         a: 'Modern AI APIs, automation platforms, backend integrations, and custom agent systems.' },
            { q: 'Is this relevant for small businesses?', a: 'Yes. Small teams benefit the most — automation dramatically increases their operational capacity.' },
          ].map(item => (
            <motion.div key={item.q} variants={fadeUp} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-1.5">{item.q}</h3>
              <p className="text-slate-400 text-sm">{item.a}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 13. CONTACT FORM */}
      <section className="py-20 px-6 bg-gradient-to-br from-coffee/20 via-slate-900 to-charcoal/30" id="contact">
        <div className="max-w-2xl mx-auto">
          <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white mb-4">
              Discover How AI Can Automate Your Business
            </motion.h2>
            <motion.div variants={fadeUp} className="mb-2">
              <p className="text-slate-400 mb-4">Book an AI audit to identify:</p>
              {['Which processes can be automated', 'Potential cost reductions', 'The highest-impact AI opportunities'].map(i => (
                <div key={i} className="flex items-center gap-2 justify-center text-slate-300 mb-1">
                  <CheckCircle2 size={15} className="text-sage-green" />{i}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bg-slate-900/80 border border-slate-700 rounded-2xl p-8">
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-slate-500 text-sm">© 2026 {BRAND_NAME}</span>
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
              <Shield size={14} />Privacy Policy
            </button>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App

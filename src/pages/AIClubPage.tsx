import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Lightbulb, Users, Zap, MessageCircle, Target, ChevronRight, Calendar, ArrowRight, ArrowLeft } from 'lucide-react'
import { SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from '../config'
import { fadeUp, stagger } from '../animations'
import { Nav } from '../components/layout/Nav'
import { MeetupBanner } from '../components/layout/MeetupBanner'
import { Footer } from '../components/layout/Footer'

const pillarIcons = [
  <Lightbulb size={24} className="text-coffee" />,
  <Users size={24} className="text-coffee" />,
  <Zap size={24} className="text-coffee" />,
]

const timelineIcons = [
  <MessageCircle size={16} />,
  <Zap size={16} />,
  <Target size={16} />,
  <Lightbulb size={16} />,
  <Users size={16} />,
  <MessageCircle size={16} />,
]

export default function AIClubPage() {
  const { lang } = useParams<{ lang: string }>()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const validLang = SUPPORTED_LANGS.includes(lang as Lang) ? (lang as Lang) : DEFAULT_LANG
    if (validLang !== lang) {
      navigate(`/${validLang}/club`, { replace: true })
      return
    }
    if (i18n.language !== validLang) {
      i18n.changeLanguage(validLang)
    }
  }, [lang, i18n, navigate])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const pillars = t('club.pillars', { returnObjects: true }) as { title: string; desc: string }[]
  const timeline = t('club.timeline', { returnObjects: true }) as { time: string; label: string }[]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <MeetupBanner />
      <Nav />

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            to={`/${lang || 'en'}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-coffee text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            {t('club.backToHome')}
          </Link>

          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {t('club.title')}
            </h1>
            <p className="text-slate-400 text-lg">{t('club.sub')}</p>
          </motion.div>

          {/* 3 Pillars */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-16"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-coffee/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-coffee/15 border border-coffee/30 flex items-center justify-center mb-4">
                  {pillarIcons[i]}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Meeting Timeline */}
          <motion.div
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <h2 className="text-white font-bold text-xl text-center mb-6">
              {t('club.formatTitle')}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {timeline.map((item, i) => (
                <div key={i} className="flex items-center">
                  <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 flex items-center gap-3">
                    <span className="text-coffee font-mono text-xs font-bold">{item.time}</span>
                    <span className="text-coffee/60">{timelineIcons[i]}</span>
                    <span className="text-slate-300 text-sm font-medium">{item.label}</span>
                  </div>
                  {i < timeline.length - 1 && (
                    <ChevronRight size={16} className="text-slate-600 mx-1 flex-shrink-0 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="bg-gradient-to-br from-coffee/15 to-coffee/5 border border-coffee/30 rounded-2xl p-8 text-center max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Calendar size={20} className="text-coffee" />
              <span className="text-white font-bold text-lg">
                {t('club.nextMeetup')} {t('club.nextDate')}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-5">
              {t('club.spots')}
            </p>
            <a
              href={`/${lang || 'en'}#contact`}
              className="inline-flex items-center gap-2 bg-coffee hover:bg-coffee/80 text-white px-8 py-3.5 rounded-2xl font-bold transition-colors"
            >
              {t('club.cta')} <ArrowRight size={18} />
            </a>
            <p className="text-slate-500 text-xs mt-4">
              {t('club.location')}
            </p>
          </motion.div>
        </div>
      </section>

      <Footer onShowPrivacy={() => {}} />
    </div>
  )
}

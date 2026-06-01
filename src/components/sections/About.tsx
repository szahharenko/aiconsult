import { motion } from 'framer-motion'
import { TrendingUp, Sparkles, Linkedin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { YOUR_FULL_NAME, LINKEDIN_URL } from '../../config'
import { Section } from '../ui/Section'
import { PhotoPlaceholder } from '../ui/PhotoPlaceholder'
import { YouTubeEmbed } from '../ui/YouTubeEmbed'

const FOUNDER_VIDEO_ID = 'cHAIl8ZgLhA'

interface Stat {
  value: string
  label: string
}

export function About() {
  const { t, i18n } = useTranslation()
  const items = t('about.items', { returnObjects: true }) as string[]
  const cardItems = t('about.cardItems', { returnObjects: true }) as string[]
  const stats = t('about.stats', { returnObjects: true }) as Stat[]
  const showFounderVideo = i18n.language?.startsWith('ru')

  return (
    <Section id="about">
      <h2 className="text-3xl font-bold text-white mb-5">{t('about.title')}</h2>
      <motion.div className="grid md:grid-cols-2 gap-10 items-start" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <motion.div variants={fadeUp}>
          <div className="flex items-center gap-4 mb-5 bg-slate-900 border border-slate-700 rounded-2xl p-4">
            <PhotoPlaceholder />
            <div>
              <p className="text-white font-bold text-lg">{YOUR_FULL_NAME}</p>
              <p className="text-coffee text-sm font-medium">{t('about.role')}</p>
              <p className="text-slate-400 text-sm mt-1">Tallinn, Estonia</p>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-coffee transition-colors"
              >
                <Linkedin size={15} />{t('about.linkedin')}
              </a>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed mb-5">{t('about.intro')}</p>

          {/* Credibility stats - swap the placeholder values for real numbers */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {stats.map(stat => (
              <div key={stat.label} className="bg-slate-900 border border-slate-700 rounded-2xl p-4 text-center">
                <p className="text-coffee font-bold text-2xl leading-none">{stat.value}</p>
                <p className="text-slate-400 text-xs mt-2 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>

          <ul className="space-y-3">
            {items.map(item => (
              <li key={item} className="flex items-start gap-3 text-slate-300">
                <TrendingUp size={17} className="text-sage-green flex-shrink-0 mt-0.5" />{item}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-7 text-slate-300 leading-relaxed">
          <h3 className="text-white font-bold text-lg mb-4">{t('about.cardTitle')}</h3>
          <ul className="space-y-3">
            {cardItems.map(item => (
              <li key={item} className="flex items-start gap-3">
                <Sparkles size={17} className="text-coffee flex-shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
      {showFounderVideo && (
        <motion.div
          className="mt-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-coffee/80 text-xs font-semibold uppercase tracking-widest mb-3 text-center">
            {t('about.video.kicker')}
          </p>
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            {t('about.video.title')}
          </h3>
          <YouTubeEmbed videoId={FOUNDER_VIDEO_ID} title={t('about.video.title')} />
          <p className="text-slate-400 text-sm mt-4 text-center max-w-xl mx-auto">
            {t('about.video.caption')}
          </p>
        </motion.div>
      )}
    </Section>
  )
}

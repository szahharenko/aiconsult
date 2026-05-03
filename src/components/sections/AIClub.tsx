import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { fadeUp } from '../../animations'
import { Section } from '../ui/Section'

export function AIClub() {
  const { t } = useTranslation()
  const { lang } = useParams<{ lang: string }>()

  return (
    <Section id="club">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="bg-gradient-to-br from-coffee/15 to-coffee/5 border border-coffee/30 rounded-2xl p-8 md:p-10 max-w-3xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Left: icon + text */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-coffee/20 border border-coffee/30 flex items-center justify-center">
                <Users size={20} className="text-coffee" />
              </div>
              <h2 className="text-white font-bold text-xl">{t('club.title')}</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              {t('club.sub')}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={14} className="text-coffee" />
              <span className="text-slate-300">
                {t('club.nextMeetup')} <span className="text-white font-semibold">{t('club.nextDate')}</span>
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1">{t('club.location')}</p>
          </div>

          {/* Right: CTA */}
          <div className="flex flex-col gap-2 md:items-end shrink-0">
            <a
              href={`/${lang || 'en'}/club`}
              className="inline-flex items-center gap-2 bg-coffee hover:bg-coffee/80 text-white px-6 py-3 rounded-2xl font-bold transition-colors text-sm"
            >
              {t('club.learnMore')} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}

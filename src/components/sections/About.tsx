import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { YOUR_NAME } from '../../config'
import { Section } from '../ui/Section'
import { PhotoPlaceholder } from '../ui/PhotoPlaceholder'

export function About() {
  const { t } = useTranslation()
  const items = t('about.items', { returnObjects: true }) as string[]

  return (
    <Section id="about">
      <motion.div className="grid md:grid-cols-2 gap-10 items-start" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <motion.div variants={fadeUp}>
          <h2 className="text-3xl font-bold text-white mb-5">{t('about.title')}</h2>
          <div className="flex items-center gap-4 mb-6 bg-slate-900 border border-slate-700 rounded-2xl p-4">
            <PhotoPlaceholder />
            <div>
              <p className="text-white font-bold text-lg">{YOUR_NAME}</p>
              <p className="text-coffee text-sm font-medium">{t('about.role')}</p>
              <p className="text-slate-400 text-sm mt-1">Tallinn, Estonia</p>
            </div>
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
          {t('about.card')}
        </motion.div>
      </motion.div>
    </Section>
  )
}

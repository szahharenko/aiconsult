import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeUp } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

export function EconomicShift() {
  const { t } = useTranslation()
  const resources = t('eco.resources', { returnObjects: true }) as string[]

  return (
    <Section dark id="economic-shift">
      <SectionHeader title={t('eco.title')} />
      <motion.div className="max-w-2xl mx-auto space-y-4 text-slate-300 text-lg leading-relaxed" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <p>{t('eco.p1')}<strong className="text-white">{t('eco.strong')}</strong></p>
        <p>{t('eco.p2')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          {resources.map(r => (
            <div key={r} className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-center text-sm font-medium text-slate-200">{r}</div>
          ))}
        </div>
        <p>{t('eco.p3a')}<strong className="text-white">{t('eco.p3b')}</strong>{t('eco.p3c')}</p>
      </motion.div>
    </Section>
  )
}

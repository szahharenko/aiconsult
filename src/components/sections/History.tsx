import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeUp } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

export function History() {
  const { t } = useTranslation()

  return (
    <Section id="history">
      <SectionHeader title={t('history.title')} />
      <motion.div className="max-w-2xl mx-auto text-slate-300 text-lg leading-relaxed space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <p>{t('history.p1a')}<strong className="text-white">{t('history.p1b')}</strong></p>
        <p>{t('history.p2a')}<strong className="text-white">{t('history.p2b')}</strong></p>
        <p className="text-slate-400">{t('history.p3')}</p>
      </motion.div>
    </Section>
  )
}

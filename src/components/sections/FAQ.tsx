import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

export function FAQ() {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true }) as { q: string; a: string }[]

  return (
    <Section dark id="faq">
      <SectionHeader title={t('faq.title')} />
      <motion.div className="space-y-3 max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {items.map(item => (
          <motion.div key={item.q} variants={fadeUp} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-1.5">{item.q}</h3>
            <p className="text-slate-400 text-sm">{item.a}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

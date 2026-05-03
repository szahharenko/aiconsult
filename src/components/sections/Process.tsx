import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

export function Process() {
  const { t } = useTranslation()
  const steps = t('process.steps', { returnObjects: true }) as { step: string; title: string; desc: string }[]

  return (
    <Section dark id="process">
      <SectionHeader title={t('process.title')} />
      <motion.div className="grid md:grid-cols-4 gap-5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {steps.map(item => (
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
  )
}

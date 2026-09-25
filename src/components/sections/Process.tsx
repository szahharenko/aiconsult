import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

export function Process() {
  const { t } = useTranslation()
  const steps = t('process.steps', { returnObjects: true }) as { step: string; title: string; desc: string }[]

  return (
    <Section id="process">
      <SectionHeader title={t('process.title')} />
      <motion.ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 list-none p-0 m-0" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {steps.map(item => (
          <motion.li key={item.step} variants={fadeUp} className="border-t-[1.5px] border-ink pt-6 flex flex-col gap-3">
            <span className="font-serif italic text-3xl text-coffee">{item.step}</span>
            <h3 className="font-bold text-xl">{item.title}</h3>
            <p className="text-slate-400 text-[15px] leading-relaxed">{item.desc}</p>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  )
}

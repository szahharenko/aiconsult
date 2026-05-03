import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeUp } from '../../animations'
import { Section } from '../ui/Section'

export function CoreIdea() {
  const { t } = useTranslation()
  const items = t('core.items', { returnObjects: true }) as string[]

  return (
    <Section id="core-idea">
      <motion.div className="max-w-2xl mx-auto text-center space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-3xl font-bold text-white">{t('core.title')}</h2>
        <p className="text-slate-300 text-lg">{t('core.p1')}</p>
        <div className="grid grid-cols-2 gap-3">
          {items.map(i => (
            <div key={i} className="bg-slate-900 border border-coffee/30 rounded-xl px-4 py-3 text-coffee font-semibold text-sm">{i}</div>
          ))}
        </div>
        <p className="text-slate-400">{t('core.p2')}</p>
      </motion.div>
    </Section>
  )
}

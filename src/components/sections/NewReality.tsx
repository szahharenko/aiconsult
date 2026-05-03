import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

export function NewReality() {
  const { t } = useTranslation()
  const list = t('reality.list', { returnObjects: true }) as string[]

  return (
    <Section id="new-reality">
      <SectionHeader title={t('reality.title')} />
      <motion.div className="grid md:grid-cols-2 gap-6 items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <motion.div variants={fadeUp} className="text-slate-300 text-lg leading-relaxed space-y-3">
          <p>{t('reality.listLabel')}</p>
          <ul className="space-y-1.5">
            {list.map(i => (
              <li key={i} className="flex items-center gap-2"><Zap size={14} className="text-coffee flex-shrink-0" />{i}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-slate-300 text-lg leading-relaxed space-y-3">
          <p>{t('reality.cardP1')}</p>
          <p className="text-white font-semibold whitespace-pre-line">{t('reality.cardP2')}</p>
        </motion.div>
      </motion.div>
    </Section>
  )
}

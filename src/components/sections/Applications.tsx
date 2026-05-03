import { motion } from 'framer-motion'
import { Zap, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

export function Applications() {
  const { t } = useTranslation()
  const autoItems = t('applications.autoItems', { returnObjects: true }) as string[]
  const resultList = t('applications.resultItems', { returnObjects: true }) as string[]

  return (
    <Section id="applications">
      <SectionHeader title={t('applications.title')} sub={t('applications.sub')} />
      <motion.div className="grid md:grid-cols-2 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <h3 className="font-bold text-white mb-4">{t('applications.autoTitle')}</h3>
          <div className="flex flex-wrap gap-2">
            {autoItems.map(i => (
              <span key={i} className="bg-slate-800 text-slate-300 text-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Zap size={12} className="text-coffee" />{i}
              </span>
            ))}
          </div>
        </motion.div>
        <motion.div variants={fadeUp} className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <h3 className="font-bold text-white mb-4">{t('applications.resultsTitle')}</h3>
          <ul className="space-y-3">
            {resultList.map(r => (
              <li key={r} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 size={16} className="text-sage-green flex-shrink-0" />{r}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </Section>
  )
}

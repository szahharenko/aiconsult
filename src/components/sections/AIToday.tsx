import { motion } from 'framer-motion'
import { BarChart3, Workflow, FileText, Mail, Bot } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

const icons = [
  <BarChart3 size={18} className="text-blue-400" />,
  <Workflow size={18} className="text-sage-green" />,
  <FileText size={18} className="text-coffee" />,
  <Mail size={18} className="text-purple-400" />,
  <BarChart3 size={18} className="text-yellow-400" />,
  <Bot size={18} className="text-cyan-400" />,
]

export function AIToday() {
  const { t } = useTranslation()
  const cards = t('today.cards', { returnObjects: true }) as string[]

  return (
    <Section dark id="ai-today">
      <SectionHeader title={t('today.title')} />
      <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {icons.map((icon, i) => (
          <motion.div key={i} variants={fadeUp} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-3 text-slate-300">
            {icon}<span>{cards[i]}</span>
          </motion.div>
        ))}
      </motion.div>
      <motion.p className="text-center text-slate-400 mt-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        {t('today.note')}
      </motion.p>
    </Section>
  )
}

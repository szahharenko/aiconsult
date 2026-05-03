import { motion } from 'framer-motion'
import { Building2, DollarSign, Bot } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

export function Competition() {
  const { t } = useTranslation()

  return (
    <Section dark id="competition">
      <SectionHeader title={t('competition.title')} />
      <motion.div className="grid md:grid-cols-2 gap-6 mb-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <motion.div variants={fadeUp} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3"><Building2 size={18} className="text-slate-400" /><span className="font-bold text-white">{t('competition.companyA')}</span></div>
          <div className="flex items-center gap-2"><DollarSign size={16} className="text-red-400" /><span className="text-slate-300">{t('competition.payroll')} <strong className="text-red-400">{t('competition.payrollA')}</strong></span></div>
        </motion.div>
        <motion.div variants={fadeUp} className="bg-sage-green/10 border border-sage-green/40 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3"><Bot size={18} className="text-sage-green" /><span className="font-bold text-white">{t('competition.companyB')}</span></div>
          <div className="flex items-center gap-2 mb-1"><DollarSign size={16} className="text-sage-green" /><span className="text-slate-300">{t('competition.payroll')} <strong className="text-sage-green">{t('competition.payrollB')}</strong></span></div>
          <p className="text-slate-400 text-sm">{t('competition.companyBNote')}</p>
        </motion.div>
      </motion.div>
      <motion.p className="text-center text-slate-300 text-lg" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <strong className="text-white">{t('competition.question')}</strong><br />
        <span className="text-slate-400 text-base">{t('competition.note')}</span>
      </motion.p>
    </Section>
  )
}

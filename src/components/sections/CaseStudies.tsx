import { motion } from 'framer-motion'
import { Clock, Zap, Euro, Bot, Users, TrendingUp, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

// Hardcoded metric icons per case (3 cases x 3 metrics)
const metricIcons = [
  // Case 0: e-commerce
  [<Clock size={16} className="text-coffee" />, <Zap size={16} className="text-sage-green" />, <Euro size={16} className="text-blue-400" />],
  // Case 1: accounting
  [<Clock size={16} className="text-coffee" />, <Users size={16} className="text-sage-green" />, <TrendingUp size={16} className="text-blue-400" />],
  // Case 2: manufacturing
  [<Bot size={16} className="text-coffee" />, <TrendingUp size={16} className="text-sage-green" />, <Clock size={16} className="text-blue-400" />],
]

interface CaseData {
  badge: string
  title: string
  problem: string
  solution: string
  metrics: { value: string; label: string }[]
}

export function CaseStudies() {
  const { t } = useTranslation()
  const cases = t('cases.items', { returnObjects: true }) as CaseData[]

  return (
    <Section id="cases">
      <SectionHeader
        title={t('cases.title')}
        sub={t('cases.sub')}
      />
      <motion.div className="grid md:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {cases.map((c, i) => (
          <motion.div key={i} variants={fadeUp}
            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col hover:border-slate-500 transition-colors">
            <span className="self-start bg-slate-800 border border-slate-600 text-slate-300 text-xs font-medium px-3 py-1 rounded-full mb-4">
              {c.badge}
            </span>
            <h3 className="text-white font-bold text-lg mb-3">{c.title}</h3>

            {/* Problem */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                {t('cases.problem')}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">{c.problem}</p>
            </div>

            {/* Solution */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                {t('cases.solution')}
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">{c.solution}</p>
            </div>

            {/* Metrics */}
            <div className="mt-auto border-t border-slate-700 pt-4 grid grid-cols-3 gap-2">
              {c.metrics.map((m, j) => (
                <div key={j} className="text-center">
                  <div className="flex justify-center mb-1">{metricIcons[i]?.[j]}</div>
                  <p className="text-white font-bold text-sm">{m.value}</p>
                  <p className="text-slate-500 text-xs leading-tight">{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA under cases */}
      <motion.div className="mt-8 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <p className="text-slate-400 text-sm mb-3">
          {t('cases.allAnonymized')}
        </p>
        <a href="#contact"
          className="inline-flex items-center gap-2 text-coffee hover:text-coffee/80 font-semibold text-sm transition-colors">
          {t('cases.getSimilar')} <ChevronRight size={16} />
        </a>
      </motion.div>
    </Section>
  )
}

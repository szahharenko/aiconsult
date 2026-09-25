import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

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
      <SectionHeader title={t('cases.title')} sub={t('cases.sub')} />
      <motion.div className="grid md:grid-cols-3 gap-10 md:gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {cases.map((c, i) => (
          <motion.article key={i} variants={fadeUp} className="border-t-[1.5px] border-ink pt-6 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.06em] text-muted">{c.badge}</span>
            <h3 className="text-2xl font-bold tracking-tight">{c.title}</h3>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-[0.06em] text-slate-500">{t('cases.problem')}</span>
              <p className="text-[15px] leading-relaxed text-slate-400">{c.problem}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-[0.06em] text-slate-500">{t('cases.solution')}</span>
              <p className="text-[15px] leading-relaxed text-slate-300">{c.solution}</p>
            </div>
            <div className="mt-auto pt-4 grid grid-cols-3 gap-3 border-t border-line">
              {c.metrics.map((m, j) => (
                <div key={j} className="flex flex-col gap-1">
                  <span className="font-serif text-2xl md:text-[28px] leading-tight">{m.value}</span>
                  <span className="text-xs leading-snug text-muted">{m.label}</span>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
      <motion.div className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <a href="#contact" className="inline-flex items-center gap-2 text-coffee hover:text-ink font-semibold transition-colors">
          {t('cases.getSimilar')} <ArrowRight size={16} />
        </a>
      </motion.div>
    </Section>
  )
}

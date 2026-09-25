import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'

interface FundingGrant {
  title: string
  amount: string
  timing: string
  urgency?: string
  fit: string
  url: string
}

export function AIFunding() {
  const { t } = useTranslation()
  const grants = t('funding.grants', { returnObjects: true }) as FundingGrant[]
  const parts = t('funding.title').split(/\*([^*]+)\*/)

  return (
    <Section tone="sand" id="funding">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-6">
        <motion.div className="lg:col-span-5 flex flex-col gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.08em] text-coffee">EIS · 2026</p>
          <h2 className="font-serif font-normal text-4xl md:text-6xl leading-[1.04]">
            {parts.map((p, i) => (i % 2 ? <span key={i} className="italic text-coffee">{p}</span> : <span key={i}>{p}</span>))}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-slate-300">{t('funding.sub')}</p>
          <div className="mt-2 flex flex-col gap-3 border-t border-line-strong pt-6">
            <h3 className="font-bold text-lg">{t('funding.help.title')}</h3>
            <p className="text-[15px] leading-relaxed text-slate-300">{t('funding.help.body')}</p>
            <a href="#contact" className="self-start mt-1 bg-ink text-paper hover:bg-ink/85 rounded-full px-6 py-3.5 text-[15px] font-semibold inline-flex items-center gap-2 transition-colors">
              {t('funding.help.cta')} <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>

        <motion.div className="lg:col-start-7 lg:col-span-6 flex flex-col" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {grants.map((g, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`py-6 flex flex-col gap-2.5 ${i === 0 ? 'border-t-[1.5px] border-ink' : 'border-t border-line-strong'} ${i === grants.length - 1 ? 'border-b border-line-strong' : ''}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-lg md:text-xl font-bold">{g.title}</h3>
                <span className="font-serif text-2xl md:text-3xl whitespace-nowrap">{g.amount}</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.06em] text-coffee">{g.urgency || g.timing}</p>
              <p className="text-[15px] leading-relaxed text-slate-300">{g.fit}</p>
              <a href={g.url} target="_blank" rel="noopener noreferrer" className="self-start text-sm font-semibold text-slate-400 hover:text-coffee inline-flex items-center gap-1.5 transition-colors">
                {t('funding.linkLabel')} <ExternalLink size={13} />
              </a>
            </motion.div>
          ))}
          <p className="text-xs text-muted mt-5 leading-relaxed">{t('funding.disclaimer')}</p>
        </motion.div>
      </div>
    </Section>
  )
}

import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { EISLogo } from '../ui/EISLogo'

interface FundingGrant {
  title: string
  amount: string
  timing: string
  fit: string
  url: string
}

export function AIFunding() {
  const { t } = useTranslation()
  const grants = t('funding.grants', { returnObjects: true }) as FundingGrant[]

  return (
    <Section dark id="funding">
      <SectionHeader title={t('funding.title')} sub={t('funding.sub')} />

      <motion.div
        className="grid md:grid-cols-2 gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        {grants.map((grant, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="rounded-2xl p-6 border bg-slate-800 border-slate-700 flex flex-col"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-lg font-bold text-white leading-snug">{grant.title}</h3>
              <EISLogo className="h-7 w-auto text-slate-300 flex-shrink-0" />
            </div>
            <div className="text-2xl font-extrabold text-coffee font-mono mb-2">{grant.amount}</div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wide mb-3">
              {grant.timing}
            </div>
            <p className="text-slate-300 text-sm mb-5 flex-1">{grant.fit}</p>
            <a
              href={grant.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-300 hover:text-coffee transition-colors inline-flex items-center gap-1.5 self-start"
            >
              {t('funding.linkLabel')} <ExternalLink size={13} />
            </a>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mt-8 rounded-2xl p-6 border border-olive/40 bg-olive/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div className="flex-1">
          <h3 className="font-bold mb-1.5">{t('funding.help.title')}</h3>
          <p className="text-slate-300 text-sm">{t('funding.help.body')}</p>
        </div>
        <a
          href="#contact"
          className="bg-coffee hover:bg-coffee/80 text-white text-sm font-semibold px-5 py-3 rounded-xl inline-flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {t('funding.help.cta')} <ArrowRight size={14} />
        </a>
      </motion.div>

      <p className="text-xs text-slate-500 mt-6 text-center font-mono">
        {t('funding.disclaimer')}
      </p>
    </Section>
  )
}

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

interface ServiceLine {
  title: string
  priceNote: string
  items: string[]
  cta: string
  result?: string
  highlight?: boolean
}

export function Services() {
  const { t } = useTranslation()
  const lines = t('services.lines', { returnObjects: true }) as ServiceLine[]

  return (
    <Section id="services">
      <SectionHeader title={t('services.title')} sub={t('services.grantNote')} />
      <motion.div className="grid md:grid-cols-3 gap-5 md:gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {lines.map((line, i) => {
          const hi = !!line.highlight
          return (
            <motion.article
              key={i}
              variants={fadeUp}
              className={`rounded-3xl p-7 md:p-9 flex flex-col gap-5 ${hi ? 'bg-ink ink-scope text-paper' : 'bg-card border border-line'}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`font-serif italic text-xl ${hi ? 'text-mint' : 'text-coffee'}`}>{String(i + 1).padStart(2, '0')}</span>
                {hi && <span className="text-xs font-bold bg-mint text-ink px-2.5 py-1 rounded-full">{t('services.popular')}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <span className={`text-xs font-bold uppercase tracking-[0.08em] ${hi ? 'text-slate-400' : 'text-muted'}`}>{line.priceNote}</span>
                <h3 className="text-2xl font-bold tracking-tight leading-snug">{line.title}</h3>
              </div>
              <ul className="flex flex-col gap-2.5 flex-1">
                {line.items.map(item => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
                    <span className={`mt-[11px] h-px w-3 shrink-0 ${hi ? 'bg-mint' : 'bg-coffee'}`} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {line.result && <p className={`text-sm font-semibold ${hi ? 'text-slate-400' : 'text-muted'}`}>{line.result}</p>}
              <a
                href="#contact"
                className={`rounded-full py-3.5 px-5 text-[15px] font-semibold inline-flex items-center justify-center gap-2 transition-colors ${
                  hi ? 'bg-mint text-ink hover:bg-paper' : 'border-[1.5px] border-ink text-ink hover:bg-ink hover:text-paper'
                }`}
              >
                {line.cta} <ArrowRight size={15} />
              </a>
            </motion.article>
          )
        })}
      </motion.div>
    </Section>
  )
}

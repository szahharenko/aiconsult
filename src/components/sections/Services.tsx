import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

interface ServiceLine {
  title: string
  price: string
  priceNote: string
  items: string[]
  cta: string
  highlight?: boolean
}

// Every service leads to the free consultation funnel.
const lineHrefs = ['#contact', '#contact', '#contact']

export function Services() {
  const { t } = useTranslation()
  const lines = t('services.lines', { returnObjects: true }) as ServiceLine[]

  return (
    <Section dark id="services">
      <SectionHeader title={t('services.title')} sub={t('services.sub')} />
      <motion.div
        className="grid md:grid-cols-3 gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        {lines.map((line, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className={`rounded-2xl p-6 border flex flex-col ${
              line.highlight
                ? 'bg-coffee/10 border-coffee'
                : 'bg-slate-800 border-slate-700'
            }`}
          >
            {line.highlight && (
              <span className="self-start bg-coffee text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                {t('services.popular')}
              </span>
            )}
            <h3 className="text-lg font-bold mb-1 mt-1">{line.title}</h3>
            <div className="mt-2 mb-1">
              <p className="text-slate-400 text-xs mt-1">{line.priceNote}</p>
            </div>
            <ul className="space-y-2 mb-6 mt-4 flex-1 border-t border-slate-700/60 pt-4">
              {line.items.map(item => (
                <li key={item} className="flex items-start gap-2 text-slate-300 text-sm">
                  <CheckCircle2 size={14} className="text-sage-green flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={lineHrefs[i]}
              className={`text-center py-3 rounded-xl font-semibold transition-colors text-sm inline-flex items-center justify-center gap-2 ${
                line.highlight
                  ? 'bg-coffee hover:bg-coffee/80 text-white'
                  : 'border border-slate-600 hover:border-coffee/60 text-slate-300 hover:text-coffee'
              }`}
            >
              {line.cta} <ArrowRight size={14} />
            </a>
          </motion.div>
        ))}
      </motion.div>
      <p className="text-center text-slate-400 text-sm mt-6 max-w-2xl mx-auto">{t('services.grantNote')}</p>
    </Section>
  )
}

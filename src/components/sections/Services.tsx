import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

interface ServicePackage {
  title: string
  price: string
  items: string[]
  highlight: boolean
  isClub?: boolean
}

export function Services() {
  const { t } = useTranslation()
  const packages = t('services.packages', { returnObjects: true }) as ServicePackage[]

  return (
    <Section dark id="services">
      <SectionHeader title={t('services.title')} sub={t('services.sub')} />
      <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {packages.map(pkg => (
          <motion.div key={pkg.title} variants={fadeUp} className={`rounded-2xl p-6 border flex flex-col ${pkg.highlight ? 'bg-coffee/10 border-coffee' : pkg.isClub ? 'bg-slate-800 border-coffee/30' : 'bg-slate-800 border-slate-700'}`}>
            {pkg.highlight && <span className="self-start bg-coffee text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">{t('services.popular')}</span>}
            {pkg.isClub && <span className="self-start bg-sage-green/20 text-sage-green text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">{t('services.startHere')}</span>}
            <h3 className="text-lg font-bold text-white mb-1">{pkg.title}</h3>
            <div className="text-xl font-extrabold text-coffee my-3">{pkg.price}</div>
            <ul className="space-y-2 mb-6 flex-1">
              {pkg.items.map(i => (
                <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                  <CheckCircle2 size={14} className="text-sage-green flex-shrink-0" />{i}
                </li>
              ))}
            </ul>
            <a href={pkg.isClub ? '#club' : '#contact'} className={`text-center py-3 rounded-xl font-semibold transition-colors text-sm ${pkg.highlight ? 'bg-coffee hover:bg-coffee/80 text-white' : 'border border-slate-600 hover:border-slate-400 text-slate-300'}`}>
              {pkg.isClub ? t('services.learnMore') : t('services.getStarted')}
            </a>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

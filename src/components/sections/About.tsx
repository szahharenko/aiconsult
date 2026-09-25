import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { YOUR_FULL_NAME, LINKEDIN_URL } from '../../config'
import { Section } from '../ui/Section'
import sergeiPhoto from '../../assets/sergei.png'

interface Stat {
  value: string
  label: string
}

export function About() {
  const { t } = useTranslation()
  const items = t('about.items', { returnObjects: true }) as string[]
  const cardItems = t('about.cardItems', { returnObjects: true }) as string[]
  const stats = t('about.stats', { returnObjects: true }) as Stat[]

  return (
    <Section id="about">
      <motion.div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <motion.img
          variants={fadeUp}
          src={sergeiPhoto}
          alt={YOUR_FULL_NAME}
          className="lg:col-span-5 w-full aspect-square object-cover rounded-[28px]"
        />
        <motion.div variants={fadeUp} className="lg:col-start-7 lg:col-span-6 flex flex-col gap-6">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.08em] text-coffee">{t('about.title')}</p>
          <div>
            <h2 className="font-serif font-normal text-4xl md:text-[56px] leading-[1.05]">{YOUR_FULL_NAME}</h2>
            <p className="mt-2 text-base md:text-lg text-coffee font-medium">{t('about.role')}</p>
          </div>
          <p className="text-base md:text-lg leading-relaxed text-slate-300">{t('about.intro')}</p>
          <div className="grid grid-cols-3 gap-4 pt-1">
            {stats.map(stat => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-serif text-4xl md:text-5xl leading-none">{stat.value}</span>
                <span className="text-sm text-muted leading-snug">{stat.label}</span>
              </div>
            ))}
          </div>
          <ul className="flex flex-col gap-2.5 border-t border-line pt-5">
            {items.map(item => (
              <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
                <span className="mt-[11px] h-px w-3 shrink-0 bg-coffee" aria-hidden="true" />{item}
              </li>
            ))}
          </ul>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="self-start inline-flex items-center gap-2 font-semibold text-coffee hover:text-ink transition-colors">
            {t('about.linkedin')} <ArrowRight size={16} />
          </a>
        </motion.div>
      </motion.div>

      <motion.div className="mt-16 md:mt-20 bg-sand rounded-3xl p-8 md:p-12 grid lg:grid-cols-12 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h3 className="lg:col-span-4 font-serif font-normal text-3xl md:text-4xl leading-tight">{t('about.cardTitle')}</h3>
        <ul className="lg:col-start-6 lg:col-span-7 flex flex-col gap-3">
          {cardItems.map(item => (
            <li key={item} className="flex gap-3 text-base md:text-lg leading-relaxed text-slate-300">
              <span className="mt-[13px] h-px w-4 shrink-0 bg-coffee" aria-hidden="true" />{item}
            </li>
          ))}
        </ul>
      </motion.div>
    </Section>
  )
}

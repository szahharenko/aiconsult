import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { BRAND_NAME } from '../../config'

export function Hero() {
  const { t } = useTranslation()
  const tags = t('hero.tags', { returnObjects: true }) as string[]

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-charcoal/30 pointer-events-none" />
      <motion.div className="relative max-w-4xl mx-auto text-center" initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="bg-coffee/15 border border-coffee/30 text-coffee text-xs font-semibold px-3 py-1 rounded-full">
            {t('hero.location')}
          </span>
          {tags.map(tag => (
            <span key={tag} className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
          ))}
        </motion.div>
        <motion.p variants={fadeUp} className="text-coffee/80 text-sm font-semibold uppercase tracking-widest mb-4">{t('brandTagline')}</motion.p>
        <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold leading-tight mb-5 text-white">
          {t('hero.h1a')}{' '}<span className="text-coffee">{t('hero.h1b')}</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-lg text-slate-300 mb-9 max-w-2xl mx-auto">{t('hero.p')}</motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#contact" className="bg-coffee hover:bg-coffee/80 text-white px-7 py-3.5 rounded-2xl font-bold transition-colors inline-flex items-center gap-2 justify-center">
            {t('hero.cta')} <ArrowRight size={18} />
          </a>
          <a href="#club" className="border border-coffee/50 hover:border-coffee text-coffee hover:bg-coffee/10 px-7 py-3.5 rounded-2xl font-semibold transition-colors inline-flex items-center gap-2 justify-center">
            <Calendar size={18} /> {t('hero.club')}
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

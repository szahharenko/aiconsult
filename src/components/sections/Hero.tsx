import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import forstaLogo from '../../assets/logos/forsta.webp'
import heLogo from '../../assets/logos/he.png'
import imetLogo from '../../assets/logos/imet.png'
import rtkLogo from '../../assets/logos/rtk.png'

const clientLogos = [
  { src: rtkLogo, name: 'Riigi Tugiteenuste Keskus' },
  { src: forstaLogo, name: 'Forsta' },
  { src: imetLogo, name: 'Industrial Metal' },
  { src: heLogo, name: 'Highway Engineering' },
]

function GrantCard() {
  const { t } = useTranslation()
  return (
    <div className="bg-card border border-line rounded-3xl p-7 md:p-8 flex flex-col gap-5 shadow-[0_30px_60px_-30px_rgba(11,27,43,0.28)]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-muted">{t('hero.calc.label')}</span>
        <span className="text-xs font-semibold text-coffee bg-[#E1F2F4] px-2.5 py-1 rounded-full">{t('hero.calc.badge')}</span>
      </div>
      <div className="flex flex-col gap-3.5 text-[15px] md:text-base">
        <div className="flex justify-between gap-4"><span className="text-slate-400">{t('hero.calc.project')}</span><span className="font-semibold whitespace-nowrap">{t('hero.calc.projectAmount')}</span></div>
        <div className="flex justify-between gap-4"><span className="text-slate-400">{t('hero.calc.grant')}</span><span className="font-semibold text-coffee whitespace-nowrap">{t('hero.calc.grantAmount')}</span></div>
        <div className="h-3 rounded-full bg-sand flex overflow-hidden" aria-hidden="true">
          <div className="w-[70%] bg-teal-bright" />
          <div className="w-[30%] bg-ink" />
        </div>
      </div>
      <div className="border-t border-dashed border-line-strong pt-4 flex flex-col gap-1">
        <span className="text-sm text-slate-400">{t('hero.calc.pay')}</span>
        <span className="font-serif text-5xl md:text-6xl leading-none font-semibold">{t('hero.calc.payAmount')}</span>
      </div>
      <a href="#grant-check" className="text-[15px] font-semibold text-coffee hover:text-ink inline-flex items-center gap-2 transition-colors">
        {t('hero.calc.check')} <ArrowRight size={16} />
      </a>
    </div>
  )
}

export function Hero() {
  const { t } = useTranslation()

  return (
    <>
      <section className="px-5 md:px-10 pt-14 pb-16 md:pt-24 md:pb-24">
        <motion.div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-6 items-start" initial="hidden" animate="visible" variants={stagger}>
          <div className="lg:col-span-7 flex flex-col gap-7 md:gap-8">
            <motion.p variants={fadeUp} className="flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.08em] text-coffee">
              <span className="w-8 h-0.5 bg-teal-bright" aria-hidden="true" />{t('hero.eyebrow')}
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif font-normal text-5xl sm:text-6xl lg:text-[84px] leading-[0.98] tracking-[-0.02em] text-ink">
              {t('hero.h1a')}{' '}<span className="italic text-coffee">{t('hero.h1b')}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl leading-relaxed text-slate-300 max-w-xl">{t('hero.p')}</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <a href="#contact" className="bg-coffee hover:bg-[#005868] text-white px-7 py-4 rounded-full font-bold text-base md:text-[17px] sm:whitespace-nowrap inline-flex items-center justify-center gap-2.5 transition-colors">
                {t('hero.cta')} <ArrowRight size={18} />
              </a>
              <a href="#grant-check" className="border-[1.5px] border-ink text-ink hover:bg-ink hover:text-paper px-7 py-4 rounded-full font-semibold text-base md:text-[17px] sm:whitespace-nowrap inline-flex items-center justify-center transition-colors">
                {t('hero.grantCta')}
              </a>
            </motion.div>
            <motion.p variants={fadeUp} className="flex items-center gap-2.5 text-sm text-muted">
              <Check size={16} className="text-coffee shrink-0" />{t('hero.trust')}
            </motion.p>
          </div>
          <motion.div variants={fadeUp} className="lg:col-start-9 lg:col-span-4 lg:mt-3">
            <GrantCard />
          </motion.div>
        </motion.div>
      </section>

      <section className="px-5 md:px-10 border-y border-line">
        <div className="max-w-6xl mx-auto py-6 flex flex-wrap items-center justify-between gap-x-10 gap-y-5">
          <span className="text-sm font-medium text-muted">{t('hero.worked')}</span>
          {clientLogos.map(l => (
            <img key={l.name} src={l.src} alt={l.name} className="h-9 md:h-11 w-auto max-w-[150px] object-contain grayscale opacity-75 mix-blend-multiply" />
          ))}
        </div>
      </section>
    </>
  )
}

interface ResultItem { value: string; accent?: string; label: string }

export function ResultsStrip() {
  const { t } = useTranslation()
  const items = t('results', { returnObjects: true }) as ResultItem[]
  return (
    <section className="px-5 md:px-10 py-16 md:py-24">
      <motion.div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {items.map((it, i) => (
          <motion.div key={i} variants={fadeUp} className={`flex flex-col gap-2.5 lg:pr-4 ${i < items.length - 1 ? 'lg:border-r border-line' : ''}`}>
            <span className="font-serif text-4xl md:text-5xl leading-none">
              {it.value}{it.accent && <> <span className="italic text-coffee whitespace-nowrap">{it.accent}</span></>}
            </span>
            <span className="text-sm md:text-[15px] text-slate-400 leading-relaxed">{it.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export function KrattStory() {
  const { t } = useTranslation()
  return (
    <section className="px-5 md:px-10">
      <motion.div
        className="max-w-6xl mx-auto bg-ink ink-scope text-paper rounded-[28px] md:rounded-[32px] p-8 md:p-16 lg:p-20 grid lg:grid-cols-12 gap-8 lg:gap-6 items-center"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      >
        <div className="lg:col-span-5 flex flex-col gap-4">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.08em] text-mint">{t('kratt.kicker')}</p>
          <h2 className="font-serif font-normal text-4xl md:text-[56px] leading-[1.05]">
            {t('kratt.title')} <span className="italic text-mint">{t('kratt.accent')}</span>
          </h2>
        </div>
        <div className="lg:col-start-7 lg:col-span-6 flex flex-col gap-5 text-base md:text-lg leading-relaxed text-slate-300">
          <p>{t('kratt.p1')}</p>
          <p className="text-paper">{t('kratt.p2')}</p>
        </div>
      </motion.div>
    </section>
  )
}

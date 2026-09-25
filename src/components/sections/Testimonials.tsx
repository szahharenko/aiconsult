import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import forstaLogo from '../../assets/logos/forsta.webp'
import heLogo from '../../assets/logos/he.png'
import imetLogo from '../../assets/logos/imet.png'
import rtkLogo from '../../assets/logos/rtk.png'

interface TestimonialContent {
  quote: string
  name: string
  role: string
}

// Logos are matched by index so each quote shows the company it came from.
const logos = [rtkLogo, forstaLogo, imetLogo, heLogo]
const logoCompanies = ['Riigi Tugiteenuste Keskus', 'Forsta', 'Industrial Metal', 'Highway Engineering']

export function Testimonials() {
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true }) as TestimonialContent[]

  return (
    <Section tone="sand" id="testimonials">
      <SectionHeader title={t('testimonials.title')} sub={t('testimonials.sub')} />
      <motion.div className="grid md:grid-cols-2 gap-5 md:gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {items.map((item, i) => (
          <motion.figure key={i} variants={fadeUp} className="m-0 bg-card border border-line rounded-3xl p-7 md:p-9 flex flex-col">
            <span className="font-serif text-6xl leading-[0.6] text-coffee select-none" aria-hidden="true">“</span>
            <blockquote className="m-0 mt-4 font-serif text-xl md:text-[22px] leading-snug flex-1">{item.quote}</blockquote>
            <figcaption className="mt-7 pt-5 border-t border-line flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-[15px]">{item.name}</p>
                <p className="text-muted text-sm mt-0.5">{item.role}</p>
              </div>
              {logos[i] && (
                <img
                  src={logos[i]}
                  alt={t('seo.imgAltClientLogo', { name: logoCompanies[i] ?? 'client' })}
                  className="max-h-9 max-w-[120px] object-contain grayscale opacity-75 mix-blend-multiply"
                />
              )}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </Section>
  )
}

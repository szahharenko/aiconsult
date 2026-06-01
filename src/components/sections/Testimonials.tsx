import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
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

// The locale file holds quote + author text (with placeholders to swap later).
// Logos are matched here by index so each quote shows the company it came from.
const logos = [rtkLogo, forstaLogo, imetLogo, heLogo]
// Used for image alt text — kept untranslated since these are proper nouns
// (registered company names) and matter for accessibility / SEO consistency.
const logoCompanies = [
  'Riigi Tugiteenuste Keskus',
  'Forsta',
  'Industrial Metal',
  'Highway Engineering',
]

export function Testimonials() {
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true }) as TestimonialContent[]

  return (
    <Section dark id="testimonials">
      <SectionHeader title={t('testimonials.title')} sub={t('testimonials.sub')} />
      <motion.div
        className="grid md:grid-cols-2 gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        {items.map((item, i) => (
          <motion.figure
            key={i}
            variants={fadeUp}
            className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col"
          >
            <Quote size={22} className="text-coffee/60 flex-shrink-0 mb-3" />
            <blockquote className="text-slate-200 leading-relaxed flex-1">"{item.quote}"</blockquote>
            <figcaption className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <div>
                <p className="text-white font-semibold text-sm">{item.name}</p>
                <p className="text-slate-400 text-xs mt-0.5">{item.role}</p>
              </div>
              {logos[i] && (
                <img
                  src={logos[i]}
                  alt={t('seo.imgAltClientLogo', { name: logoCompanies[i] ?? 'client' })}
                  className="max-h-9 max-w-[120px] object-contain opacity-80 mix-blend-multiply dark:mix-blend-screen dark:invert"
                />
              )}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </Section>
  )
}

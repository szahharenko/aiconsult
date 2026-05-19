import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import forstaLogo from '../../assets/logos/forsta.webp'
import heLogo from '../../assets/logos/he.png'
import imetLogo from '../../assets/logos/imet.png'
import rtkLogo from '../../assets/logos/rtk.png'



// Placeholder logo list. Swap each entry's `logo` for an <img src={...} />
// or an inline <svg/> once real assets are ready.
// Keeping a stable shape so importing real logos later is a one-line change.
const clients: { name: string; logo?: string }[] = [
  { name: 'Riigi tugiteenuste keskus', logo: rtkLogo },
  { name: 'Forsta', logo: forstaLogo },
  { name: 'Industrial Metal', logo: imetLogo },
  { name: 'Highway Engineering ', logo: heLogo }
]

export function OurClients() {
  const { t } = useTranslation()

  return (
    <Section id="clients">
      <SectionHeader
        title={t('clients.title')}
        sub={t('clients.sub')}
      />
      <motion.ul
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-slate-800 border border-slate-800 rounded-2xl overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        {clients.map((c, i) => (
          <motion.li
            key={i}
            variants={fadeUp}
            className="bg-slate-950 flex items-center justify-center h-24 px-2 group"
          >
            {c.logo && (
              <img src={c.logo} alt={`${c.name} logo`} className="max-h-20 object-contain mix-blend-multiply dark:mix-blend-screen dark:invert transition-[filter] duration-250" />
            )}
            {!c.logo && (
              <span className="text-slate-500 group-hover:text-slate-200 transition-colors font-semibold tracking-wide text-base md:text-lg select-none">
                {c.name}
              </span>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}

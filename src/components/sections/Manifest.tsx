import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

export function Manifest() {
  const { t } = useTranslation()
  const principles = t('manifest.principles', { returnObjects: true }) as { title: string; body: string }[]

  return (
    <Section id="manifest">
      <SectionHeader title={t('manifest.title')} />
      <motion.div
        className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            variants={fadeUp}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-olive/40 transition-colors"
          >
            <div className="text-coffee/70 font-mono text-xs font-bold tracking-wider mb-3">
              {String(i + 1).padStart(2, '0')}
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{p.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

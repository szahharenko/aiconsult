import { motion } from 'framer-motion'
import { fadeUp } from '../../animations'

export function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
      {sub && <p className="text-slate-400 text-lg">{sub}</p>}
    </motion.div>
  )
}

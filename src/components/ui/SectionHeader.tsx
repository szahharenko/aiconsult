import { motion } from 'framer-motion'
import { fadeUp } from '../../animations'

/**
 * Editorial section header: serif title on the left, supporting line on the
 * right. `*word*` inside the title renders as the teal italic accent.
 */
export function SectionHeader({
  title,
  sub,
  kicker,
  align = 'split',
}: {
  title: string
  sub?: string
  kicker?: string
  align?: 'split' | 'center'
}) {
  const parts = title.split(/\*([^*]+)\*/)
  const titleNode = parts.map((p, i) =>
    i % 2 === 1 ? (
      <span key={i} className="italic text-coffee">{p}</span>
    ) : (
      <span key={i}>{p}</span>
    ),
  )

  if (align === 'center') {
    return (
      <motion.div className="text-center mb-10 max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        {kicker && <p className="text-coffee text-xs md:text-sm font-bold uppercase tracking-[0.08em] mb-4">{kicker}</p>}
        <h2 className="font-serif text-4xl md:text-6xl font-normal leading-[1.04] text-white mb-4">{titleNode}</h2>
        {sub && <p className="text-slate-400 text-lg leading-relaxed">{sub}</p>}
      </motion.div>
    )
  }

  return (
    <motion.div
      className="mb-12 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <div className="max-w-3xl">
        {kicker && <p className="text-coffee text-xs md:text-sm font-bold uppercase tracking-[0.08em] mb-4">{kicker}</p>}
        <h2 className="font-serif text-4xl md:text-6xl font-normal leading-[1.04] text-white">{titleNode}</h2>
      </div>
      {sub && <p className="text-slate-400 text-base md:text-lg leading-relaxed md:max-w-sm">{sub}</p>}
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { ArrowRight, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { fadeUp, stagger } from '../../animations'
import { useMeetup } from '../../contexts/MeetupContext'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

type Format = { title: string; cadence: string; body: string; cta: string }

const formatIcons = [
  <Users size={22} className="text-coffee" />,
]

export function Community() {
  const { t } = useTranslation()
  const { lang } = useParams<{ lang: string }>()
  const { openMeetup } = useMeetup()
  const formats = t('community.formats', { returnObjects: true }) as Format[]

  return (
    <Section dark id="community">
      <SectionHeader title={t('community.title')} sub={t('community.sub')} />
      <motion.div
        className="grid gap-5 max-w-md mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        {formats.map((f, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col hover:border-coffee/40 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-coffee/15 border border-coffee/30 flex items-center justify-center flex-shrink-0">
                {formatIcons[i]}
              </div>
              <h3 className="text-white font-bold text-lg">{f.title}</h3>
            </div>
            <p className="text-coffee/80 font-mono text-xs mb-3 tracking-tight">{f.cadence}</p>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1">{f.body}</p>
            <button
              type="button"
              onClick={openMeetup}
              className="inline-flex items-center justify-center gap-2 bg-coffee hover:bg-coffee/80 text-white py-3 rounded-xl font-semibold text-sm transition-colors w-full"
            >
              {f.cta} <ArrowRight size={16} />
            </button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <Link
          to={`/${lang || 'en'}/events`}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-coffee text-sm transition-colors"
        >
          {t('community.allEvents')} <ArrowRight size={14} />
        </Link>
      </motion.div>
    </Section>
  )
}

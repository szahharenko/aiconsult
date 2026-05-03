import { motion } from 'framer-motion'
import { Lightbulb, Users, Zap, MessageCircle, Target, ChevronRight, Calendar, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

const pillarIcons = [
  <Lightbulb size={24} className="text-coffee" />,
  <Users size={24} className="text-coffee" />,
  <Zap size={24} className="text-coffee" />,
]

const timelineIcons = [
  <MessageCircle size={16} />,
  <Zap size={16} />,
  <Target size={16} />,
  <Lightbulb size={16} />,
  <Users size={16} />,
  <MessageCircle size={16} />,
]

export function AIClub() {
  const { t } = useTranslation()
  const pillars = t('club.pillars', { returnObjects: true }) as { title: string; desc: string }[]
  const timeline = t('club.timeline', { returnObjects: true }) as { time: string; label: string }[]

  return (
    <Section id="club">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <SectionHeader
          title={t('club.title')}
          sub={t('club.sub')}
        />

        {/* 3 Pillars */}
        <motion.div className="grid md:grid-cols-3 gap-6 mb-12" variants={stagger}>
          {pillars.map((p, i) => (
            <motion.div key={i} variants={fadeUp}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-coffee/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-coffee/15 border border-coffee/30 flex items-center justify-center mb-4">
                {pillarIcons[i]}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Meeting Timeline */}
        <motion.div variants={fadeUp} className="mb-12">
          <h3 className="text-white font-bold text-xl text-center mb-6">
            {t('club.formatTitle')}
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {timeline.map((item, i) => (
              <div key={i} className="flex items-center">
                <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 flex items-center gap-3">
                  <span className="text-coffee font-mono text-xs font-bold">{item.time}</span>
                  <span className="text-coffee/60">{timelineIcons[i]}</span>
                  <span className="text-slate-300 text-sm font-medium">{item.label}</span>
                </div>
                {i < timeline.length - 1 && (
                  <ChevronRight size={16} className="text-slate-600 mx-1 flex-shrink-0 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Card */}
        <motion.div variants={fadeUp}
          className="bg-gradient-to-br from-coffee/15 to-coffee/5 border border-coffee/30 rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Calendar size={20} className="text-coffee" />
            <span className="text-white font-bold text-lg">
              {t('club.nextMeetup')} {t('club.nextDate')}
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-5">
            {t('club.spots')}
          </p>
          <a href="#contact"
            className="inline-flex items-center gap-2 bg-coffee hover:bg-coffee/80 text-white px-8 py-3.5 rounded-2xl font-bold transition-colors">
            {t('club.cta')} <ArrowRight size={18} />
          </a>
          <p className="text-slate-500 text-xs mt-4">
            {t('club.location')}
          </p>
        </motion.div>
      </motion.div>
    </Section>
  )
}

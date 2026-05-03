import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { VIDEO_EMBED_URL } from '../../config'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

export function VideoSection() {
  const { t } = useTranslation()

  return (
    <Section id="video">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <SectionHeader
          title={t('competition.title')}
          sub={t('video.sub')}
        />
        <motion.div variants={fadeUp}>
          {VIDEO_EMBED_URL ? (
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 aspect-video">
              <iframe
                src={VIDEO_EMBED_URL}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 border-dashed aspect-video flex flex-col items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-coffee/5 to-transparent pointer-events-none" />
              <div className="w-20 h-20 rounded-full bg-coffee/20 border-2 border-coffee/50 flex items-center justify-center mb-5 group-hover:bg-coffee/30 transition-colors">
                <Play size={32} className="text-coffee ml-1" fill="currentColor" />
              </div>
              <p className="text-white font-bold text-xl mb-2 text-center px-4">
                {t('video.placeholder')}
              </p>
              <p className="text-slate-400 text-sm text-center px-8 max-w-lg">
                {t('video.placeholderSub')}
              </p>
              <div className="mt-6 bg-slate-800/80 border border-slate-600 rounded-xl px-5 py-3 flex items-center gap-3">
                <Play size={14} className="text-coffee flex-shrink-0" />
                <code className="text-slate-300 text-xs">VIDEO_EMBED_URL = "https://www.youtube.com/embed/YOUR_ID"</code>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </Section>
  )
}

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { MeetupSignupForm } from '../sections/MeetupSignupForm'

export function MeetupModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-coffee flex-shrink-0" />
            <h2 className="text-2xl font-bold text-white">{t('meetupForm.title')}</h2>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-white transition-colors flex-shrink-0">
            <X size={24} />
          </button>
        </div>
        <p className="text-slate-400 text-sm mb-6">{t('meetupForm.sub')}</p>
        <MeetupSignupForm />
      </motion.div>
    </motion.div>
  )
}

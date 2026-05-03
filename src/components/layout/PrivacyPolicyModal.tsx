import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function PrivacyPolicyModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])
  const sections = t('privacy.sections', { returnObjects: true }) as { title: string; body: string }[]
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{t('privacy.title')}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X size={24} /></button>
        </div>
        <div className="text-slate-300 text-sm space-y-5 leading-relaxed">
          <p className="text-slate-500 italic">{t('privacy.updated')}</p>
          {sections.map(s => (
            <div key={s.title}><h3 className="text-white font-semibold text-base mb-1">{s.title}</h3><p>{s.body}</p></div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-slate-700">
          <button onClick={onClose} className="bg-coffee hover:bg-coffee/80 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors">{t('privacy.ok')}</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function CookieBanner({ onAccept, onDecline, onShowPrivacy }: { onAccept: () => void; onDecline: () => void; onShowPrivacy: () => void }) {
  const { t } = useTranslation()
  return (
    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-3xl mx-auto bg-slate-800 border border-slate-700 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
        <Shield size={22} className="text-coffee flex-shrink-0 mt-0.5" />
        <p className="text-slate-300 text-sm flex-1">
          {t('cookie.text')}{' '}
          <button onClick={onShowPrivacy} className="text-coffee underline hover:text-coffee/80 transition-colors">{t('cookie.privacyLink')}</button>.
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={onDecline} className="px-4 py-2 text-slate-400 hover:text-white border border-slate-600 hover:border-slate-400 rounded-xl text-sm transition-colors">{t('cookie.decline')}</button>
          <button onClick={onAccept} className="px-4 py-2 bg-coffee hover:bg-coffee/80 text-white rounded-xl text-sm font-semibold transition-colors">{t('cookie.accept')}</button>
        </div>
      </div>
    </motion.div>
  )
}

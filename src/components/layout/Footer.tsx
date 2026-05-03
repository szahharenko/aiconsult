import { Linkedin, Mail, FileText, Shield } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BRAND_NAME, CONTACT_EMAIL, LINKEDIN_URL } from '../../config'

export function Footer({ onShowPrivacy }: { onShowPrivacy: () => void }) {
  const { t } = useTranslation()
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-slate-500 text-sm">© 2026 {BRAND_NAME} · {t('brandTagline')} · Tallinn, Estonia</span>
        <div className="flex items-center gap-5 flex-wrap justify-center">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-coffee transition-colors flex items-center gap-1.5 text-sm"><Linkedin size={15} />LinkedIn</a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-slate-400 hover:text-coffee transition-colors flex items-center gap-1.5 text-sm"><Mail size={15} />{CONTACT_EMAIL}</a>
          <a href="#" className="text-slate-400 hover:text-coffee transition-colors flex items-center gap-1.5 text-sm"><FileText size={15} />Blog</a>
          <button onClick={onShowPrivacy} className="text-slate-400 hover:text-coffee transition-colors flex items-center gap-1.5 text-sm"><Shield size={14} />{t('footer.privacy')}</button>
        </div>
      </div>
    </footer>
  )
}

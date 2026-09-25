import { useTranslation } from 'react-i18next'
import { BRAND_NAME, LINKEDIN_URL, PARENT_BRAND, PARENT_URL } from '../../config'
import logoLight from '../../assets/tkr-logo-light.png'

export function Footer({ onShowPrivacy }: { onShowPrivacy: () => void }) {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  const linkCls = 'text-[#9FB0C0] hover:text-mint transition-colors'
  return (
    <footer className="bg-ink px-5 md:px-10 pb-10">
      <div className="max-w-6xl mx-auto pt-8 border-t border-[#22364A] flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <img src={logoLight} alt={BRAND_NAME} className="h-8 w-auto" />
        <span className="text-[#9FB0C0] text-center">© {year} {BRAND_NAME} · {t('brandTagline')} · Tallinn</span>
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <a href={PARENT_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>Part of {PARENT_BRAND}</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>LinkedIn</a>
          <button type="button" onClick={onShowPrivacy} className={linkCls}>{t('footer.privacy')}</button>
        </div>
      </div>
    </footer>
  )
}

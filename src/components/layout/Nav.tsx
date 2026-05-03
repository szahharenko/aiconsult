import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { BRAND_NAME, SUPPORTED_LANGS, type Lang } from '../../config'

export function Nav() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { lang } = useParams<{ lang: string }>()

  const switchLang = (newLang: Lang) => {
    i18n.changeLanguage(newLang)
    navigate(`/${newLang}`, { replace: true })
  }

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-coffee">{BRAND_NAME}</span>
          <span className="hidden sm:inline text-slate-500 text-xs font-normal">— {t('brandTagline')}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-800 border border-slate-700 rounded-lg overflow-hidden text-xs font-semibold">
            {SUPPORTED_LANGS.map(l => (
              <button key={l} onClick={() => switchLang(l)}
                className={`px-3 py-1.5 transition-colors ${(lang || i18n.language) === l ? 'bg-coffee text-white' : 'text-slate-400 hover:text-white'}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="#contact" className="bg-coffee hover:bg-coffee/80 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
            {t('nav.cta')}
          </a>
        </div>
      </div>
    </nav>
  )
}

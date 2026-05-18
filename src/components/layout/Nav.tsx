import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { BRAND_NAME, SUPPORTED_LANGS, type Lang } from '../../config'
import { useTheme } from '../../contexts/ThemeContext'
import logoUrl from '../../assets/logo.png'

export function Nav() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { lang } = useParams<{ lang: string }>()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const switchLang = (newLang: Lang) => {
    i18n.changeLanguage(newLang)
    navigate(`/${newLang}`, { replace: true })
  }

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div
        className={`max-w-5xl mx-auto px-6 flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled ? 'h-14' : 'h-20'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={logoUrl}
            alt={BRAND_NAME}
            className={`rounded-full object-contain transition-all duration-300 ${
              scrolled ? 'h-8 w-8 opacity-90' : 'h-34 w-34'
            }`}
          />
          <span
            className={`hidden sm:inline text-slate-500 font-normal transition-all duration-300 ${
              scrolled ? 'text-[11px] opacity-70' : 'text-xs'
            }`}
          >
            - {t('brandTagline')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-coffee hover:border-coffee/50 transition-colors"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="flex bg-slate-800 border border-slate-700 rounded-lg overflow-hidden text-xs font-semibold">
            {SUPPORTED_LANGS.map(l => (
              <button key={l} onClick={() => switchLang(l)}
                className={`px-3 py-1.5 transition-colors ${(lang || i18n.language) === l ? 'bg-coffee text-white' : 'text-slate-400 hover:text-white'}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="#contact" className="hidden sm:inline-block bg-coffee hover:bg-coffee/80 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
            {t('nav.cta')}
          </a>
        </div>
      </div>
    </nav>
  )
}

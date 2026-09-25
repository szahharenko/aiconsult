import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BRAND_NAME, SUPPORTED_LANGS, type Lang } from '../../config'
import logoUrl from '../../assets/tkr-logo.png'

const anchors = ['services', 'funding', 'cases', 'about'] as const

export function Nav() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { lang } = useParams<{ lang: string }>()
  const current = (lang || i18n.language) as Lang
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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

  const linkCls = 'text-ink/85 hover:text-coffee transition-colors'

  return (
    <nav className={`sticky top-0 z-40 border-b transition-colors ${scrolled ? 'bg-paper/92 backdrop-blur border-line' : 'bg-paper border-line'}`}>
      <div className={`max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between gap-6 transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
        <a href="#top" className="flex items-center shrink-0" aria-label={BRAND_NAME}>
          <img src={logoUrl} alt={BRAND_NAME} className={`w-auto transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'}`} />
        </a>

        <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium">
          {anchors.map(a => (
            <a key={a} href={`#${a}`} className={linkCls}>{t(`nav.links.${a}`)}</a>
          ))}
          <Link to={`/${current}/events`} className={linkCls}>{t('nav.links.events')}</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex text-[13px] font-semibold" role="group" aria-label="Language">
            {SUPPORTED_LANGS.map(l => (
              <button
                key={l}
                type="button"
                onClick={() => switchLang(l)}
                aria-pressed={current === l}
                className={`px-2 py-2 border-b-2 transition-colors ${current === l ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="#contact" className="hidden sm:inline-flex bg-ink hover:bg-ink/85 text-paper px-5 py-3 rounded-full text-[15px] font-semibold transition-colors">
            {t('nav.cta')}
          </a>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="lg:hidden w-11 h-11 -mr-2 flex items-center justify-center text-ink"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-paper px-5 py-4 flex flex-col text-lg font-medium">
          {anchors.map(a => (
            <a key={a} href={`#${a}`} onClick={() => setOpen(false)} className="py-3 border-b border-line text-ink">{t(`nav.links.${a}`)}</a>
          ))}
          <Link to={`/${current}/events`} onClick={() => setOpen(false)} className="py-3 border-b border-line text-ink">{t('nav.links.events')}</Link>
          <a href="#contact" onClick={() => setOpen(false)} className="mt-4 bg-ink text-paper rounded-full py-3.5 text-center font-semibold">{t('nav.cta')}</a>
        </div>
      )}
    </nav>
  )
}

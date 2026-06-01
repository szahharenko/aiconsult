/**
 * 404 page. SPA hosting can't always return a real HTTP 404, so the most we
 * can do from the client is render a clear message and emit a `robots:
 * noindex,nofollow` meta tag. That prevents Google from indexing soft-404
 * URLs as legitimate content even when the server replies with 200.
 *
 * For hosts that support it (Netlify, Vercel, Cloudflare Pages, nginx) you
 * should ALSO configure the server to serve dist/404.html with a real 404
 * status code on unknown paths — see public/_redirects in this repo.
 */
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from '../config'
import { Seo } from '../components/seo/Seo'

function detectLang(pathname: string): Lang {
  const seg = pathname.split('/').filter(Boolean)[0]
  return SUPPORTED_LANGS.includes(seg as Lang) ? (seg as Lang) : DEFAULT_LANG
}

export default function NotFound() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const lang = detectLang(pathname)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center px-6">
      <Seo
        lang={lang}
        title={t('seo.notFoundTitle')}
        description={t('seo.notFoundDescription')}
        pathAfterLang=""
        noindex
      />
      <div className="text-center max-w-md">
        <p className="text-coffee font-mono text-sm mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t('notFound.title')}
        </h1>
        <p className="text-slate-400 mb-8">{t('notFound.body')}</p>
        <Link
          to={`/${lang}`}
          className="inline-flex items-center gap-2 bg-coffee hover:bg-coffee/80 text-white px-6 py-3 rounded-2xl font-bold transition-colors"
        >
          {t('notFound.cta')}
        </Link>
      </div>
    </div>
  )
}

/**
 * Imperative head-tag manager.
 *
 * Sets <html lang>, <title>, meta description/robots, canonical, hreflang
 * (one per supported language + x-default) and Open Graph / Twitter Card
 * tags for the current page.
 *
 * Implemented without a helmet-style library to keep the bundle lean and
 * to play nicely with the prerender step (puppeteer waits for effects to
 * settle, so by the time it snapshots the DOM these tags are in place).
 *
 * Mount one <Seo /> per route — the dependency array re-applies on lang or
 * route change.
 */
import { useEffect } from 'react'
import {
  SUPPORTED_LANGS,
  SITE_URL,
  HREFLANG_MAP,
  OG_LOCALE_MAP,
  DEFAULT_OG_IMAGE,
  type Lang,
} from '../../config'

type Props = {
  lang: Lang
  title: string
  description: string
  /** Path AFTER the language segment, starting with '/' (or empty for the home page). */
  pathAfterLang?: string
  noindex?: boolean
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
}

function upsertMeta(
  selector: string,
  attrs: Record<string, string>,
) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
}

function upsertLink(
  rel: string,
  hreflang: string | undefined,
  href: string,
) {
  const sel = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`
  let el = document.head.querySelector<HTMLLinkElement>(sel)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (hreflang) el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function Seo({
  lang,
  title,
  description,
  pathAfterLang = '',
  noindex = false,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
}: Props) {
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)

    document.title = title
    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: noindex ? 'noindex, nofollow' : 'index, follow',
    })

    const canonical = `${SITE_URL}/${lang}${pathAfterLang}`
    upsertLink('canonical', undefined, canonical)

    // hreflang for every supported language plus x-default (English).
    for (const l of SUPPORTED_LANGS) {
      upsertLink('alternate', HREFLANG_MAP[l], `${SITE_URL}/${l}${pathAfterLang}`)
    }
    upsertLink('alternate', 'x-default', `${SITE_URL}/en${pathAfterLang}`)

    const absOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`

    // Open Graph
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: ogType })
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: OG_LOCALE_MAP[lang] })
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'TarKratt' })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: absOgImage })

    // Twitter Card
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: absOgImage })
  }, [lang, title, description, pathAfterLang, noindex, ogImage, ogType])

  return null
}

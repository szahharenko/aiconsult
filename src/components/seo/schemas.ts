/**
 * Schema.org JSON-LD builders.
 *
 * Functions, not constants, so callers can localise text and pass in dynamic
 * content (e.g. FAQ items pulled from the active i18n bundle).
 */
import {
  SITE_URL,
  YOUR_FULL_NAME,
  LINKEDIN_URL,
  CONTACT_EMAIL,
  DEFAULT_OG_IMAGE,
  type Lang,
} from '../../config'

const absOg = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path}`)

/**
 * Top-level business entity. ProfessionalService is a narrower fit than
 * LocalBusiness for a consulting practice but inherits the same useful fields.
 */
export function businessSchema(lang: Lang, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#business`,
    name: 'TarKratt',
    url: `${SITE_URL}/${lang}`,
    image: absOg(DEFAULT_OG_IMAGE),
    description,
    inLanguage: lang,
    priceRange: '€€',
    areaServed: { '@type': 'Country', name: 'Estonia' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tallinn',
      addressCountry: 'EE',
    },
    founder: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#sergei`,
      name: YOUR_FULL_NAME,
      sameAs: [LINKEDIN_URL],
    },
    email: CONTACT_EMAIL,
    sameAs: [LINKEDIN_URL],
  }
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#sergei`,
    name: YOUR_FULL_NAME,
    jobTitle: 'AI consultant',
    worksFor: { '@type': 'Organization', name: 'TarKratt', '@id': `${SITE_URL}/#business` },
    sameAs: [LINKEDIN_URL],
    email: CONTACT_EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tallinn',
      addressCountry: 'EE',
    },
  }
}

export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

/**
 * BreadcrumbList for the /events page. Cheap to render and helps SERP layout.
 */
export function breadcrumbSchema(
  lang: Lang,
  trail: { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}/${lang}${t.path}`,
    })),
  }
}

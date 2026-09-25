import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'framer-motion'
import { SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from './config'

// Layout
import { Nav } from './components/layout/Nav'
import { MeetupBanner } from './components/layout/MeetupBanner'
import { Footer } from './components/layout/Footer'
import { CookieBanner } from './components/layout/CookieBanner'
import { PrivacyPolicyModal } from './components/layout/PrivacyPolicyModal'

// SEO
import { Seo } from './components/seo/Seo'
import { JsonLd } from './components/seo/JsonLd'
import { businessSchema, personSchema, faqPageSchema } from './components/seo/schemas'

// Sections
import { Hero, ResultsStrip, KrattStory } from './components/sections/Hero'
import { Community } from './components/sections/Community'
import { Services } from './components/sections/Services'
import { AIFunding } from './components/sections/AIFunding'
import { GrantChecker } from './components/sections/GrantChecker'
import { LeadMagnet } from './components/sections/LeadMagnet'
import { Process } from './components/sections/Process'
import { Testimonials } from './components/sections/Testimonials'
import { CaseStudies } from './components/sections/CaseStudies'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'

// Google Consent Mode v2 — relay the cookie banner choice to the Google tag
function updateAdsConsent(granted: boolean) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  const state = granted ? 'granted' : 'denied'
  if (typeof w.gtag === 'function') w.gtag('consent', 'update', {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  })
  // Meta Pixel consent - revoked by default in index.html
  const f = window as unknown as { fbq?: (...args: unknown[]) => void }
  if (typeof f.fbq === 'function') f.fbq('consent', granted ? 'grant' : 'revoke')
}

export default function App() {
  const { lang } = useParams<{ lang: string }>()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const activeLang: Lang = SUPPORTED_LANGS.includes(lang as Lang) ? (lang as Lang) : DEFAULT_LANG

  const faqItems = t('faq.items', { returnObjects: true }) as { q: string; a: string }[]
  const seoDescription = t('seo.homeDescription')
  const schemas = useMemo(
    () => [
      businessSchema(activeLang, seoDescription),
      personSchema(),
      faqPageSchema(faqItems),
    ],
    [activeLang, seoDescription, faqItems],
  )

  const [showPrivacy, setShowPrivacy] = useState(false)
  const [cookieConsent, setCookieConsent] = useState<string | null>(() => {
    try { return localStorage.getItem('cookie_consent') } catch { return null }
  })

  const acceptCookies = useCallback(() => {
    localStorage.setItem('cookie_consent', 'accepted')
    setCookieConsent('accepted')
    updateAdsConsent(true)
  }, [])

  const declineCookies = useCallback(() => {
    localStorage.setItem('cookie_consent', 'declined')
    setCookieConsent('declined')
    updateAdsConsent(false)
  }, [])

  // Sync i18n language with URL param
  useEffect(() => {
    const validLang = SUPPORTED_LANGS.includes(lang as Lang) ? (lang as Lang) : DEFAULT_LANG
    if (validLang !== lang) {
      navigate(`/${validLang}`, { replace: true })
      return
    }
    if (i18n.language !== validLang) {
      i18n.changeLanguage(validLang)
    }
  }, [lang, i18n, navigate])

  return (
    <div id="top" className="min-h-screen bg-paper text-ink font-sans">
      <Seo
        lang={activeLang}
        title={t('seo.homeTitle')}
        description={seoDescription}
        pathAfterLang=""
      />
      <JsonLd id="business" data={schemas[0]} />
      <JsonLd id="person" data={schemas[1]} />
      <JsonLd id="faq" data={schemas[2]} />

      <AnimatePresence>
        {!cookieConsent && (
          <CookieBanner
            onAccept={acceptCookies}
            onDecline={declineCookies}
            onShowPrivacy={() => setShowPrivacy(true)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPrivacy && <PrivacyPolicyModal onClose={() => setShowPrivacy(false)} />}
      </AnimatePresence>

      <MeetupBanner />
      <Nav />
      <Hero />
      <ResultsStrip />
      <KrattStory />
      <Services />
      <Community />
      <AIFunding />
      <GrantChecker />
      <LeadMagnet />
      <Process />
      <Testimonials />
      <CaseStudies />
      <About />
      <Contact />

      <Footer onShowPrivacy={() => setShowPrivacy(true)} />
    </div>
  )
}

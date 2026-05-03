import { useState, useEffect, useCallback } from 'react'
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

// Sections
import { Hero } from './components/sections/Hero'
import { VideoSection } from './components/sections/VideoSection'
import { Applications } from './components/sections/Applications'
import { Process } from './components/sections/Process'

import { Services } from './components/sections/Services'
import { CaseStudies } from './components/sections/CaseStudies'
import { ROICalculator } from './components/sections/ROICalculator'
import { About } from './components/sections/About'
import { AIClub } from './components/sections/AIClub'
import { FAQ } from './components/sections/FAQ'
import { Contact } from './components/sections/Contact'

export default function App() {
  const { lang } = useParams<{ lang: string }>()
  const navigate = useNavigate()
  const { i18n } = useTranslation()

  const [showPrivacy, setShowPrivacy] = useState(false)
  const [cookieConsent, setCookieConsent] = useState<string | null>(() => {
    try { return localStorage.getItem('cookie_consent') } catch { return null }
  })

  const acceptCookies = useCallback(() => {
    localStorage.setItem('cookie_consent', 'accepted')
    setCookieConsent('accepted')
  }, [])

  const declineCookies = useCallback(() => {
    localStorage.setItem('cookie_consent', 'declined')
    setCookieConsent('declined')
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
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
      <VideoSection />
      <Applications />
      <Process />
      <Services />
      <CaseStudies />
      <ROICalculator />
      <About />
      <AIClub />
      <FAQ />
      <Contact />

      <Footer onShowPrivacy={() => setShowPrivacy(true)} />
    </div>
  )
}

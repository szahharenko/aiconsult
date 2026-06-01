export const BRAND_NAME = "TarKratt"
export const BRAND_TAGLINE_KEY = "brandTagline"
export const PARENT_BRAND = "Undercover"
export const PARENT_URL = "https://undercover.ee"
export const YOUR_NAME = "Sergei"
export const YOUR_FULL_NAME = "Sergei Zahharenko"
export const CONTACT_EMAIL = "sergei@undercover.ee"
export const LINKEDIN_URL = "https://www.linkedin.com/in/sergei-zahharenko/"
export const FORMSPREE_ID = "mdapryan"
export const SUPPORTED_LANGS = ['en', 'ru', 'et'] as const
export type Lang = (typeof SUPPORTED_LANGS)[number]
export const DEFAULT_LANG: Lang = 'en'

// Canonical site origin. Used to build canonical, hreflang, OG and JSON-LD URLs.
// No trailing slash.
export const SITE_URL = "https://tarkratt.eu"
// Default social-card image. Falls back to the 512×512 favicon — works,
// but for a proper LinkedIn/Twitter card produce a real 1200×630 PNG and
// drop it into public/ as og-image.png, then change this constant.
export const DEFAULT_OG_IMAGE = "/favicon-512.png"
// Maps app language codes to BCP-47 hreflang tags.
export const HREFLANG_MAP: Record<Lang, string> = { en: 'en', et: 'et', ru: 'ru' }
// Maps app language codes to OG locale codes.
export const OG_LOCALE_MAP: Record<Lang, string> = { en: 'en_US', et: 'et_EE', ru: 'ru_RU' }

// Lead magnet: per-language PDF guides bundled from src/assets/.
import leadMagnetEn from './assets/Estonia_AI_Grants_2026_EN.pdf'
import leadMagnetRu from './assets/Granty_Estonia_AI_2026_RU.pdf'
import leadMagnetEt from './assets/Eesti_AI_toetused_2026_ET.pdf'
export const LEAD_MAGNET_URLS: Record<Lang, string> = {
  en: leadMagnetEn,
  ru: leadMagnetRu,
  et: leadMagnetEt,
}

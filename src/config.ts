export const BRAND_NAME = "Tarkratt"
export const BRAND_TAGLINE_KEY = "brandTagline"
export const PARENT_BRAND = "Undercover"
export const PARENT_URL = "https://undercover.ee"
export const YOUR_NAME = "Sergei"
export const YOUR_FULL_NAME = "Sergei Zahharenko"
export const CONTACT_EMAIL = "acrashik@gmail.com"
export const LINKEDIN_URL = "https://www.linkedin.com/in/sergei-zahharenko/"
export const FORMSPREE_ID = "mdapryan"
export const SUPPORTED_LANGS = ['en', 'ru', 'et'] as const
export type Lang = (typeof SUPPORTED_LANGS)[number]
export const DEFAULT_LANG: Lang = 'en'

// Lead magnet: per-language PDF guides bundled from src/assets/.
import leadMagnetEn from './assets/Estonia_AI_Grants_2026_EN.pdf'
import leadMagnetRu from './assets/Granty_Estonia_AI_2026_RU.pdf'
import leadMagnetEt from './assets/Eesti_AI_toetused_2026_ET.pdf'
export const LEAD_MAGNET_URLS: Record<Lang, string> = {
  en: leadMagnetEn,
  ru: leadMagnetRu,
  et: leadMagnetEt,
}

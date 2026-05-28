export const BRAND_NAME = "Undercover AI"
export const BRAND_TAGLINE_KEY = "brandTagline"
export const PARENT_BRAND = "Undercover"
export const PARENT_URL = "https://undercover.ee"
export const YOUR_NAME = "Sergei"
export const YOUR_FULL_NAME = "Sergei Zahharenko"
export const CONTACT_EMAIL = "acrashik@gmail.com"
export const LINKEDIN_URL = "https://www.linkedin.com/in/sergei-zahharenko/"
export const FORMSPREE_ID = "mdapryan"
// Lead magnet: drop the real guide PDF into /public with this filename to replace the placeholder.
export const LEAD_MAGNET_URL = "/ai-grants-2026.pdf"
export const SUPPORTED_LANGS = ['en', 'ru', 'et'] as const
export type Lang = (typeof SUPPORTED_LANGS)[number]
export const DEFAULT_LANG: Lang = 'en'

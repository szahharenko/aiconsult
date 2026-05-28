import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileDown, Download, CheckCircle2, Loader2, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp } from '../../animations'
import { Section } from '../ui/Section'
import { FORMSPREE_ID, CONTACT_EMAIL, LEAD_MAGNET_URL } from '../../config'

/**
 * Lower-commitment conversion rung for visitors who aren't ready to book a call.
 * Captures an email in exchange for the free "AI Grants 2026" guide, submitted to
 * the same Formspree endpoint (tagged form_type=lead_magnet). On success it reveals
 * the download link. Replace the guide file via LEAD_MAGNET_URL in config.ts.
 */
export function LeadMagnet() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const bullets = t('leadMagnet.bullets', { returnObjects: true }) as string[]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    const data = new FormData(form)
    data.append('form_type', 'lead_magnet')
    data.append('_subject', 'AI Grants 2026 guide download')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST', body: data, headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('sent'); form.reset() }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <Section id="guide">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="rounded-3xl border border-coffee/40 bg-coffee/10 p-7 md:p-10 grid md:grid-cols-2 gap-8 items-center"
      >
        <div>
          <span className="inline-flex items-center gap-2 text-coffee text-xs font-bold uppercase tracking-wide mb-3">
            <FileDown size={15} />{t('leadMagnet.eyebrow')}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">{t('leadMagnet.title')}</h2>
          <p className="text-slate-300 mb-5">{t('leadMagnet.sub')}</p>
          <ul className="space-y-2">
            {bullets.map(b => (
              <li key={b} className="flex items-start gap-2.5 text-slate-300 text-sm">
                <Check size={16} className="text-sage-green flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          {status === 'sent' ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-2">
              <CheckCircle2 size={40} className="text-sage-green mx-auto mb-3" />
              <h3 className="text-white font-bold text-lg mb-1.5">{t('leadMagnet.sentTitle')}</h3>
              <p className="text-slate-400 text-sm mb-5">{t('leadMagnet.sentSub')}</p>
              <a
                href={LEAD_MAGNET_URL}
                download
                className="w-full bg-coffee hover:bg-coffee/80 text-white px-6 py-3 rounded-2xl font-bold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Download size={18} />{t('leadMagnet.download')}
              </a>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-400 text-sm mb-1.5">{t('leadMagnet.emailLabel')}</label>
                <input
                  required name="email" type="email" placeholder="your@email.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors"
                />
              </div>
              {status === 'error' && (
                <p className="text-red-400 text-sm">
                  {t('leadMagnet.err')}{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>
                </p>
              )}
              <button
                type="submit" disabled={status === 'sending'}
                className="w-full bg-coffee hover:bg-coffee/80 disabled:opacity-60 text-white px-6 py-3 rounded-2xl font-bold transition-colors inline-flex items-center justify-center gap-2"
              >
                {status === 'sending'
                  ? <><Loader2 size={18} className="animate-spin" />{t('leadMagnet.sending')}</>
                  : <><FileDown size={18} />{t('leadMagnet.btn')}</>}
              </button>
              <p className="text-slate-500 text-xs text-center">{t('leadMagnet.note')}</p>
            </form>
          )}
        </div>
      </motion.div>
    </Section>
  )
}

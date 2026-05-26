import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Send, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FORMSPREE_ID, CONTACT_EMAIL } from '../../config'

/**
 * Reusable AI-meetup signup form.
 * Submits to the same Formspree endpoint as the contact form, tagged with
 * form_type=meetup so meetup RSVPs can be told apart from consultation leads.
 * Used both standalone (embedded on the events page) and inside MeetupModal.
 */
export function MeetupSignupForm({ onSuccess }: { onSuccess?: () => void }) {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    const data = new FormData(form)
    data.append('form_type', 'meetup')
    data.append('_subject', 'AI meetup signup')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST', body: data, headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('sent'); form.reset(); onSuccess?.() }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  if (status === 'sent') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-sage-green/10 border border-sage-green/40 rounded-2xl p-8 text-center">
        <CheckCircle2 size={40} className="text-sage-green mx-auto mb-3" />
        <h3 className="text-white font-bold text-xl mb-2">{t('meetupForm.sent')}</h3>
        <p className="text-slate-400">{t('meetupForm.sentSub')}</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-400 text-sm mb-1.5">{t('meetupForm.name')}</label>
          <input required name="name" type="text" placeholder={t('meetupForm.namePh')}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors" />
        </div>
        <div>
          <label className="block text-slate-400 text-sm mb-1.5">{t('meetupForm.email')}</label>
          <input required name="email" type="email" placeholder="your@email.com"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-slate-400 text-sm mb-1.5">{t('meetupForm.company')}</label>
        <input name="company" type="text" placeholder={t('meetupForm.companyPh')}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors" />
      </div>
      <div>
        <label className="block text-slate-400 text-sm mb-1.5">{t('meetupForm.note')}</label>
        <textarea name="message" rows={3} placeholder={t('meetupForm.notePh')}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors resize-none" />
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-sm">
          {t('meetupForm.err')}{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>
        </p>
      )}
      <button type="submit" disabled={status === 'sending'}
        className="w-full bg-coffee hover:bg-coffee/80 disabled:opacity-60 text-white px-7 py-3.5 rounded-2xl font-bold transition-colors inline-flex items-center justify-center gap-2">
        {status === 'sending'
          ? <><Loader2 size={18} className="animate-spin" />{t('meetupForm.sending')}</>
          : <><Send size={18} />{t('meetupForm.btn')}</>}
      </button>
      <p className="text-slate-500 text-xs text-center">{t('meetupForm.note2')}</p>
    </form>
  )
}

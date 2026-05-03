import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Send, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '../../animations'
import { FORMSPREE_ID, CONTACT_EMAIL } from '../../config'

function ContactForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST', body: data, headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('sent'); (e.target as HTMLFormElement).reset() }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  if (status === 'sent') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-sage-green/10 border border-sage-green/40 rounded-2xl p-8 text-center">
        <CheckCircle2 size={40} className="text-sage-green mx-auto mb-3" />
        <h3 className="text-white font-bold text-xl mb-2">{t('contact.form.sent')}</h3>
        <p className="text-slate-400">{t('contact.form.sentSub')}</p>
      </motion.div>
    )
  }

  const sizeOptions = ['1-10', '10-30', '30-100', '100+']
  const interestValues = ['customer_support', 'documents', 'analytics', 'sales', 'other']
  const interestLabels = t('contact.form.opts', { returnObjects: true }) as string[]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-400 text-sm mb-1.5">{t('contact.form.name')}</label>
          <input required name="name" type="text" placeholder={t('contact.form.namePh')}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors" />
        </div>
        <div>
          <label className="block text-slate-400 text-sm mb-1.5">{t('contact.form.email')}</label>
          <input required name="email" type="email" placeholder="your@email.com"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-400 text-sm mb-1.5">{t('contact.form.company')}</label>
          <input name="company" type="text" placeholder={t('contact.form.companyPh')}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors" />
        </div>
        <div>
          <label className="block text-slate-400 text-sm mb-1.5">{t('contact.form.size')}</label>
          <select name="team_size"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-coffee transition-colors">
            <option value="">{t('contact.form.sizePh')}</option>
            {sizeOptions.map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-slate-400 text-sm mb-1.5">{t('contact.form.interest')}</label>
        <select name="interest"
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-coffee transition-colors">
          <option value="">{t('contact.form.interestPh')}</option>
          {interestValues.map((v, i) => (
            <option key={v} value={v}>{interestLabels[i]}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-slate-400 text-sm mb-1.5">{t('contact.form.msg')}</label>
        <textarea name="message" rows={3} placeholder={t('contact.form.msgPh')}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors resize-none" />
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-sm">
          {t('contact.form.err')}{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>
        </p>
      )}
      <button type="submit" disabled={status === 'sending'}
        className="w-full bg-coffee hover:bg-coffee/80 disabled:opacity-60 text-white px-7 py-3.5 rounded-2xl font-bold transition-colors inline-flex items-center justify-center gap-2">
        {status === 'sending'
          ? <><Loader2 size={18} className="animate-spin" />{t('contact.form.sending')}</>
          : <><Send size={18} />{t('contact.form.btn')}</>}
      </button>
      <p className="text-slate-500 text-xs text-center">{t('contact.form.note')}</p>
    </form>
  )
}

export function Contact() {
  const { t } = useTranslation()
  const contactItems = t('contact.items', { returnObjects: true }) as string[]

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-coffee/20 via-slate-900 to-charcoal/30" id="contact">
      <div className="max-w-2xl mx-auto">
        <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white mb-4">{t('contact.title')}</motion.h2>
          <motion.div variants={fadeUp} className="mb-2">
            <p className="text-slate-400 mb-4">{t('contact.sub')}</p>
            {contactItems.map(i => (
              <div key={i} className="flex items-center gap-2 justify-center text-slate-300 mb-1">
                <CheckCircle2 size={15} className="text-sage-green" />{i}
              </div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="bg-slate-900/80 border border-slate-700 rounded-2xl p-8">
          <ContactForm />
        </motion.div>
      </div>
    </section>
  )
}

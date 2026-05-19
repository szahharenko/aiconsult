import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Search, CheckCircle2, X, AlertCircle, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { fadeUp } from '../../animations'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { EISLogo } from '../ui/EISLogo'

const API_URL = 'https://ai.undercover.ee/geetfunds/score'
const CACHE_KEY = 'grantCheck.cache.v2'

type ApiLang = 'en' | 'ru' | 'et'

interface GrantResponse {
  reg_code: string
  company_name: string
  source_url?: string
  verdict_markdown: string
  language?: ApiLang
  model?: string
  usage?: { input_tokens: number; output_tokens: number }
  cached?: boolean
  cached_at?: string
}

function buildCacheKey(regCode: string, language: ApiLang): string {
  return `${regCode}__${language}`
}

function resolveApiLang(raw: string | undefined): ApiLang {
  const norm = (raw || '').toLowerCase().split('-')[0]
  if (norm === 'ru' || norm === 'et') return norm
  return 'en'
}

type CacheMap = Record<string, GrantResponse>

function loadCache(): CacheMap {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? (parsed as CacheMap) : {}
  } catch {
    return {}
  }
}

function saveCache(cache: CacheMap) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch {
    /* quota or unavailable — silently ignore */
  }
}

/* ------------------------------------------------------------------ */
/* Markdown rendering helpers                                           */
/* ------------------------------------------------------------------ */

/**
 * Unescape JSON-style escape sequences (\n, \r, \t, \", \', \\) that the API
 * sometimes leaves literal in the verdict_markdown string when its response is
 * double-encoded. If the input is already clean markdown, these regexes are
 * no-ops.
 */
function normalizeMarkdown(md: string): string {
  let s = md.trim()

  // 1. Strip wrapping quotes (some APIs return JSON-string-encoded markdown).
  if (s.length >= 2 && s.startsWith('"') && s.endsWith('"')) {
    s = s.slice(1, -1)
  }

  // 2. Unescape JSON-style escape sequences left literal in the string.
  s = s.replace(/\\r\\n/g, '\n')
  s = s.replace(/\\n/g, '\n')
  s = s.replace(/\\r/g, '\n')
  s = s.replace(/\\t/g, '\t')
  s = s.replace(/\\"/g, '"')
  s = s.replace(/\\'/g, "'")
  s = s.replace(/\\\\/g, '\\')
  s = s.replace(/\r\n/g, '\n')

  // 3. Strip an outer fenced code block if the whole answer is wrapped in
  //    \`\`\` ... \`\`\` (or ~~~ ... ~~~). Models often do this to format their
  //    entire reply — which turns embedded GFM tables into a code block.
  //    Only strip if the open/close pair encloses the entire content.
  s = s.trim()
  const fenceMatch = s.match(/^(```+|~~~+)([^\n]*)\n([\s\S]*?)\n\1\s*$/)
  if (fenceMatch) {
    const info = (fenceMatch[2] || '').trim().toLowerCase()
    // Keep the fence only if the info-string names a real programming
    // language (json, js, ts, python, sh, bash…). For markdown/text/empty,
    // strip the fence so tables and other markdown render properly.
    const looksLikeCode = /^(json|js|ts|tsx|jsx|javascript|typescript|py|python|sh|bash|shell|yaml|yml|sql|html|css|scss|c|cpp|java|rust|go|php|rb|ruby|toml|ini|dockerfile|diff)$/.test(info)
    if (!looksLikeCode) {
      s = fenceMatch[3]
    }
  }

  // 4. Some models wrap *just* the table in a fence. Detect a ``` block whose
  //    body looks like a GFM table and unfence it in place.
  s = s.replace(
    /(^|\n)(```+|~~~+)([^\n]*)\n([\s\S]*?)\n\2(?=\n|$)/g,
    (full, lead: string, _fence, info: string, body: string) => {
      const bodyTrim = body.trim()
      const firstLine = bodyTrim.split('\n')[0] || ''
      const secondLine = bodyTrim.split('\n')[1] || ''
      const looksLikeTable =
        /^\s*\|.*\|\s*$/.test(firstLine) &&
        /^\s*\|?[\s:|-]+\|?\s*$/.test(secondLine) &&
        /[-]/.test(secondLine)
      const infoStr = (info || '').trim().toLowerCase()
      const isMarkdownInfo = infoStr === '' || infoStr === 'markdown' || infoStr === 'md' || infoStr === 'text'
      if (looksLikeTable && isMarkdownInfo) {
        return `${lead}\n${bodyTrim}\n`
      }
      return full
    },
  )

  // 5. If a markdown table ended up flattened onto a single line (no newlines
  //    between rows), split rows on the closing-pipe / opening-pipe boundary.
  if (s.includes('|') && !s.includes('\n|')) {
    s = s.replace(/\|\s+\|/g, (m) => (m.includes('\n') ? m : '|\n|'))
  }

  return s
}

/* ------------------------------------------------------------------ */

interface VerdictModalProps {
  data: GrantResponse
  onClose: () => void
  closeLabel: string
}

const markdownComponents = {
  h1: (props: React.ComponentPropsWithoutRef<'h1'>) => (
    <h1 className="text-2xl font-bold text-white mt-2 mb-4" {...props} />
  ),
  h2: (props: React.ComponentPropsWithoutRef<'h2'>) => (
    <h2 className="text-xl font-bold text-white mt-5 mb-3" {...props} />
  ),
  h3: (props: React.ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="text-lg font-bold text-white mt-4 mb-2" {...props} />
  ),
  h4: (props: React.ComponentPropsWithoutRef<'h4'>) => (
    <h4 className="text-base font-semibold text-white mt-3 mb-2" {...props} />
  ),
  p: (props: React.ComponentPropsWithoutRef<'p'>) => (
    <p className="text-slate-300 leading-relaxed mb-3" {...props} />
  ),
  strong: (props: React.ComponentPropsWithoutRef<'strong'>) => (
    <strong className="text-white font-semibold" {...props} />
  ),
  em: (props: React.ComponentPropsWithoutRef<'em'>) => (
    <em className="italic" {...props} />
  ),
  a: (props: React.ComponentPropsWithoutRef<'a'>) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="text-coffee underline hover:text-coffee/80"
      {...props}
    />
  ),
  ul: (props: React.ComponentPropsWithoutRef<'ul'>) => (
    <ul className="list-disc pl-6 mb-4 space-y-1.5 text-slate-300 marker:text-coffee" {...props} />
  ),
  ol: (props: React.ComponentPropsWithoutRef<'ol'>) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-slate-300 marker:text-coffee" {...props} />
  ),
  li: (props: React.ComponentPropsWithoutRef<'li'>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="border-l-2 border-coffee/60 pl-4 italic text-slate-400 my-3"
      {...props}
    />
  ),
  hr: (props: React.ComponentPropsWithoutRef<'hr'>) => (
    <hr className="border-slate-700 my-5" {...props} />
  ),
  code: ({ className, children, ...props }: React.ComponentPropsWithoutRef<'code'>) => {
    // remark-gfm passes inline vs block via className presence (lang-*)
    const isBlock = typeof className === 'string' && /language-/.test(className)
    if (isBlock) {
      return (
        <pre className="bg-slate-800 text-slate-200 rounded-xl p-4 overflow-x-auto my-4 text-[13px] font-mono">
          <code className={className} {...props}>{children}</code>
        </pre>
      )
    }
    return (
      <code className="bg-slate-800 text-coffee px-1.5 py-0.5 rounded text-[0.85em] font-mono">
        {children}
      </code>
    )
  },
  table: (props: React.ComponentPropsWithoutRef<'table'>) => (
    <div className="overflow-x-auto my-5 rounded-xl border border-slate-700">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  thead: (props: React.ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-slate-800/60" {...props} />
  ),
  tr: (props: React.ComponentPropsWithoutRef<'tr'>) => (
    <tr className="border-t border-slate-800 even:bg-slate-900/40" {...props} />
  ),
  th: (props: React.ComponentPropsWithoutRef<'th'>) => (
    <th
      className="text-left px-3 py-2 text-white font-semibold border-b border-slate-700 whitespace-nowrap"
      {...props}
    />
  ),
  td: (props: React.ComponentPropsWithoutRef<'td'>) => (
    <td className="px-3 py-2 text-slate-300 align-top" {...props} />
  ),
}

function VerdictModal({ data, onClose, closeLabel }: VerdictModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  const cleaned = useMemo(
    () => normalizeMarkdown(data.verdict_markdown || ''),
    [data.verdict_markdown],
  )

  const components = {
  code: ({node, inline, ...props}) =>
    inline
      ? <code style={{background: '#f4f4f4'}} {...props} />
      : <pre><code {...props} /></pre>,
};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight break-words">
              {data.company_name}
            </h2>
            <div className="text-xs text-slate-500 font-mono mt-1 flex items-center gap-2 flex-wrap">
              <span>{data.reg_code}</span>
              {data.source_url && (
                <>
                  <span>·</span>
                  <a href={data.source_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-coffee underline">
                    Inforegister
                  </a>
                </>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors flex-shrink-0"
            aria-label={closeLabel}
          >
            <X size={22} />
          </button>
        </div>
        <div className="text-slate-300 text-sm sm:text-[15px]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={markdownComponents}

          >
            {cleaned}
          </ReactMarkdown>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */

export function GrantChecker() {
  const { t, i18n } = useTranslation()

  const [value, setValue] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [cache, setCache] = useState<CacheMap>(() => loadCache())
  const [openKey, setOpenKey] = useState<string | null>(null)

  // The order in which we checked things this session, newest first
  const [order, setOrder] = useState<string[]>(() => Object.keys(loadCache()))

  const apiLanguage: ApiLang = resolveApiLang(i18n.language)

  const handleCheck = useCallback(async () => {
    const trimmed = value.trim()
    if (!trimmed) {
      setErrorMsg(t('grantCheck.errorBadInput'))
      setStatus('error')
      return
    }

    // If user typed an 8-digit reg-code we already have cached for the
    // current language, just open it without re-fetching.
    const maybeRegCode = trimmed.match(/^\d{8}$/) ? trimmed : null
    if (maybeRegCode) {
      const key = buildCacheKey(maybeRegCode, apiLanguage)
      if (cache[key]) {
        setOpenKey(key)
        setStatus('idle')
        setErrorMsg(null)
        setValue('')
        return
      }
    }

    setStatus('loading')
    setErrorMsg(null)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: trimmed, language: apiLanguage }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as GrantResponse
      if (!data || !data.reg_code || !data.verdict_markdown) {
        throw new Error('Bad response shape')
      }

      const stored: GrantResponse = { ...data, language: apiLanguage }
      const key = buildCacheKey(stored.reg_code, apiLanguage)
      setCache(prev => {
        const next = { ...prev, [key]: stored }
        saveCache(next)
        return next
      })
      setOrder(prev => [key, ...prev.filter(k => k !== key)])
      setOpenKey(key)
      setStatus('idle')
      setValue('')
    } catch (err) {
      console.error('Grant check failed:', err)
      setErrorMsg(t('grantCheck.errorGeneric'))
      setStatus('error')
    }
  }, [value, apiLanguage, t, cache])

  const openCached = (key: string) => setOpenKey(key)
  const closeModal = () => setOpenKey(null)

  const loading = status === 'loading'
  const active = openKey ? cache[openKey] : null

  // Show only pills that match the current UI language. Items checked in
  // another language are still in cache and will reappear if the user
  // switches back.
  const visibleOrder = order.filter(k => {
    const item = cache[k]
    return item && (item.language || 'en') === apiLanguage
  })

  return (
    <Section id="grant-check">
      <SectionHeader title={t('grantCheck.title')} sub={t('grantCheck.sub')} />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-2xl mx-auto"
      >
        <form
          onSubmit={e => { e.preventDefault(); if (!loading) handleCheck() }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <input
              type="number"
              value={value}
              onChange={e => { setValue(e.target.value); if (status === 'error') { setStatus('idle'); setErrorMsg(null) } }}
              disabled={loading}
              placeholder={t('grantCheck.placeholder')}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pl-10 text-white placeholder-slate-500 focus:outline-none focus:border-coffee transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label={t('grantCheck.placeholder')}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              {loading
                ? <Loader2 size={16} className="animate-spin text-coffee" />
                : <Search size={16} />}
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-coffee hover:bg-coffee/80 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {loading
              ? <><Loader2 size={16} className="animate-spin" />{t('grantCheck.checking')}</>
              : <>{t('grantCheck.submit')}</>}
          </button>
        </form>

        <div
          className={`mt-3 flex items-start gap-2 text-xs ${
            loading ? 'text-coffee' : 'text-slate-500'
          } transition-colors`}
        >
          <Clock size={14} className="flex-shrink-0 mt-0.5" />
          <span>{t('grantCheck.takesAFewMinutes')}</span>
        </div>

        {errorMsg && (
          <div className="mt-3 flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle size={15} className="flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {visibleOrder.length > 0 && (
          <div className="mt-5">
            <div className="text-xs text-slate-500 font-mono uppercase tracking-wide mb-2">
              {t('grantCheck.checkedLabel')}
            </div>
            <div className="flex flex-wrap gap-2">
              {visibleOrder.map(key => {
                const item = cache[key]
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => openCached(key)}
                    className="group inline-flex items-center gap-2 bg-sage-green/10 hover:bg-sage-green/20 border border-sage-green/40 hover:border-sage-green/60 text-slate-200 hover:text-white text-sm rounded-full pl-2.5 pr-3.5 py-1.5 transition-colors"
                    title={item.reg_code}
                  >
                    <CheckCircle2 size={14} className="text-sage-green flex-shrink-0" />
                    <span className="truncate max-w-[14rem] sm:max-w-[20rem]">
                      {item.company_name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-slate-800">
          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.15em] text-center mb-4">
            {t('grantCheck.poweredBy')}
          </div>
          <div className="flex items-center justify-center gap-x-8 gap-y-4 flex-wrap text-slate-400">
            <a
              href="https://eis.ee/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-coffee transition-colors"
              aria-label="EIS"
              title="Ettevõtluse ja Innovatsiooni Sihtasutus"
            >
              <EISLogo className="h-7 w-auto" />
            </a>
            <a
              href="https://aire-edih.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-coffee transition-colors"
              aria-label="AIRE"
              title="AI & Robotics Estonia"
            >
              <span className="text-lg font-extrabold tracking-tight">AIRE</span>
              <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-slate-500">
                AI &amp; Robotics&nbsp;Estonia
              </span>
            </a>
            <a
              href="https://riigiteataja.ee/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-coffee transition-colors"
              aria-label="RTE"
              title="Riigi Teataja"
            >
              <span className="text-lg font-extrabold tracking-tight">RTE</span>
              <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-slate-500">
                Riigi&nbsp;Teataja
              </span>
            </a>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-6 text-center font-mono">
          {t('grantCheck.disclaimer')}
        </p>
      </motion.div>

      <AnimatePresence>
        {active && (
          <VerdictModal
            data={active}
            onClose={closeModal}
            closeLabel={t('grantCheck.modalClose')}
          />
        )}
      </AnimatePresence>
    </Section>
  )
}

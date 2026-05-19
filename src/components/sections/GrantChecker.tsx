import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Search, CheckCircle2, X, AlertCircle, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
/* Tiny markdown → HTML renderer (safe: escapes raw HTML, then formats) */
/* ------------------------------------------------------------------ */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderInline(s: string): string {
  // already-escaped input
  // links [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, url) => {
    const safeUrl = /^(https?:|mailto:|#)/i.test(url) ? url : '#'
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="text-coffee underline hover:text-coffee/80">${text}</a>`
  })
  // bold **x** or __x__
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
  s = s.replace(/__([^_]+)__/g, '<strong class="text-white font-semibold">$1</strong>')
  // italic *x* or _x_
  s = s.replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>')
  s = s.replace(/(^|[\s(])_([^_\n]+)_/g, '$1<em>$2</em>')
  // inline code `x`
  s = s.replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-coffee px-1.5 py-0.5 rounded text-[0.85em] font-mono">$1</code>')
  return s
}

function markdownToHtml(md: string): string {
  // Pre-process step 1: the API sometimes returns the markdown with JSON-style
  // escape sequences still literal in the string (e.g. \\n instead of an actual
  // newline, \\" instead of a quote). Detect that case and unescape, but only
  // for the common JSON escapes — we don't want to mangle legitimate backslashes.
  let pre = md
  // unescape \\\\ last so the others don't double-process it
  pre = pre.replace(/\\r\\n/g, '\n')
  pre = pre.replace(/\\n/g, '\n')
  pre = pre.replace(/\\r/g, '\n')
  pre = pre.replace(/\\t/g, '\t')
  pre = pre.replace(/\\"/g, '"')
  pre = pre.replace(/\\'/g, "'")
  pre = pre.replace(/\\\\/g, '\\')

  // Normalize CRLF that may now exist as real characters.
  pre = pre.replace(/\r\n/g, '\n')

  // Pre-process step 2: handle the case where an entire markdown table got
  // flattened onto a single line. Insert newlines before each new row by
  // detecting the ` | |` pattern (closing pipe of one row immediately followed
  // by opening pipe of the next row, separated by whitespace).
  pre = pre.replace(/\|\s+\|/g, (m) => (m.includes('\n') ? m : '|\n|'))

  const escaped = escapeHtml(pre)
  const lines = escaped.split('\n')

  let html = ''
  let inUl = false
  let inOl = false
  let paraBuf: string[] = []

  const flushPara = () => {
    if (paraBuf.length) {
      const joined = paraBuf.join(' ')
      html += `<p class="text-slate-300 leading-relaxed mb-3">${renderInline(joined)}</p>`
      paraBuf = []
    }
  }
  const closeLists = () => {
    if (inUl) { html += '</ul>'; inUl = false }
    if (inOl) { html += '</ol>'; inOl = false }
  }

  const isTableRow = (s: string) => /^\s*\|.*\|\s*$/.test(s)
  const splitRow = (s: string): string[] => {
    let row = s.trim()
    if (row.startsWith('|')) row = row.slice(1)
    if (row.endsWith('|')) row = row.slice(0, -1)
    return row.split('|').map(c => c.trim())
  }
  const isSeparatorRow = (s: string): boolean => {
    if (!isTableRow(s)) return false
    return splitRow(s).every(c => /^:?-{2,}:?$/.test(c))
  }
  const parseAlignments = (s: string): ('left' | 'right' | 'center' | null)[] => {
    return splitRow(s).map(c => {
      const left = c.startsWith(':')
      const right = c.endsWith(':')
      if (left && right) return 'center'
      if (right) return 'right'
      if (left) return 'left'
      return null
    })
  }

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    const line = raw.trimEnd()

    // Detect markdown table: header row + separator row
    if (
      isTableRow(line) &&
      i + 1 < lines.length &&
      isSeparatorRow(lines[i + 1])
    ) {
      flushPara(); closeLists()
      const headers = splitRow(line)
      const aligns = parseAlignments(lines[i + 1])
      i += 2
      const rows: string[][] = []
      while (i < lines.length && isTableRow(lines[i])) {
        rows.push(splitRow(lines[i]))
        i++
      }
      i-- // back off so outer loop's i++ lands on the next non-table line

      const alignClass = (idx: number) => {
        const a = aligns[idx]
        if (a === 'right') return 'text-right'
        if (a === 'center') return 'text-center'
        return 'text-left'
      }

      html += '<div class="overflow-x-auto my-5 rounded-xl border border-slate-700">'
      html += '<table class="w-full text-sm border-collapse">'
      html += '<thead class="bg-slate-800/60"><tr>'
      headers.forEach((h, hi) => {
        html += `<th class="${alignClass(hi)} px-3 py-2 text-white font-semibold border-b border-slate-700 whitespace-nowrap">${renderInline(h)}</th>`
      })
      html += '</tr></thead><tbody>'
      rows.forEach((r, ri) => {
        const zebra = ri % 2 === 1 ? 'bg-slate-900/40' : ''
        html += `<tr class="${zebra} border-t border-slate-800">`
        r.forEach((c, ci) => {
          html += `<td class="${alignClass(ci)} px-3 py-2 text-slate-300 align-top">${renderInline(c)}</td>`
        })
        html += '</tr>'
      })
      html += '</tbody></table></div>'
      continue
    }

    if (!line.trim()) {
      flushPara()
      closeLists()
      continue
    }

    // headings
    const h = line.match(/^(#{1,6})\s+(.*)$/)
    if (h) {
      flushPara(); closeLists()
      const level = h[1].length
      const sizes: Record<number, string> = {
        1: 'text-2xl font-bold text-white mt-2 mb-4',
        2: 'text-xl font-bold text-white mt-5 mb-3',
        3: 'text-lg font-bold text-white mt-4 mb-2',
        4: 'text-base font-semibold text-white mt-3 mb-2',
        5: 'text-sm font-semibold text-white mt-3 mb-2 uppercase tracking-wide',
        6: 'text-xs font-semibold text-slate-300 mt-3 mb-2 uppercase tracking-wide',
      }
      html += `<h${level} class="${sizes[level]}">${renderInline(h[2])}</h${level}>`
      continue
    }

    // horizontal rule
    if (/^(-{3,}|_{3,}|\*{3,})$/.test(line.trim())) {
      flushPara(); closeLists()
      html += '<hr class="border-slate-700 my-5" />'
      continue
    }

    // blockquote
    if (/^>\s?/.test(line)) {
      flushPara(); closeLists()
      const inner = renderInline(line.replace(/^>\s?/, ''))
      html += `<blockquote class="border-l-2 border-coffee/60 pl-4 italic text-slate-400 my-3">${inner}</blockquote>`
      continue
    }

    // unordered list
    const ul = line.match(/^\s*[-*+]\s+(.*)$/)
    if (ul) {
      flushPara()
      if (inOl) { html += '</ol>'; inOl = false }
      if (!inUl) { html += '<ul class="list-disc pl-6 mb-4 space-y-1.5 text-slate-300 marker:text-coffee">'; inUl = true }
      html += `<li class="leading-relaxed">${renderInline(ul[1])}</li>`
      continue
    }

    // ordered list
    const ol = line.match(/^\s*\d+\.\s+(.*)$/)
    if (ol) {
      flushPara()
      if (inUl) { html += '</ul>'; inUl = false }
      if (!inOl) { html += '<ol class="list-decimal pl-6 mb-4 space-y-1.5 text-slate-300 marker:text-coffee">'; inOl = true }
      html += `<li class="leading-relaxed">${renderInline(ol[1])}</li>`
      continue
    }

    // paragraph buffer
    closeLists()
    paraBuf.push(line)
  }

  flushPara()
  closeLists()
  return html
}

/* ------------------------------------------------------------------ */

interface VerdictModalProps {
  data: GrantResponse
  onClose: () => void
  closeLabel: string
}

function VerdictModal({ data, onClose, closeLabel }: VerdictModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  const html = useMemo(() => markdownToHtml(data.verdict_markdown || ''), [data.verdict_markdown])

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
        <div
          className="text-slate-300 text-sm sm:text-[15px]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
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
              type="text"
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

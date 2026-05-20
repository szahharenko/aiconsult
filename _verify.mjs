function normalizeMarkdown(md) {
  let s = md.trim()
  if (s.length >= 2 && s.startsWith('"') && s.endsWith('"')) s = s.slice(1, -1)
  s = s.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\r/g, '\n')
       .replace(/\\t/g, '\t').replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\')
       .replace(/\r\n/g, '\n').trim()
  const codeLangs = /^(json|js|ts|tsx|jsx|javascript|typescript|py|python|sh|bash|shell|zsh|yaml|yml|sql|html|css|scss|c|cpp|java|rust|go|php|rb|ruby|toml|ini|dockerfile|diff|xml)$/
  const openFence = s.match(/^(`{3,}|~{3,})([^\n]*)\n/)
  if (openFence) {
    const info = (openFence[2] || '').trim().toLowerCase()
    if (!codeLangs.test(info)) {
      const afterOpen = s.slice(openFence[0].length)
      const fenceChar = openFence[1][0]
      const closeRe = new RegExp('\\n(' + (fenceChar === '`' ? '`' : '~') + '{3,})\\s*$')
      const tail = afterOpen.match(closeRe)
      if (tail && typeof tail.index === 'number') s = afterOpen.slice(0, tail.index)
      else {
        const lastIdx = afterOpen.lastIndexOf(openFence[1])
        if (lastIdx !== -1) s = (afterOpen.slice(0, lastIdx) + afterOpen.slice(lastIdx + openFence[1].length)).trim()
        else s = afterOpen
      }
      s = s.trim()
    }
  }
  s = s.replace(
    /(^|\n)(`{3,}|~{3,})([^\n]*)\n([\s\S]*?)\n\2(?=\n|$)/g,
    (full, lead, _f, info, body) => {
      const infoStr = (info || '').trim().toLowerCase()
      const isMd = infoStr === '' || infoStr === 'markdown' || infoStr === 'md' || infoStr === 'text'
      return isMd ? `${lead}\n${body.trim()}\n` : full
    },
  )
  if (s.includes('|') && !s.includes('\n|')) {
    s = s.replace(/\|\s+\|/g, (m) => m.includes('\n') ? m : '|\n|')
  }
  return s
}

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

// Realistic recreation of the user's screenshot — whole response wrapped
// in a single fence with no language tag.
const realistic =
  '```\n' +
  '🏢 KEELEKESKUS GAME OÜ (12345678)\n' +
  'Сектор: 85599 — Прочие учебные\n\n' +
  'Участие в госзакупках: множественное (мосты, дорожное обслуживание)\n\n' +
  '📋 Оценка соответствия программам\n\n' +
  '| Программа | Статус | Причина |\n' +
  '|---|---|---|\n' +
  '| AIRE Services (бесплатно) | ✅ | МСП: 12 сотрудников, оборот €1,5M ≤ €50M, активен |\n' +
  '| AIRE Demo Project (до €60K) | ⚠️ | Формально соответствует как МСП. |\n' +
  '| RTE Software Grant (€2-5K) | ✅ | Средний оборот за 2 ФГ €1 555 921 >> €50K. |\n\n' +
  '🥇 Лучший вариант прямо сейчас:\n' +
  '1. **Digitaliseerimise teekaart (до €10K)** → софинансирование клиента 30-50%\n' +
  '2. **Digital Transformation (до €35K)** → следующий шаг после teekaart.\n' +
  '3. **RTE BPA Grant** → автоматизация бизнес-процессов\n' +
  '```'

const cleaned = normalizeMarkdown(realistic)
const html = ReactDOMServer.renderToStaticMarkup(
  React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm, remarkBreaks] }, cleaned),
)
console.log('CLEANED:')
console.log(cleaned)
console.log()
console.log('HAS <table>:', html.includes('<table>'))
console.log('HAS <pre><code>:', html.includes('<pre><code>'))
console.log('HAS <strong>:', html.includes('<strong>'))
console.log('HAS <ol>:', html.includes('<ol>'))

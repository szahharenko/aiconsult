// Mirror of normalizeMarkdown to verify the fence-strip logic.
function normalizeMarkdown(md) {
  let s = md.trim()
  if (s.length >= 2 && s.startsWith('"') && s.endsWith('"')) s = s.slice(1, -1)
  s = s.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\r/g, '\n')
       .replace(/\\t/g, '\t').replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\')
       .replace(/\r\n/g, '\n').trim()

  const fenceMatch = s.match(/^(```+|~~~+)([^\n]*)\n([\s\S]*?)\n\1\s*$/)
  if (fenceMatch) {
    const info = (fenceMatch[2] || '').trim().toLowerCase()
    const looksLikeCode = /^(json|js|ts|tsx|jsx|javascript|typescript|py|python|sh|bash|shell|yaml|yml|sql|html|css|scss|c|cpp|java|rust|go|php|rb|ruby|toml|ini|dockerfile|diff)$/.test(info)
    if (!looksLikeCode) s = fenceMatch[3]
  }

  s = s.replace(
    /(^|\n)(```+|~~~+)([^\n]*)\n([\s\S]*?)\n\2(?=\n|$)/g,
    (full, lead, _f, info, body) => {
      const bt = body.trim()
      const f = bt.split('\n')[0] || ''
      const sec = bt.split('\n')[1] || ''
      const looksLikeTable =
        /^\s*\|.*\|\s*$/.test(f) &&
        /^\s*\|?[\s:|-]+\|?\s*$/.test(sec) &&
        /[-]/.test(sec)
      const infoStr = (info || '').trim().toLowerCase()
      const isMdInfo = infoStr === '' || infoStr === 'markdown' || infoStr === 'md' || infoStr === 'text'
      return (looksLikeTable && isMdInfo) ? `${lead}\n${bt}\n` : full
    },
  )

  if (s.includes('|') && !s.includes('\n|')) {
    s = s.replace(/\|\s+\|/g, (m) => (m.includes('\n') ? m : '|\n|'))
  }
  return s
}

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

const cases = {
  // outer fence around the whole verdict
  outerFence: '```\nintro\n\n| Программа | Статус |\n|---|---|\n| AIRE | OK |\n```',
  // inner fence around just the table
  innerFence: 'intro\n\n```\n| Программа | Статус |\n|---|---|\n| AIRE | OK |\n```\n\nend',
  // outer fence with "markdown" tag
  outerMdFence: '```markdown\n| A | B |\n|---|---|\n| 1 | 2 |\n```',
  // double-escaped json string
  doubleEsc: '"\\n🏢 SVARGA OÜ\\n\\n| Программа | Статус |\\n|---|---|\\n| AIRE | ✅ |"',
  // legit code block (should be preserved)
  legitCode: '```python\nprint("hello")\n```',
}

for (const [name, raw] of Object.entries(cases)) {
  const cleaned = normalizeMarkdown(raw)
  const out = ReactDOMServer.renderToStaticMarkup(
    React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm, remarkBreaks] }, cleaned),
  )
  console.log(`=== ${name} ===`)
  console.log('CLEANED:', JSON.stringify(cleaned))
  console.log('HTML:', out)
  console.log()
}

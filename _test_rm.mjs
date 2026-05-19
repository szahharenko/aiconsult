import React from 'react'
import ReactDOMServer from 'react-dom/server'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

// Case C: table inside fenced code block
const c = '```\n| Программа | Статус |\n|---|---|\n| a | b |\n```'

// Case D: table after multiple newlines (\n\n\n)
const d = 'intro\n\n\n| Программа | Статус |\n|---|---|\n| a | b |\n\nend'

// Case E: table with markdown line break in cell
const e = '| A | B |\n|---|---|\n| line1 line2 | b |'

for (const [name, md] of [['CODE_FENCE', c], ['MULTI_NL', d], ['NORMAL', e]]) {
  const out = ReactDOMServer.renderToStaticMarkup(
    React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm, remarkBreaks] }, md),
  )
  console.log('--- ' + name + ' ---')
  console.log(out)
  console.log()
}

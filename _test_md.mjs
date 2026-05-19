import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'

const md = `intro

| Программа | Статус | Причина |
|---|---|---|
| AIRE Services | ✅ | Eligible |
| RTE Grant | ❌ | Below |

end`

const tree = unified().use(remarkParse).use(remarkGfm).parse(md)
const hast = await unified().use(remarkParse).use(remarkGfm).use(remarkRehype).run(tree)

function dump(node, depth=0) {
  if (!node) return
  const ind = '  '.repeat(depth)
  console.log(ind + (node.tagName || node.type || node.value?.slice(0, 30)))
  if (node.children) node.children.forEach(c => dump(c, depth+1))
}
dump(hast)

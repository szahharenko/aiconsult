/**
 * Injects a JSON-LD <script> block into <head>.
 *
 * Each instance manages exactly one schema object (or array of them).
 * The script is identified by a stable key so the DOM stays clean across
 * re-renders and route transitions.
 */
import { useEffect } from 'react'

type Props = {
  /** Unique id within the page — e.g. 'business', 'faq', 'person'. */
  id: string
  data: object | object[]
}

export function JsonLd({ id, data }: Props) {
  useEffect(() => {
    const scriptId = `jsonld-${id}`
    let el = document.head.querySelector<HTMLScriptElement>(`script#${CSS.escape(scriptId)}`)
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      el.id = scriptId
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(data)

    return () => {
      el?.remove()
    }
  }, [id, data])

  return null
}

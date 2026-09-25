import React from 'react'

type Tone = 'paper' | 'sand' | 'ink'

export function Section({
  children,
  dark,
  tone,
  id,
  className = '',
}: {
  children: React.ReactNode
  /** Legacy flag - maps to the sand tone. */
  dark?: boolean
  tone?: Tone
  id?: string
  className?: string
}) {
  const t: Tone = tone ?? (dark ? 'sand' : 'paper')
  const bg = t === 'sand' ? 'bg-sand' : t === 'ink' ? 'bg-ink text-paper ink-scope' : ''
  return (
    <section id={id} className={`py-20 md:py-28 px-5 md:px-10 ${bg} ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  )
}

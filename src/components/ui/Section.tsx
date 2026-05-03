import React from 'react'

export function Section({ children, dark, id }: { children: React.ReactNode; dark?: boolean; id?: string }) {
  return (
    <section id={id} className={`py-16 px-6 ${dark ? 'bg-slate-900' : ''}`}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  )
}

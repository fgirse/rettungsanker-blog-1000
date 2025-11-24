'use client'
import Script from 'next/script'
import type { ReactNode } from 'react'

type ScriptDef = {
  id?: string
  src?: string
  inline?: string
  strategy?: 'afterInteractive' | 'beforeInteractive' | 'lazyOnload'
}

export default function ScriptLoader({
  scripts = [],
  children,
}: {
  scripts?: ScriptDef[]
  children?: ReactNode
}) {
  return (
    <>
      {scripts.map((s) => {
        const key = s.id ?? s.src ?? Math.random().toString(36).slice(2)
        if (s.src) {
          return <Script key={key} id={s.id} src={s.src} strategy={s.strategy ?? 'afterInteractive'} />
        }
        if (s.inline) {
          return (
            <Script
              key={key}
              id={s.id ?? key}
              strategy={s.strategy ?? 'afterInteractive'}
              dangerouslySetInnerHTML={{ __html: s.inline }}
            />
          )
        }
        return null
      })}
      {children}
    </>
  )
}
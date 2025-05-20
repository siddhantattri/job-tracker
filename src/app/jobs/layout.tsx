// src/app/jobs/layout.tsx
'use client'

import { Providers } from '../providers'

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>
}

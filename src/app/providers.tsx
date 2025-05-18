// src\app\providers.tsx
'use client'

import React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from '../theme'
import { JobsProvider } from '../context/JobsContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>

     <JobsProvider>
       <ThemeProvider theme={theme}>
         <CssBaseline />
         {children}
       
       </ThemeProvider>
     </JobsProvider>
    </AppRouterCacheProvider>

  )
}

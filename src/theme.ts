// src\theme.ts

'use client'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
      },
  
    typography: { fontFamily: 'var(--font-roboto)' },
  // your palette overrides here
})

export default theme

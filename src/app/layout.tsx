// src/app/layout.tsx
import '../globals.css'
import { Roboto } from 'next/font/google'




const roboto = Roboto({
  weight: ['300','400','500','700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata = { title: 'Job Tracker' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        {/* <Providers> */}
          {children}
        {/* </Providers> */}
      </body>
    </html>
  )
}



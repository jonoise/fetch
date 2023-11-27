import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fetch: APIs para Costa Rica',
  description:
    'Fetch es una plataforma que te ofrece múltiples endpoints para acceder a datos de Costa Rica.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>{children}</body>
      <Script
        async
        src='https://analytics.eu.umami.is/script.js'
        data-website-id='0fb98140-4a1c-4e3d-af73-e45a3dea2386'
      />
    </html>
  )
}

import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Lora } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { AppProviders } from '@/components/app-providers'
// import { SerwistProvider } from './serwist'

import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Weekly Meal Planner',
  description:
    'Generate random weekly meal plans with breakfast, lunch, and dinner recipes, plus personalized recommendations for your perfect week of cooking.',
  icons: {
    icon: '/favicon.ico',
    apple: '/images/icon-192x192.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#22C55E',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${plusJakartaSans.variable} ${lora.variable} antialiased min-h-screen relative selection:bg-primary/20 selection:text-primary`}
        >
          {/* <SerwistProvider disable={process.env.NODE_ENV === 'development'} swUrl="/serwist/sw.js"> */}
          <AppProviders>{children}</AppProviders>
          {/* </SerwistProvider> */}
        </body>
      </html>
    </ClerkProvider>
  )
}

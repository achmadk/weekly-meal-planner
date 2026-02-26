'use client'

import { ThemeProvider } from 'next-themes'
import { IncognitoWarning } from '@/components/incognito-warning'
import { UserProvider } from '@/contexts/user-context'
import { Toaster } from 'sonner'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <IncognitoWarning />
      <UserProvider>
        <div className="fixed inset-0 -z-50 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50 pointer-events-none" />
        {children}
        <Toaster />
      </UserProvider>
    </ThemeProvider>
  )
}

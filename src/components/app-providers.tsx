'use client'

import { ThemeProvider } from 'next-themes'
import { IncognitoWarning } from '@/components/incognito-warning'
import { UserProvider } from '@/contexts/user-context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
        <ToastContainer position="bottom-right" />
      </UserProvider>
    </ThemeProvider>
  )
}

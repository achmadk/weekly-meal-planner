'use client'

import { AlertTriangle, ShieldOff, ExternalLink } from 'lucide-react'
import { useIncognito } from '@/hooks/use-incognito'
import { Button } from '@/components/ui/button'

export function IncognitoWarning() {
  const { isPrivate, isLoading } = useIncognito()

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Checking browser...
        </div>
      </div>
    )
  }

  if (!isPrivate) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <ShieldOff className="w-10 h-10 text-amber-600 dark:text-amber-400" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">
          Incognito Mode Detected
        </h1>

        <p className="text-muted-foreground mb-6">
          You&apos;re browsing in private/incognito mode. You can&apos;t access the features.
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3 text-amber-800 dark:text-amber-200">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm text-left">
              Please use a regular browser window, and then log in with your gmail account.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

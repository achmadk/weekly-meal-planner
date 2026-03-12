'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isSignedIn, isLoaded, router])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isSignedIn) {
    return null
  }

  return children
}

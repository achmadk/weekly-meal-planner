'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useUser } from '@clerk/nextjs'

interface UserContextType {
  isSignedIn: boolean
  user: any | null
  userId: string | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const { isSignedIn: initialIsSignedIn = false, isLoaded, user } = useUser()

  const userId = user?.id ?? null;
  const isSignedIn = isLoaded && initialIsSignedIn

  return (
    <UserContext.Provider value={{ isSignedIn, user, userId }}>
      {children}
    </UserContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider')
  }
  return context
}

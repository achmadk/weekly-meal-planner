'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useClerk, useUser } from '@clerk/nextjs'

interface UserContextType {
  isSignedIn: boolean
  user: any | null
  userId: string | null
  signOut: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const { isSignedIn: initialIsSignedIn = false, isLoaded, user } = useUser()
  const clerk = useClerk()

  const userId = user?.id ?? null;
  const isSignedIn = isLoaded && initialIsSignedIn

  const signOut = async () => await clerk.signOut()

  return (
    <UserContext.Provider value={{ isSignedIn, user, userId, signOut }}>
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

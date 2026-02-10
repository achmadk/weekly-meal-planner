'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useUser } from '@clerk/nextjs'

interface UserContextType {
  isSignedIn: boolean
  isLoaded: boolean
  user: any | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded, user } = useUser()

  return (
    <UserContext.Provider value={{ isSignedIn, isLoaded, user }}>
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

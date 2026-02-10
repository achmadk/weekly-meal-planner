'use client'

import { UserButton, useUser, SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { LogIn, UserPlus } from 'lucide-react'

export function AuthButtons() {
  const { isSignedIn } = useUser()

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-4">
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-8 h-8',
            },
          }}
        />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <SignInButton mode="modal">
        <Button variant="ghost" size="sm">
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </Button>
      </SignInButton>
      <SignUpButton mode="modal">
        <Button size="sm">
          <UserPlus className="w-4 h-4 mr-2" />
          Sign Up
        </Button>
      </SignUpButton>
    </div>
  )
}

import { describe, it, expect, vi, beforeEach } from 'vite-plus/test'
import { render, screen } from '@testing-library/react'
import { AuthButtons } from './auth-buttons'
import { ReactNode } from 'react'

const mockUseUser = vi.fn()

vi.mock('@clerk/nextjs', () => ({
  useUser: () => mockUseUser(),
  UserButton: () => <div data-testid="user-button">UserButton</div>,
  SignInButton: ({ children }: { children: ReactNode }) => (
    <div data-testid="sign-in-button">{children}</div>
  ),
  SignUpButton: ({ children }: { children: ReactNode }) => (
    <div data-testid="sign-up-button">{children}</div>
  ),
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}))

describe('AuthButtons', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({ isSignedIn: false })
  })

  it('renders sign in and sign up buttons when not signed in', () => {
    render(<AuthButtons />)
    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })

  it('renders user button when signed in', () => {
    mockUseUser.mockReturnValue({ isSignedIn: true })
    render(<AuthButtons />)
    expect(screen.getByTestId('user-button')).toBeInTheDocument()
  })
})

import { describe, it, expect, vi, beforeEach } from 'vite-plus/test'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

vi.mock('@/contexts/user-context', () => ({
  useAuth: () => ({
    isSignedIn: false,
  }),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

vi.mock('@/components/auth/auth-buttons', () => ({
  AuthButtons: () => <div data-testid="auth-buttons">AuthButtons</div>,
}))

vi.mock('../navigation/Menu', () => ({
  NavigationMenu: () => <div data-testid="navigation-menu">NavigationMenu</div>,
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, disabled, onClick, ...props }: any) => (
    <button
      disabled={disabled}
      onClick={onClick}
      data-testid="button"
      {...props}
    >
      {children}
    </button>
  ),
}))

describe('Hero', () => {
  const defaultProps = {
    onGenerate: vi.fn(),
    isGenerating: false,
    count: 5,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the main heading', () => {
    render(<Hero {...defaultProps} />)
    expect(screen.getByText('Weekly Meal')).toBeInTheDocument()
    expect(screen.getByText('Planner')).toBeInTheDocument()
  })

  it('renders the generate button when count > 0', () => {
    render(<Hero {...defaultProps} />)
    expect(screen.getByText('Generate Plan')).toBeInTheDocument()
  })

  it('renders login button when count is 0', () => {
    render(<Hero {...defaultProps} count={0} />)
    expect(screen.getByText('Login for Extra Generations')).toBeInTheDocument()
  })

  it('shows remaining generations count', () => {
    render(<Hero {...defaultProps} count={3} />)
    expect(screen.getByText('3 generation left')).toBeInTheDocument()
  })

  it('calls onGenerate when button is clicked', () => {
    const onGenerate = vi.fn()
    render(<Hero {...defaultProps} onGenerate={onGenerate} />)

    const button = screen.getByText('Generate Plan')
    button.click()

    expect(onGenerate).toHaveBeenCalled()
  })

  it('renders stats section', () => {
    render(<Hero {...defaultProps} />)
    expect(screen.getByText('Meals')).toBeInTheDocument()
    expect(screen.getByText('Recipes')).toBeInTheDocument()
    expect(screen.getByText('Combos')).toBeInTheDocument()
  })

  it('disables button when generating', () => {
    render(<Hero {...defaultProps} isGenerating={true} />)
    expect(screen.getByText('Generating...')).toBeInTheDocument()
  })
})

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/contexts/user-context'

const navLinks = [
  { href: '/support', label: 'Support' },
  { href: '/donate', label: 'Donate' },
]

const dashboardLink = { href: '/dashboard', label: 'Dashboard' }

function NavLink({
  href,
  children,
  isActive,
}: {
  href: string
  children: React.ReactNode
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors ${
        isActive
          ? 'text-foreground'
          : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  children,
  isActive,
  onClick,
}: {
  href: string
  children: React.ReactNode
  isActive: boolean
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      className={`block px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? 'text-foreground bg-muted/50'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

export function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { isSignedIn } = useAuth()
  const pathname = usePathname()

  const toggleOpen = () =>
    setIsOpen((isOpen) => {
      return !isOpen
    })

  return (
    <div className="absolute top-4 left-4 md:top-6 md:left-6 z-30">
      <div className="flex items-center gap-2 md:gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/icon-32x32.png"
            alt="Weekly Meal Planner"
            className="w-8 h-8 rounded-lg"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {isSignedIn && (
            <NavLink
              href={dashboardLink.href}
              isActive={pathname === dashboardLink.href}
            >
              {dashboardLink.label}
            </NavLink>
          )}
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              isActive={pathname === link.href}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Hamburger Button - hidden when menu is open */}
        {!isOpen && (
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={toggleOpen}
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-40 bg-background border border-border rounded-lg shadow-lg py-2 md:hidden">
          <div className="flex justify-end px-2">
            <button
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              onClick={toggleOpen}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          {isSignedIn && (
            <MobileNavLink
              href={dashboardLink.href}
              isActive={pathname === dashboardLink.href}
              onClick={toggleOpen}
            >
              {dashboardLink.label}
            </MobileNavLink>
          )}
          {navLinks.map((link) => (
            <MobileNavLink
              key={link.href}
              href={link.href}
              isActive={pathname === link.href}
              onClick={toggleOpen}
            >
              {link.label}
            </MobileNavLink>
          ))}
        </div>
      )}
    </div>
  )
}

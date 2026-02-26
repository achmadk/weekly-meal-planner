'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/contexts/user-context'

const navLinks = [
  { href: '/support', label: 'Support' },
  { href: '/donate', label: 'Donate' },
]

const dashboardLink = { href: '/dashboard', label: 'Dashboard' }

export function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { isSignedIn } = useAuth()

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
            <Link
              href={dashboardLink.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {dashboardLink.label}
            </Link>
          )}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
          onClick={toggleOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-40 bg-background border border-border rounded-lg shadow-lg py-2 md:hidden">
          {isSignedIn && (
            <Link
              href={dashboardLink.href}
              className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              onClick={toggleOpen}
            >
              {dashboardLink.label}
            </Link>
          )}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              onClick={toggleOpen}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

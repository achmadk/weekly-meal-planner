'use client'

import Link from 'next/link'
import { Heart, Coffee, Utensils, Star } from 'lucide-react'
import { NavigationMenu } from '@/components/navigation/Menu'
import { useAuth } from '@/contexts/user-context'

export default function DonatePageClient() {
  const { isSignedIn, isLoaded } = useAuth()

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background/80 pointer-events-none" />

        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 right-20 w-[30rem] h-[30rem] rounded-full bg-secondary/15 blur-3xl" />

        {/* Navigation Links */}
        <NavigationMenu />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Support Us
          </h1>
          <p className="text-xl text-muted-foreground">
            Help keep Weekly Meal Planner free for everyone!
          </p>
        </div>
      </section>

      {/* Donate Options */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className={`grid gap-6 mb-12 ${isLoaded && isSignedIn ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            <div className="p-8 rounded-2xl border border-border bg-card text-center">
              <Coffee className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Buy us a coffee</h3>
              <p className="text-muted-foreground mb-4">$5</p>
              <p className="text-sm text-muted-foreground">
                A small tip to fuel our late-night coding sessions
              </p>
            </div>

            <div className="p-8 rounded-2xl border-2 border-primary bg-card text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                Popular
              </div>
              <Utensils className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Meal sponsor</h3>
              <p className="text-muted-foreground mb-4">$15</p>
              <p className="text-sm text-muted-foreground">
                Help us keep the servers running for a month
              </p>
            </div>

            {isLoaded && isSignedIn && (
              <div className="p-8 rounded-2xl border border-border bg-card text-center">
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Premium supporter
                </h3>
                <p className="text-muted-foreground mb-4">$30</p>
                <p className="text-sm text-muted-foreground">
                  Get exclusive features and early access to new tools
                </p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link
              href="https://ko-fi.com/weeklymealplanner"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-8 py-4 bg-[#29ade0] text-white font-semibold rounded-xl hover:bg-[#1e9ace] transition-colors text-lg">
                Donate via Ko-fi
              </button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              We also accept Bitcoin:{' '}
              <code className="bg-muted px-2 py-1 rounded">
                bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
              </code>
            </p>
          </div>
        </div>
      </section>

      {/* Why Donate */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Donate?</h2>

          <div className="space-y-8">
            <div className="flex gap-4">
              <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Keep it free</h3>
                <p className="text-muted-foreground">
                  Weekly Meal Planner is and always will be free to use. Your
                  donations help us maintain the service without charging users.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Cover operational costs
                </h3>
                <p className="text-muted-foreground">
                  Hosting, APIs, and development tools all cost money. Your
                  support helps cover these expenses.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Support independent development
                </h3>
                <p className="text-muted-foreground">
                  This is an independent project built with passion. Your
                  donations directly support continued development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Thank you for your support!
          </h2>
          <p className="text-muted-foreground">
            Every donation, no matter the size, helps us keep building this tool
            for food lovers everywhere. 💜
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for food lovers everywhere
          </p>
        </div>
      </footer>
    </div>
  )
}

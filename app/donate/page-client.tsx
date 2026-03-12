'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { NavigationMenu } from '@/components/navigation/Menu'
import { Footer } from '@/components/footer'

export default function DonatePageClient() {
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
          <div className="text-center mb-8">
            <p className="text-xl text-muted-foreground">
              You can donate to us starts from{' '}
              <span className="text-2xl font-bold text-primary">IDR 20K</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Every donation helps keep this service free for everyone
            </p>
          </div>

          <div className="text-center">
            <Link
              href="https://trakteer.id/achmad-kurnianto-rxbtv/tip"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity text-lg cursor-pointer">
                Donate
              </button>
            </Link>
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
      <Footer />
    </div>
  )
}

import { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { NavigationMenu } from '@/components/navigation/Menu'

import { Footer } from '@/components/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Support - Weekly Meal Planner',
  description: 'Get help and support for Weekly Meal Planner',
}

function Github({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export default function SupportPage() {
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
            Get Support
          </h1>
          <p className="text-xl text-muted-foreground">
            We&apos;re here to help! Choose your preferred way to reach us.
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="mailto:me@achmadk.com" className="block">
              <div className="p-8 rounded-2xl border border-border bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                <Mail className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                <p className="text-muted-foreground">
                  Send us an email and we&apos;ll get back to you within 24-48
                  hours.
                </p>
              </div>
            </Link>

            {/* <Link
              href="https://discord.gg/weeklymealplanner"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="p-8 rounded-2xl border border-border bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                <MessageCircle className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Join Discord</h3>
                <p className="text-muted-foreground">
                  Connect with our community on Discord for real-time support.
                </p>
              </div>
            </Link> */}

            <Link
              href="https://github.com/achmadk/weekly-meal-planner/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="p-8 rounded-2xl border border-border bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                <Github className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">GitHub Issues</h3>
                <p className="text-muted-foreground">
                  Report bugs or request features on our GitHub repository.
                </p>
              </div>
            </Link>

            {/* <Link
              href="https://docs.weeklymealplanner.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="p-8 rounded-2xl border border-border bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                <BookOpen className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Documentation</h3>
                <p className="text-muted-foreground">
                  Check our docs for guides, tutorials, and FAQs.
                </p>
              </div>
            </Link> */}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Is Weekly Meal Planner free to use?
              </h3>
              <p className="text-muted-foreground">
                Yes! Weekly Meal Planner is completely free to use. We offer
                optional donations to help support the project.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                How does the meal generator work?
              </h3>
              <p className="text-muted-foreground">
                Our AI-powered generator creates personalized weekly meal plans
                based on your preferences and dietary restrictions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Can I save my meal plans?
              </h3>
              <p className="text-muted-foreground">
                Yes! Create an account to save and manage your meal plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

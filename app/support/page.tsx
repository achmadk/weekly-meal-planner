import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail, MessageCircle, Github, BookOpen } from 'lucide-react'
import { NavigationMenu } from '@/components/navigation/Menu'

export const metadata: Metadata = {
  title: 'Support - Weekly Meal Planner',
  description: 'Get help and support for Weekly Meal Planner',
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
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="mailto:support@weeklymealplanner.app" className="block">
              <div className="p-8 rounded-2xl border border-border bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                <Mail className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                <p className="text-muted-foreground">
                  Send us an email and we&apos;ll get back to you within 24-48
                  hours.
                </p>
              </div>
            </Link>

            <Link
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
            </Link>

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

            <Link
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
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 border-t border-border">
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

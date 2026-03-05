import { Metadata } from 'next'
import { NavigationMenu } from '@/components/navigation/Menu'

export const metadata: Metadata = {
  title: 'Terms of Service - Weekly Meal Planner',
  description:
    'Terms of Service for Weekly Meal Planner - Read our terms and conditions.',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-transparent">
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background/80 pointer-events-none" />
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 right-20 w-[30rem] h-[30rem] rounded-full bg-secondary/15 blur-3xl" />
        <NavigationMenu />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-20">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground">
            Please read our terms carefully
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-muted-foreground">Last updated: March 5, 2026</p>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using Weekly Meal Planner (&quot;the
              Service&quot;), you accept and agree to be bound by the terms and
              provision of this agreement.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Weekly Meal Planner is a web application that generates AI-powered
              weekly meal plans, including breakfast, lunch, and dinner recipes
              based on user preferences.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed">
              To use the Service, you must create an account using Google OAuth.
              You are responsible for maintaining the confidentiality of your
              account and password.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">User Conduct</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
              <li>Use the Service for any unlawful purpose</li>
              <li>
                Attempt to gain unauthorized access to any part of the Service
              </li>
              <li>Interfere with the proper operation of the Service</li>
              <li>Generate harmful, inappropriate, or offensive content</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service and its original content, features, and functionality
              are owned by Weekly Meal Planner and are protected by
              international copyright, trademark, patent, trade secret, and
              other intellectual property laws.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">User-Generated Content</h2>
            <p className="text-muted-foreground leading-relaxed">
              You retain ownership of any content you create or save within the
              Service, including meal plans and recipes. By using the Service,
              you grant us a license to use this content to provide and improve
              our services.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service is provided &quot;as is&quot; without warranty of any
              kind, either express or implied, including, but not limited to,
              the implied warranties of merchantability, fitness for a
              particular purpose, or non-infringement.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall Weekly Meal Planner be liable for any indirect,
              incidental, special, consequential, or punitive damages, including
              without limitation, loss of profits, data, use, goodwill, or other
              intangible losses.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. We will
              provide notice of any material changes by posting the new Terms of
              Service on this page.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason, including breach of
              these Terms of Service.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed and construed in accordance with the
              laws of the jurisdiction in which our company operates, without
              regard to its conflict of law provisions.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please
              contact us at: <strong>support@weeklymealplanner.app</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

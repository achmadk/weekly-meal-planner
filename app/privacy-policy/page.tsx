import { Metadata } from 'next'
import { NavigationMenu } from '@/components/navigation/Menu'

export const metadata: Metadata = {
  title: 'Privacy Policy - Weekly Meal Planner',
  description:
    'Privacy Policy for Weekly Meal Planner - Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background/80 pointer-events-none" />
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 right-20 w-[30rem] h-[30rem] rounded-full bg-secondary/15 blur-3xl" />
        <NavigationMenu />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-20">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Your privacy is important to us
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-muted-foreground">Last updated: March 5, 2026</p>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Weekly Meal Planner (&quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;) respects your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our web application.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Information We Collect</h2>
            <h3 className="font-medium text-lg">Personal Information</h3>
            <p className="text-muted-foreground leading-relaxed">
              When you sign up using Google OAuth, we collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your profile picture (if available)</li>
            </ul>

            <h3 className="font-medium text-lg">Meal Plan Data</h3>
            <p className="text-muted-foreground leading-relaxed">
              We store the meal plans you create, including recipes,
              preferences, and any dietary restrictions you specify.
            </p>

            <h3 className="font-medium text-lg">Usage Data</h3>
            <p className="text-muted-foreground leading-relaxed">
              We collect usage data such as page visits, features used, and
              interaction data to improve our service.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">
              How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
              <li>Provide and maintain our service</li>
              <li>Personalize your meal planning experience</li>
              <li>Communicate with you about updates and support</li>
              <li>Improve our service through analytics</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Data Storage and Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your data is stored securely using industry-standard encryption.
              We use Clerk for authentication and Supabase for data storage. We
              implement appropriate technical and organizational measures to
              protect your personal information.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use third-party services for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
              <li>Authentication (Clerk)</li>
              <li>Database storage (Supabase)</li>
              <li>AI meal generation (AI APIs)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              These services have their own privacy policies.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
              <li>Access your personal data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt-out of non-essential data collection</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy, please contact us
              at: <strong>support@weeklymealplanner.app</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

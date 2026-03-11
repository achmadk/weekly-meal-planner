import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-8 md:py-12 px-4 md:px-6 border-t border-border">
      <div className="max-w-7xl mx-auto text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Made with ❤️ for food lovers everywhere
        </p>
        <p className="text-sm text-muted-foreground">
          Built with React.js, TypeScript, and Next.js
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <Link
            href="/privacy-policy"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}

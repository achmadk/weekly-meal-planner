'use client'

import { AuthGuard } from '@/components/auth/auth-guard'

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <p>Welcome to your meal planning dashboard!</p>
        </div>
      </div>
    </AuthGuard>
  )
}

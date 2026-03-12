'use client'

import { AuthGuard } from '@/components/auth/auth-guard'
import SavedRecipesClient from './page-client'

export default function SavedRecipesPage() {
  return (
    <AuthGuard>
      <SavedRecipesClient />
    </AuthGuard>
  )
}

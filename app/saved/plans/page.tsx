import { AuthGuard } from '@/components/auth/auth-guard'
import SavedPlansClient from './page-client'

export default function SavedPlansPage() {
  return (
    <AuthGuard>
      <SavedPlansClient />
    </AuthGuard>
  )
}

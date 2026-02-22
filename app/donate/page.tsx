import type { Metadata } from 'next'
import DonatePageClient from './page-client'

export const metadata: Metadata = {
  title: 'Donate - Weekly Meal Planner',
  description: 'Support Weekly Meal Planner with a donation',
}

export default function DonatePage() {
  return <DonatePageClient />
}

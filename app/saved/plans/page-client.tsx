'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import {
  Home,
  Bookmark,
  HelpCircle,
  Calendar,
  Clock,
  Flame,
} from 'lucide-react'

export default function SavedPlansClient() {
  const router = useRouter()
  const savedPlans = [
    {
      id: 1,
      name: 'Week 1 - Healthy Start',
      days: 7,
      meals: 21,
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      name: 'Week 2 - Keto Plan',
      days: 7,
      meals: 21,
      createdAt: '2024-01-22',
    },
    {
      id: 3,
      name: 'Week 3 - Mediterranean',
      days: 7,
      meals: 21,
      createdAt: '2024-01-29',
    },
  ]

  return (
    <>
    <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8 pt-12 lg:pt-0"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 font-serif">
            My Saved Plans
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground">
            View and manage your meal plans
          </p>
        </motion.div>

        {savedPlans.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No saved plans yet</h2>
            <p className="text-muted-foreground mb-4">
              Start planning your meals to see them here
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Create a Plan
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {savedPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {plan.days} days
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        {plan.meals} meals
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {plan.createdAt}
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                    View
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
    </>
  )
}

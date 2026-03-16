'use client'

import { motion } from 'motion/react'
import type { Recipe } from './types'
import { useAuth } from '@/contexts/user-context'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { DateRange } from 'react-day-picker'
import { SavePlanModal } from './SavePlanModal'
import { DaysGrid } from './DaysGrid'

interface DayPlan {
  day: string
  breakfast: Recipe
  lunch: Recipe
  dinner: Recipe
}

interface WeeklyPlanProps {
  plan: DayPlan[]
  onSelectMeal: (recipe: Recipe) => void
  isComplete?: boolean
  isLoading?: boolean
  onMealBookmarked?:
    | ((recipe: Recipe, isBookmarked?: boolean) => Promise<void>)
    | null
}

export function WeeklyPlan({
  plan,
  onSelectMeal,
  isComplete = false,
  isLoading = false,
  onMealBookmarked = null,
}: WeeklyPlanProps) {
  const { isSignedIn } = useAuth()
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const isLoadingAll = plan.length < 7

  useEffect(() => {
    if (isLoadingAll) {
      const element = document.getElementById('weekly-plan-header')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [isLoadingAll])

  const handleSavePlanClick = () => {
    setIsSaveModalOpen(true)
  }

  const handleCloseSavePlanModal = () => {
    setSelectedDay(null)
    setIsSaveModalOpen(false)
  }

  const handleSavePlanSubmit = async (
    name: string,
    dateRange: Date | DateRange,
  ) => {
    setIsSaving(true)
    try {
      console.log('Saving plan:', { name, dateRange })
      toast.success('Plan saved successfully!')
      setIsSaveModalOpen(false)
    } catch (error) {
      console.error('Failed to save plan:', error)
      toast.error('Failed to save plan')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section
      id="weekly-plan-header"
      className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-background to-primary/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Your Weekly Plan
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Click on any meal to see the full recipe and get personalized
            recommendations
          </p>
          {isSignedIn && (
            <div className="flex gap-2 justify-center">
              <Button
                onClick={handleSavePlanClick}
                className="gap-2"
                disabled={isLoadingAll}
              >
                <Save size={18} />
                Save Plan
              </Button>
            </div>
          )}
        </motion.div>

        {/* Days grid */}
        <DaysGrid
          plan={plan}
          onSelectMeal={onSelectMeal}
          isComplete={isComplete}
          isLoading={isLoading}
          onMealBookmarked={onMealBookmarked}
        />
      </div>

      <SavePlanModal
        isOpen={isSaveModalOpen}
        onClose={handleCloseSavePlanModal}
        onSave={handleSavePlanSubmit}
        isSaving={isSaving}
        mode={selectedDay ? 'DAY_FULL' : 'WEEK'}
        mealPlanTitle="Weekly Meal Plan"
        {...{ selectedDay }}
      />
    </section>
  )
}

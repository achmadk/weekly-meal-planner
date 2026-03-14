'use client'

import { motion } from 'motion/react'
import { MealCard } from './MealCard'
import type { Recipe } from './types'
import { useAuth } from '@/contexts/user-context'
import { Button } from '@/components/ui/button'
import { Save, Calendar } from 'lucide-react'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { SavePlanModal } from './SavePlanModal'
import { updateGeneratedRecipeItem } from '@/lib/idb-keyval'

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
  onMealBookmarked?: ((recipe: Recipe, isBookmarked?: boolean) => Promise<void>) | null
}

const dayColors = [
  'from-rose-500 to-pink-500',
  'from-orange-500 to-amber-500',
  'from-emerald-500 to-teal-500',
  'from-cyan-500 to-blue-500',
  'from-violet-500 to-purple-500',
  'from-fuchsia-500 to-pink-500',
  'from-red-500 to-rose-500',
]

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

  const handleSavePlanClick = () => {
    setIsSaveModalOpen(true)
  }

  const handleCloseSavePlanModal = () => {
    setSelectedDay(null)
    setIsSaveModalOpen(false)
  }

  const handleSavePlanByDayClick = (dayName: string | null) => () => {
    if (!dayName) {
      return
    }
    setSelectedDay(dayName)
    setIsSaveModalOpen(true)
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

  const onLoadComplete = async (recipe: Recipe) =>
    await updateGeneratedRecipeItem(recipe)

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-background to-primary/5">
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
        <div className="space-y-10 md:space-y-16">
          {plan.map((dayPlan, dayIndex) => {
            const mealCount =
              [
                dayPlan?.breakfast ?? null,
                dayPlan?.lunch ?? null,
                dayPlan?.dinner ?? null,
              ].filter(
                (meal) => meal !== null && Object.keys(meal).length === 12,
              ).length ?? 0
            const isLoadingEachDay = mealCount < 3
            const sharedMealCardProps = {
              onClick: onSelectMeal,
              isComplete,
              onLoadComplete,
              onRecipeBookmarked: onMealBookmarked,
              disabled: isLoading
            }

            return (
              dayPlan && (
                <motion.div
                  key={dayPlan.day}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
                >
                  {/* Day header */}
                  <div className="flex items-center justify-between gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div
                        className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${dayColors[dayIndex]} flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg`}
                      >
                        {dayPlan?.day?.slice(0, 2) ?? '-'}
                      </div>
                      <div>
                        <h3 className="text-xl md:text-3xl font-bold text-foreground">
                          {dayPlan?.day}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground font-medium">
                          {`${mealCount !== 3 ? `${mealCount} / 3` : mealCount} meals planned`}
                        </p>
                      </div>
                    </div>
                    {isSignedIn && (
                      <div className="flex gap-1 md:gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 md:gap-2 h-8 md:h-9 px-2 md:px-3"
                          onClick={handleSavePlanByDayClick(
                            dayPlan.day?.toLowerCase?.() ?? null,
                          )}
                          disabled={isLoadingEachDay}
                        >
                          <Save size={14} className="md:size-[18px]" />
                          <span className="hidden sm:inline">Save Plan</span>
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Meals grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    <MealCard
                      recipe={dayPlan.breakfast}
                      mealType="breakfast"
                      delay={dayIndex * 0.1 + 0.1}
                      {...sharedMealCardProps}
                    />
                    <MealCard
                      recipe={dayPlan.lunch}
                      mealType="lunch"
                      delay={dayIndex * 0.1 + 0.15}
                      {...sharedMealCardProps}
                    />
                    <MealCard
                      recipe={dayPlan.dinner}
                      mealType="dinner"
                      delay={dayIndex * 0.1 + 0.2}
                      {...sharedMealCardProps}
                    />
                  </div>
                </motion.div>
              )
            )
          })}
        </div>
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

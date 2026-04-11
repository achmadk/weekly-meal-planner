'use client'

import { motion } from 'motion/react'
import { MealCard } from './MealCard'
import type { Recipe } from './types'
import { useAuth } from '@/contexts/user-context'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import { useEffect } from 'react'

interface DayPlanData {
  day: string
  breakfast: Recipe
  lunch: Recipe
  dinner: Recipe
}

interface DayPlanProps {
  dayPlan: DayPlanData
  dayIndex: number
  onSelectMeal: (recipe: Recipe) => void
  isComplete?: boolean
  isLoading?: boolean
  onMealBookmarked?:
    | ((recipe: Recipe, isBookmarked?: boolean) => Promise<void>)
    | null
  onLoadComplete?: (recipe: Recipe) => Promise<void>
  onSavePlanByDay?: (dayName: string | null) => void
  onInitialLoadingEachDay?: ((index: number) => void) | null
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

export function DayPlan({
  dayPlan,
  dayIndex,
  onSelectMeal,
  isComplete = false,
  isLoading = false,
  onMealBookmarked = null,
  onLoadComplete,
  onSavePlanByDay,
  onInitialLoadingEachDay = null,
}: DayPlanProps) {
  const { isSignedIn } = useAuth()

  const mealCount =
    [
      dayPlan?.breakfast ?? null,
      dayPlan?.lunch ?? null,
      dayPlan?.dinner ?? null,
    ].filter((meal) => meal !== null && Object.keys(meal).length === 12)
      .length ?? 0
  const isLoadingEachDay = mealCount < 3
  const breakfastReady = mealCount === 1

  const sharedMealCardProps = {
    dayName: dayPlan.day,
    onClick: onSelectMeal,
    isComplete,
    onLoadComplete,
    onRecipeBookmarked: onMealBookmarked,
    disabled: isLoading,
  }

  const handleSavePlanClick = () => {
    if (onSavePlanByDay) {
      onSavePlanByDay(dayPlan.day?.toLowerCase?.() ?? null)
    }
  }

  useEffect(() => {
    if (breakfastReady) {
      onInitialLoadingEachDay?.(dayIndex)
    }
  }, [breakfastReady])

  return (
    <motion.div
      key={dayPlan.day}
      id={`day-plan-${dayIndex + 1}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
    >
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
              onClick={handleSavePlanClick}
              disabled={isLoadingEachDay}
            >
              <Save size={14} className="md:size-[18px]" />
              <span className="hidden sm:inline">Save Plan</span>
            </Button>
          </div>
        )}
      </div>

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
}

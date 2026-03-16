'use client'

import type { Recipe } from './types'
import { updateGeneratedRecipeItem } from '@/lib/idb-keyval'
import { useEffect, useRef, useState } from 'react'
import { DayPlan } from './DayPlan'

interface DayPlan {
  day: string
  breakfast: Recipe
  lunch: Recipe
  dinner: Recipe
}

interface DaysGridProps {
  plan: DayPlan[]
  onSelectMeal: (recipe: Recipe) => void
  isComplete?: boolean
  isLoading?: boolean
  onMealBookmarked?:
    | ((recipe: Recipe, isBookmarked?: boolean) => Promise<void>)
    | null
}

export function DaysGrid({
  plan,
  onSelectMeal,
  isComplete = false,
  isLoading = false,
  onMealBookmarked = null,
}: DaysGridProps) {
  const lastScrolledRef = useRef<number | null>(null)
  const [dayIndex, setDayIndex] = useState<null | number>(null)

  const onLoadComplete = async (recipe: Recipe) =>
    await updateGeneratedRecipeItem(recipe)

  useEffect(() => {
    if (typeof dayIndex === "number") {
      const element = document.getElementById(`day-plan-${dayIndex + 1}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        lastScrolledRef.current = dayIndex
      }
    }
  }, [dayIndex])

  return (
    <div className="space-y-10 md:space-y-16">
      {plan.map((dayPlan, dayIndex) => {
        return (
          dayPlan && (
            <DayPlan
              key={dayPlan.day}
              dayPlan={dayPlan}
              dayIndex={dayIndex}
              onSelectMeal={onSelectMeal}
              isComplete={isComplete}
              isLoading={isLoading}
              onMealBookmarked={onMealBookmarked}
              onLoadComplete={onLoadComplete}
              onInitialLoadingEachDay={(index) => setDayIndex(index)}
            />
          )
        )
      })}
    </div>
  )
}

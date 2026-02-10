import { ImageAttribution } from "@/hooks/useRecipeImage"

export type MealType = 'breakfast' | 'lunch' | 'dinner'

export interface Recipe {
  id: string
  title: string
  mealType: MealType
  description: string
  prepTime: string
  cookTime: string
  servings: number
  calories: number
  ingredients: string[]
  instructions: string[]
  imageUrl: string
  tags: string[]
  attribution?: null | ImageAttribution
}

export interface DayPlan {
  day: string
  breakfast: Recipe
  lunch: Recipe
  dinner: Recipe
}

export interface WeeklyPlan {
  days: DayPlan[]
  generatedAt: Date
}

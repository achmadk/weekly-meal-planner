import { NextRequest, NextResponse } from 'next/server'
import { eq, desc, sql } from 'drizzle-orm'

import { db } from '@/db'
import { mealPlans, meals, recipes } from '@/db/schema'

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userMealPlans = await db
      .select()
      .from(mealPlans)
      .where(eq(mealPlans.userId, userId))
      .orderBy(desc(mealPlans.createdAt))
      .limit(3)

    const planIds = userMealPlans.map((plan) => plan.id)

    let userMeals: (typeof meals.$inferSelect)[] = []
    if (planIds.length > 0) {
      userMeals = await db
        .select()
        .from(meals)
        .where(sql`${meals.mealPlanId} IN ${planIds}`)
    }

    const totalMealsPlanned = userMeals.length

    const weeksOfPlanning = userMealPlans.length

    const recipeIds = Array.from(
      new Set(userMeals.map((m) => m.recipeId).filter(Boolean)),
    )

    let avgPrepTime = 0
    let totalPrepTime = 0
    let savedRecipesList: (typeof recipes.$inferSelect)[] = []

    if (recipeIds.length > 0) {
      savedRecipesList = await db
        .select()
        .from(recipes)
        .where(
          sql`${recipes.id} IN ${recipeIds.map((id) => parseInt(id as string)).filter((id) => !isNaN(id))}`,
        )
        .limit(3)

      const recipesWithTimes = savedRecipesList.filter(
        (r) => r.prepTime !== null || r.cookTime !== null,
      )

      if (recipesWithTimes.length > 0) {
        totalPrepTime = recipesWithTimes.reduce(
          (acc, r) => acc + (r.prepTime || 0) + (r.cookTime || 0),
          0,
        )
        avgPrepTime = Math.round(totalPrepTime / recipesWithTimes.length)
      }
    }

    const recentPlans = userMealPlans.map((plan) => ({
      id: plan.id,
      name: `Week of ${new Date(plan.weekStart).toLocaleDateString()}`,
      days: 7,
      meals: userMeals.filter((m) => m.mealPlanId === plan.id).length,
      createdAt: plan.createdAt?.toISOString() || '',
    }))

    const recentRecipes = savedRecipesList.map((recipe) => ({
      id: recipe.id?.toString() || recipe.externalId || '',
      title: recipe.name,
      description: recipe.description || '',
      prepTime: recipe.prepTime || 0,
      cookTime: recipe.cookTime || 0,
      servings: recipe.servings || 1,
      calories: 0,
      ingredients: recipe.ingredients?.split('\n') || [],
      instructions: recipe.instructions?.split('\n') || [],
      tags: [],
      mealType: 'dinner' as const,
      imageUrl: recipe.imageUrl || '',
    }))

    return NextResponse.json({
      insights: {
        totalMealsPlanned,
        weeksOfPlanning,
        avgPrepTime,
        totalPrepTime,
      },
      recentPlans,
      recentRecipes,
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

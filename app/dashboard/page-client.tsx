'use client'

import { AuthGuard } from '@/components/auth/auth-guard'
import { motion } from 'motion/react'
import {
  Calendar,
  Flame,
  ArrowRight,
  Bookmark,
  Clock,
  TrendingUp,
  Target,
  UtensilsCrossed,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MealCard } from '@/components/meal-planner/MealCard'
import type { Recipe, MealType } from '@/components/meal-planner/types'
import { DashboardSideMenu } from '@/components/navigation/DashboardSideMenu'
import { useUser } from '@clerk/nextjs'
import { Skeleton } from '@/components/ui/skeleton'

interface Insights {
  totalMealsPlanned: number
  weeksOfPlanning: number
  avgPrepTime: number
  totalPrepTime: number
}

interface RecentPlan {
  id: number
  name: string
  days: number
  meals: number
  createdAt: string
}

interface RecentRecipe {
  id: string
  title: string
  description: string
  prepTime: number
  cookTime: number
  servings: number
  calories: number
  ingredients: string[]
  instructions: string[]
  tags: string[]
  mealType: MealType
  imageUrl: string
}

export default function DashboardPageClient() {
  const router = useRouter()
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const [insights, setInsights] = useState<Insights | null>(null)
  const [recentPlans, setRecentPlans] = useState<RecentPlan[]>([])
  const [recentRecipes, setRecentRecipes] = useState<RecentRecipe[]>([])

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user?.id) return

      try {
        const response = await fetch('/api/v1/dashboard', {
          headers: { 'x-user-id': user.id },
        })

        if (response.ok) {
          const data = await response.json()
          setInsights(data.insights)
          setRecentPlans(data.recentPlans)
          setRecentRecipes(data.recentRecipes)
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [user?.id])

  const skeletonInsights = [
    { label: 'Total Meals Planned', icon: UtensilsCrossed },
    { label: 'Weeks of Planning', icon: Calendar },
    { label: 'Avg Prep Time', icon: Clock },
    { label: 'Total Prep Time', icon: Flame },
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
          Welcome Back!
        </h1>
        <p className="text-sm sm:text-lg text-muted-foreground">
          Your saved meal plans and recipes
        </p>
      </motion.div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold font-serif">
              Insights
            </h2>
            <p className="text-sm text-muted-foreground">
              Your meal planning statistics
            </p>
          </div>
          <Target className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {skeletonInsights.map((item, index) => (
            <div
              key={item.label}
              className="p-4 sm:p-6 rounded-2xl bg-card border border-border flex flex-col justify-between min-h-[120px]"
            >
              {isLoading ? (
                <>
                  <div className="flex items-center gap-2.5">
                    <Skeleton className="w-8 h-8 rounded-lg" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-8 w-16 self-end" />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold text-primary self-end">
                    {item.label.includes('Total Meals')
                      ? insights?.totalMealsPlanned ?? 0
                      : item.label.includes('Weeks')
                        ? insights?.weeksOfPlanning ?? 0
                        : item.label.includes('Avg')
                          ? `${insights?.avgPrepTime ?? 0}m`
                          : `${insights?.totalPrepTime ?? 0}m`}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold font-serif">
              Saved Plans
            </h2>
            <p className="text-sm text-muted-foreground">
              Your weekly meal plans
            </p>
          </div>
          <button
            onClick={() => router.push('/saved/plans')}
            className="text-sm text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 sm:p-6 rounded-2xl bg-card border border-border"
              >
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        ) : recentPlans.length === 0 ? (
          <div className="text-center py-8 rounded-2xl bg-card border border-border">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No saved plans yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 sm:p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push('/saved/plans')}
              >
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
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold font-serif">
              Saved Recipes
            </h2>
            <p className="text-sm text-muted-foreground">
              Your favorite recipes
            </p>
          </div>
          <button
            onClick={() => router.push('/saved/recipes')}
            className="text-sm text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 sm:p-6 rounded-2xl bg-card border border-border"
              >
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : recentRecipes.length === 0 ? (
          <div className="text-center py-8 rounded-2xl bg-card border border-border">
            <Bookmark className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No saved recipes yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentRecipes.map((recipe, index) => (
              <MealCard
                key={recipe.id}
                recipe={recipe}
                mealType={recipe.mealType}
                onClick={() => router.push('/saved/recipes')}
                delay={index * 0.1}
                isComplete={true}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

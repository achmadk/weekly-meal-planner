import { motion } from 'motion/react'
import { MealCard } from './MealCard'
import type { Recipe } from './types'

interface DayPlan {
  day: string
  breakfast: Recipe
  lunch: Recipe
  dinner: Recipe
}

interface WeeklyPlanProps {
  plan: DayPlan[]
  onSelectMeal: (recipe: Recipe) => void
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

export function WeeklyPlan({ plan, onSelectMeal }: WeeklyPlanProps) {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Weekly Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click on any meal to see the full recipe and get personalized
            recommendations
          </p>
        </motion.div>

        {/* Days grid */}
        <div className="space-y-16">
          {plan.map((dayPlan, dayIndex) => dayPlan && (
            <motion.div
              key={dayPlan.day}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
            >
              {/* Day header */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${dayColors[dayIndex]} flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-gray-200/50`}
                >
                  {dayPlan?.day?.slice(0, 2) ?? "-"}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground">
                    {dayPlan?.day}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    3 delicious meals planned
                  </p>
                </div>
              </div>

              {/* Meals grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <MealCard
                  recipe={dayPlan.breakfast}
                  mealType="breakfast"
                  onClick={(recipe: Recipe) => onSelectMeal(recipe)}
                  delay={dayIndex * 0.1 + 0.1}
                />
                <MealCard
                  recipe={dayPlan.lunch}
                  mealType="lunch"
                  onClick={(recipe: Recipe) => onSelectMeal(recipe)}
                  delay={dayIndex * 0.1 + 0.15}
                />
                <MealCard
                  recipe={dayPlan.dinner}
                  mealType="dinner"
                  onClick={(recipe: Recipe) => onSelectMeal(recipe)}
                  delay={dayIndex * 0.1 + 0.2}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { experimental_useObject as useObject } from '@ai-sdk/react'
import { Hero } from './Hero'
import { WeeklyPlan } from './WeeklyPlan'
import { RecipeModal } from './RecipeModal'
import { WeeklyPlanSchema } from '@/schemas/meal-plan'
import type { Recipe } from './types'

export function MealPlannerApp() {
  const { object: data, submit, isLoading } = useObject({
    api: '/api/v1/meal-generators',
    schema: WeeklyPlanSchema,
  })

  // Derive weeklyPlan from the streaming object
  const weeklyPlan = data?.plan ?? []

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGenerate = useCallback(() => {
    submit({})
  }, [submit])

  const handleSelectMeal = useCallback((recipe: Recipe) => {
    setSelectedRecipe(recipe)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleSelectRecommendation = useCallback((recipe: Recipe) => {
    setSelectedRecipe(recipe)
  }, [])

  console.log(weeklyPlan)

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <Hero onGenerate={handleGenerate} isGenerating={isLoading} />

      {/* Weekly Plan Section */}
      <AnimatePresence mode="wait">
        {weeklyPlan && Array.isArray(weeklyPlan) && weeklyPlan.length > 0 && (
          <motion.div
            key="weekly-plan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* @ts-ignore - Types might mismatch slightly during streaming partials but acceptable for UI rendering */}
            <WeeklyPlan plan={weeklyPlan} onSelectMeal={handleSelectMeal} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state when no plan generated */}
      {!weeklyPlan && !isLoading && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-24 px-6 relative"
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-secondary/15 flex items-center justify-center border border-secondary/20"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-4xl">🍽️</span>
            </motion.div>
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Plan Your Week?
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Click the button above to generate a complete week of delicious
              meals. Each plan includes breakfast, lunch, and dinner for all 7
              days!
            </p>
          </div>
        </motion.section>
      )}

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectRecipe={handleSelectRecommendation}
      />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for food lovers everywhere
          </p>
        </div>
      </footer>
    </div>
  )
}

'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { experimental_useObject as useObject } from '@ai-sdk/react'
import { Hero } from './Hero'
import { WeeklyPlan } from './WeeklyPlan'
import { RecipeModal } from './RecipeModal'
import { WeeklyPlanSchema } from '@/schemas/meal-plan'
import type { Recipe } from './types'
import { useAuth } from '@/contexts/user-context'
import { getRemainingCount, getStoredPublicUserKeys, setStoredRemainingCount } from '@/lib/idb-keyval'
import type { MealGenerationLimitsCheckResponseBody } from '../../../app/api/v1/generation-limits/route'

export function MealPlannerApp() {
  const { userId, isSignedIn } = useAuth();
  const [remainingCount, setRemainingCount] = useState(() => isSignedIn ? 7 : 3);
  const [triggerSavedPlan, setTriggerSavedPlan] = useState(false);

  const {
    object: data,
    submit,
    isLoading,
  } = useObject({
    api: '/api/v1/meal-generators',
    schema: WeeklyPlanSchema,
    onFinish: async () => {
      setRemainingCount((prev) => {
        const remainingCount = prev - 1
        if (isSignedIn) {
          try {
            fetch('/api/v1/generation-limits', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId,
                action: 'SET_VALUE',
                remainingCount,
              }),
            })
          } catch (error) {
            console.error('Failed to decrement limit:', error)
          }
        }
        setStoredRemainingCount(remainingCount)
        return remainingCount
      });
    },
  })

  // Derive weeklyPlan from the streaming object
  const weeklyPlan = data?.plan ?? [];
  const weeklyPlanCompleted = weeklyPlan.length === 7;

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGenerate = useCallback(() => {
    if (remainingCount > 0) {
      submit({})      
    } else {
      
    }
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

  const loadRemainingCount = async () => {
    const storedPublicUserKeys = await getStoredPublicUserKeys();
    let count: number = 0;
    if (isSignedIn) {
      if (storedPublicUserKeys === 0) {
        const res = await fetch('/api/v1/generation-limits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, action: 'CHECK' }),
        });
        const data = await res.json() as MealGenerationLimitsCheckResponseBody;
        count = data.remaining;
      } else {
        count = await getRemainingCount();
        await fetch('/api/v1/generation-limits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, action: 'SET_VALUE', remainingCount: count }),
        });
      }
    } else {
      count = await getRemainingCount();
    }
    setRemainingCount(count);
  }

  useEffect(() => {
    loadRemainingCount();
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      loadRemainingCount();
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (weeklyPlanCompleted) {
      setTriggerSavedPlan(true);
    }
  }, [weeklyPlanCompleted])

  useEffect(() => {
    if (triggerSavedPlan) {
      /**
       * @todo
       */
      setTriggerSavedPlan(false);
    }
  }, [triggerSavedPlan])

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <Hero count={remainingCount} onGenerate={handleGenerate} isGenerating={isLoading} />

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
            <WeeklyPlan
              // @ts-ignore - Types might mismatch slightly during streaming partials but acceptable for UI rendering
              plan={weeklyPlan}
              onSelectMeal={handleSelectMeal}
              isComplete={weeklyPlan.length === 7}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state when no plan generated */}
      {!weeklyPlan && !isLoading && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 md:py-24 px-4 md:px-6 relative"
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8 rounded-full bg-secondary/15 flex items-center justify-center border border-secondary/20"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-4xl">🍽️</span>
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Plan Your Week?
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
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
      <footer className="py-8 md:py-12 px-4 md:px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for food lovers everywhere
          </p>
        </div>
      </footer>
    </div>
  )
}

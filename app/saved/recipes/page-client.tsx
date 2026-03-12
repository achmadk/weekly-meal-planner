'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import {
  Bookmark,
} from 'lucide-react'
import { MealCard } from '@/components/meal-planner/MealCard'
import type { Recipe, MealType } from '@/components/meal-planner/types'

export default function SavedRecipesClient() {
  const router = useRouter()


  const savedRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Grilled Salmon with Quinoa',
      description: 'A healthy and delicious grilled salmon recipe with quinoa',
      calories: 520,
      prepTime: 15,
      cookTime: 20,
      servings: 2,
      ingredients: ['Salmon', 'Quinoa', 'Vegetables', 'Olive oil'],
      instructions: ['Grill salmon', 'Cook quinoa', 'Prepare vegetables'],
      tags: ['dinner', 'healthy', 'protein'],
      mealType: 'dinner' as MealType,
      imageUrl: '',
    },
    {
      id: '2',
      title: 'Mediterranean Salad Bowl',
      description: 'Fresh and colorful Mediterranean salad',
      calories: 380,
      prepTime: 10,
      cookTime: 0,
      servings: 1,
      ingredients: ['Lettuce', 'Tomatoes', 'Cucumber', 'Feta cheese', 'Olives'],
      instructions: [
        'Chop vegetables',
        'Add feta and olives',
        'Drizzle olive oil',
      ],
      tags: ['lunch', 'healthy', 'vegetarian'],
      mealType: 'lunch' as MealType,
      imageUrl: '',
    },
    {
      id: '3',
      title: 'Avocado Toast Supreme',
      description: 'Creamy avocado on crispy toast',
      calories: 420,
      prepTime: 5,
      cookTime: 0,
      servings: 1,
      ingredients: ['Bread', 'Avocado', 'Egg', 'Salt', 'Pepper'],
      instructions: ['Toast bread', 'Mash avocado', 'Top with egg'],
      tags: ['breakfast', 'quick', 'vegetarian'],
      mealType: 'breakfast' as MealType,
      imageUrl: '',
    },
  ]

  const handleSelectRecipe = (recipe: Recipe) => {
    console.log('Selected recipe:', recipe)
  }

  return (
    <>
      <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8 pt-12 lg:pt-0"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 font-serif">
            My Saved Recipes
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground">
            Your favorite recipes collection
          </p>
        </motion.div>

        {savedRecipes.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No saved recipes yet</h2>
            <p className="text-muted-foreground mb-4">
              Start saving recipes to see them here
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Browse Recipes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedRecipes.map((recipe, index) => (
              <MealCard
                key={recipe.id}
                recipe={recipe}
                mealType={recipe.mealType}
                onClick={handleSelectRecipe}
                delay={index * 0.1}
                isComplete={true}
              />
            ))}
          </div>
        )}
    </>
  )
}

import { set, get, keys, update } from 'idb-keyval'

import { userSavedMealsStore } from './store'
import { Recipe } from '@/components/meal-planner'

export const GENERATED_RECIPES_KEY = 'generated_recipes'

export async function setGeneratedRecipes(recipes: Recipe[]) {
  await set(GENERATED_RECIPES_KEY, recipes, userSavedMealsStore)
}

export async function getGeneratedRecipes() {
  const allKeys = await keys(userSavedMealsStore)
  if (allKeys.includes(GENERATED_RECIPES_KEY)) {
    return get(GENERATED_RECIPES_KEY, userSavedMealsStore)
  }
  return []
}

export async function clearGeneratedRecipes() {
  await set(GENERATED_RECIPES_KEY, [], userSavedMealsStore)
}

export async function updateGeneratedRecipeItem(recipe: Recipe) {
  await update(GENERATED_RECIPES_KEY, (prevVal?: Recipe[]) => {
    if (!prevVal) {
      return []
    }
    const selectedItem = prevVal.find((r) => r.description === recipe.description) ?? null
    if (!selectedItem) {
      return prevVal
    }
    const selectedIndex = prevVal.findIndex((r) => r.description === recipe.description)
    return [...prevVal.slice(0, selectedIndex), recipe, ...prevVal.slice(selectedIndex + 1)]
  }, userSavedMealsStore)
}

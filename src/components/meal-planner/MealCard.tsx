import { motion } from 'motion/react'
import { Clock, Users, Flame } from 'lucide-react'
import type { Recipe, MealType } from './types'
import { useRecipeImage } from '@/hooks/useRecipeImage'

interface MealCardProps {
  recipe: Recipe
  mealType: MealType
  onClick: (recipe: Recipe) => void
  delay?: number
}

const mealTypeConfig = {
  breakfast: {
    icon: '🌅',
    label: 'Breakfast',
    gradient: 'from-amber-400/20 to-orange-300/20',
    accent: '#F59E0B',
  },
  lunch: {
    icon: '☀️',
    label: 'Lunch',
    gradient: 'from-emerald-400/20 to-teal-300/20',
    accent: '#10B981',
  },
  dinner: {
    icon: '🌙',
    label: 'Dinner',
    gradient: 'from-violet-400/20 to-purple-300/20',
    accent: '#8B5CF6',
  },
}

export function MealCard({
  recipe,
  mealType,
  onClick,
  delay = 0,
}: MealCardProps) {
  const config = mealTypeConfig[mealType]
  const recipeDataIsCompleted = recipe && Object.keys(recipe).length === 12;

  const { imageUrl, attribution } = useRecipeImage(recipe, recipeDataIsCompleted);

  if (recipeDataIsCompleted) {
    const currentRecipe = {
      ...recipe,
      imageUrl,
      attribution,
    } as Recipe;
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        onClick={() => onClick(currentRecipe)}
        className="group cursor-pointer"
      >
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 border border-gray-100">
          {/* Image */}
          <div className="relative h-40 overflow-hidden bg-gray-100">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <Flame size={32} />
              </div>
            )}

            {attribution && (
              <div className="absolute bottom-1 right-2 text-[10px] text-white/70 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                Photo by <a href={attribution.imgLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="underline hover:text-white">{attribution.imgName}</a> on <a href={attribution.providerLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="underline hover:text-white">Unsplash</a>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Meal type badge */}
            <div
              className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold flex items-center gap-1.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span>{config.icon}</span>
              <span style={{ color: config.accent }}>{config.label}</span>
            </div>

            {/* Calories badge */}
            <div
              className="absolute top-3 right-3 px-2.5 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Flame size={12} />
              {recipe.calories} cal
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3
              className="text-lg font-bold text-[#3D405B] mb-2 line-clamp-1 group-hover:text-[#E07A5F] transition-colors"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {recipe.title}
            </h3>

            <p
              className="text-sm text-[#3D405B]/60 mb-3 line-clamp-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {recipe.description}
            </p>

            {/* Meta info */}
            <div
              className="flex items-center gap-4 text-xs text-[#3D405B]/50"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {`${recipe.prepTime}${recipe.cookTime !== "0 minutes" ? ` + ${recipe.cookTime}` : ""}`}
              </span>
              <span className="flex items-center gap-1">
                <Users size={12} />
                {recipe.servings} servings
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {recipe.tags
                ?.filter((tag) => tag !== recipe.mealType)
                ?.slice(0, 2)?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-[#F4F1DE] text-[#3D405B]/70 text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {tag}
                  </span>
                )) ?? false}
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#E07A5F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </motion.div>
    )
  }
  return null;
}

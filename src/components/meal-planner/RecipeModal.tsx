import { motion, AnimatePresence } from 'motion/react'
import { X, Clock, Users, Flame, ChefHat, Sparkles } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Recipe } from './types'
import { getRecommendedRecipes } from './recipes-data'

interface RecipeModalProps {
  recipe: Recipe | null
  isOpen: boolean
  onClose: () => void
  onSelectRecipe: (recipe: Recipe) => void
}

const mealTypeLabels = {
  breakfast: { icon: '🌅', label: 'Breakfast', color: '#F59E0B' },
  lunch: { icon: '☀️', label: 'Lunch', color: '#10B981' },
  dinner: { icon: '🌙', label: 'Dinner', color: '#8B5CF6' },
}

export function RecipeModal({
  recipe,
  isOpen,
  onClose,
  onSelectRecipe,
}: RecipeModalProps) {
  if (!recipe) return null

  const recommendations = getRecommendedRecipes(recipe, 3)
  const mealConfig = mealTypeLabels[recipe.mealType]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-background rounded-3xl shadow-2xl z-50 overflow-y-auto flex flex-col border border-border/50"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-foreground hover:bg-white hover:scale-110 transition-all cursor-pointer"
            >
              <X size={20} />
            </button>

            <ScrollArea className="flex-1">
              <div className="flex flex-col lg:flex-row">
                {/* Image section */}
                <div className="lg:w-2/5 relative">
                  <div className="h-64 lg:h-full lg:min-h-[600px] relative bg-muted">
                    {recipe.imageUrl ? (
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Flame size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r" />

                    {/* Attribution */}
                    {recipe.attribution && (
                      <div className="absolute top-2 right-2 text-[10px] text-white/70 z-10">
                        Photo by <a href={recipe.attribution.imgLink} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">{recipe.attribution.imgName}</a> on <a href={recipe.attribution.providerLink} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Unsplash</a>
                      </div>
                    )}

                    {/* Meal type badge */}
                    <div
                      className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-sm font-semibold flex items-center gap-2 shadow-sm"
                    >
                      <span>{mealConfig.icon}</span>
                      <span style={{ color: mealConfig.color }}>
                        {mealConfig.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content section */}
                <div className="lg:w-3/5 p-6 lg:p-10 bg-background">
                  {/* Header */}
                  <div className="mb-8">
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                      {recipe.title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {recipe.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      {
                        icon: Clock,
                        label: 'Prep Time',
                        value: recipe.prepTime,
                      },
                      ...(!["0 minutes", "0 mins"].includes(recipe.cookTime) ? [
                        {
                          icon: Clock,
                          label: 'Cook Time',
                          value: recipe.cookTime,
                        },
                      ] : []),
                      {
                        icon: Users,
                        label: 'Servings',
                        value: `${recipe.servings}`,
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-muted/50 rounded-xl p-4 text-center border border-border/50"
                      >
                        <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                        <div className="text-lg font-bold text-foreground">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calories badge */}
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary-foreground/90 mb-8 border border-primary/20"
                  >
                    <Flame className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary">
                      {recipe.calories} calories
                    </span>
                    <span className="text-primary/70">per serving</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {recipe.tags
                      .filter((item) => item !== recipe.mealType)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium border border-secondary/20"
                        >
                          #{tag}
                        </span>
                      ))}
                  </div>

                  {/* Ingredients */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <ChefHat className="w-6 h-6 text-primary" />
                      Ingredients
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {recipe.ingredients.map((ingredient, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-muted-foreground group"
                        >
                          <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                          <span className="group-hover:text-foreground transition-colors">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions */}
                  <div className="mb-10">
                    <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                      Instructions
                    </h3>
                    <ol className="space-y-6">
                      {recipe.instructions.map((instruction, i) => (
                        <li
                          key={i}
                          className="flex gap-4"
                        >
                          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold text-sm border border-primary/20">
                            {i + 1}
                          </span>
                          <p className="text-muted-foreground pt-1 leading-relaxed">
                            {instruction}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Recommendations */}
                  {recommendations.length > 0 && (
                    <div className="border-t border-border pt-8 mt-8">
                      <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        You Might Also Like
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {recommendations.map((rec) => (
                          <motion.div
                            key={rec.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => onSelectRecipe(rec)}
                            className="cursor-pointer group"
                          >
                            <div className="relative rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                              <div className="h-24 relative">
                                <img
                                  src={rec.imageUrl}
                                  alt={rec.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                              </div>
                              <div className="p-3">
                                <h4 className="font-semibold text-card-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
                                  {rec.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                  <Flame size={10} className="text-primary" />
                                  {rec.calories} cal
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

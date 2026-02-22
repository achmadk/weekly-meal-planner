import type { Recipe } from './types'

export const breakfastRecipes: Recipe[] = [
  {
    id: 'b1',
    title: 'Avocado Toast with Poached Eggs',
    mealType: 'breakfast',
    description:
      'Creamy avocado on sourdough topped with perfectly poached eggs and a sprinkle of everything bagel seasoning.',
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    calories: 380,
    ingredients: [
      '2 slices sourdough bread',
      '1 ripe avocado',
      '2 eggs',
      '1 tbsp white vinegar',
      'Everything bagel seasoning',
      'Red pepper flakes',
      'Salt and pepper',
    ],
    instructions: [
      'Toast the sourdough bread until golden.',
      'Mash avocado with salt and pepper.',
      'Bring water to a simmer, add vinegar, create a vortex and poach eggs for 3 minutes.',
      'Spread avocado on toast, top with poached eggs.',
      'Season with everything bagel seasoning and red pepper flakes.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop',
    tags: ['healthy', 'quick', 'vegetarian'],
  },
  {
    id: 'b2',
    title: 'Fluffy Blueberry Pancakes',
    mealType: 'breakfast',
    description:
      'Light and fluffy pancakes bursting with fresh blueberries, drizzled with pure maple syrup.',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    calories: 450,
    ingredients: [
      '2 cups all-purpose flour',
      '2 tbsp sugar',
      '2 tsp baking powder',
      '1 cup milk',
      '2 eggs',
      '1/4 cup melted butter',
      '1 cup fresh blueberries',
      'Maple syrup',
    ],
    instructions: [
      'Mix dry ingredients in a bowl.',
      'Whisk wet ingredients separately.',
      'Combine wet and dry, fold in blueberries.',
      'Cook on a griddle until bubbles form, flip and cook until golden.',
      'Serve with maple syrup and extra blueberries.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop',
    tags: ['sweet', 'family-friendly', 'classic'],
  },
  {
    id: 'b3',
    title: 'Greek Yogurt Parfait',
    mealType: 'breakfast',
    description:
      'Layers of creamy Greek yogurt, crunchy granola, and fresh seasonal berries with a honey drizzle.',
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    calories: 320,
    ingredients: [
      '1 cup Greek yogurt',
      '1/2 cup granola',
      '1/2 cup mixed berries',
      '2 tbsp honey',
      '1 tbsp chia seeds',
    ],
    instructions: [
      'Layer half the yogurt in a glass.',
      'Add half the granola and berries.',
      'Repeat layers.',
      'Drizzle with honey and sprinkle chia seeds.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop',
    tags: ['healthy', 'no-cook', 'quick'],
  },
  {
    id: 'b4',
    title: 'Spinach & Feta Omelette',
    mealType: 'breakfast',
    description:
      'A fluffy three-egg omelette filled with sautéed spinach, crumbled feta, and fresh herbs.',
    prepTime: 5,
    cookTime: 8,
    servings: 1,
    calories: 340,
    ingredients: [
      '3 eggs',
      '1 cup fresh spinach',
      '1/4 cup feta cheese',
      '1 tbsp butter',
      'Fresh dill',
      'Salt and pepper',
    ],
    instructions: [
      'Whisk eggs with salt and pepper.',
      'Sauté spinach in butter until wilted.',
      'Pour eggs over spinach, cook until set.',
      'Add feta and fold omelette.',
      'Garnish with fresh dill.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&auto=format&fit=crop',
    tags: ['protein', 'keto', 'vegetarian'],
  },
  {
    id: 'b5',
    title: 'Overnight Oats',
    mealType: 'breakfast',
    description:
      'Creamy oats soaked overnight with almond milk, topped with banana slices and almond butter.',
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    calories: 380,
    ingredients: [
      '1/2 cup rolled oats',
      '1/2 cup almond milk',
      '1/4 cup Greek yogurt',
      '1 tbsp chia seeds',
      '1 banana',
      '2 tbsp almond butter',
      '1 tbsp honey',
    ],
    instructions: [
      'Combine oats, milk, yogurt, and chia seeds in a jar.',
      'Refrigerate overnight.',
      'Top with sliced banana and almond butter.',
      'Drizzle with honey before serving.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=800&auto=format&fit=crop',
    tags: ['meal-prep', 'healthy', 'no-cook'],
  },
  {
    id: 'b6',
    title: 'Breakfast Burrito',
    mealType: 'breakfast',
    description:
      'A hearty flour tortilla stuffed with scrambled eggs, crispy bacon, cheese, and fresh salsa.',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    calories: 520,
    ingredients: [
      '2 large flour tortillas',
      '4 eggs',
      '4 strips bacon',
      '1/2 cup shredded cheese',
      '1/4 cup salsa',
      'Sour cream',
      'Fresh cilantro',
    ],
    instructions: [
      'Cook bacon until crispy, set aside.',
      'Scramble eggs in bacon fat.',
      'Warm tortillas.',
      'Fill with eggs, bacon, cheese, and salsa.',
      'Roll up and serve with sour cream.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop',
    tags: ['hearty', 'protein', 'mexican'],
  },
  {
    id: 'b7',
    title: 'Acai Bowl',
    mealType: 'breakfast',
    description:
      'A vibrant purple smoothie bowl topped with fresh fruits, coconut flakes, and crunchy granola.',
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    calories: 350,
    ingredients: [
      '2 acai packets',
      '1 frozen banana',
      '1/2 cup almond milk',
      'Fresh strawberries',
      'Granola',
      'Coconut flakes',
      'Honey',
    ],
    instructions: [
      'Blend acai, banana, and almond milk until thick.',
      'Pour into a bowl.',
      'Top with sliced strawberries, granola, and coconut.',
      'Drizzle with honey.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop',
    tags: ['superfood', 'vegan', 'refreshing'],
  },
  {
    id: 'b8',
    title: 'French Toast',
    mealType: 'breakfast',
    description:
      'Classic French toast made with brioche, dusted with powdered sugar and served with fresh berries.',
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    calories: 420,
    ingredients: [
      '4 slices brioche bread',
      '2 eggs',
      '1/2 cup milk',
      '1 tsp vanilla extract',
      '1 tsp cinnamon',
      'Butter',
      'Powdered sugar',
      'Fresh berries',
    ],
    instructions: [
      'Whisk eggs, milk, vanilla, and cinnamon.',
      'Dip bread slices in mixture.',
      'Cook in buttered pan until golden on both sides.',
      'Dust with powdered sugar and serve with berries.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&auto=format&fit=crop',
    tags: ['sweet', 'classic', 'indulgent'],
  },
]

export const lunchRecipes: Recipe[] = [
  {
    id: 'l1',
    title: 'Mediterranean Quinoa Bowl',
    mealType: 'lunch',
    description:
      'A colorful bowl of fluffy quinoa with cucumber, tomatoes, olives, feta, and lemon herb dressing.',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    calories: 420,
    ingredients: [
      '1 cup quinoa',
      'Cherry tomatoes',
      'Cucumber',
      'Kalamata olives',
      'Feta cheese',
      'Red onion',
      'Lemon juice',
      'Olive oil',
      'Fresh herbs',
    ],
    instructions: [
      'Cook quinoa according to package directions.',
      'Dice cucumber, halve tomatoes, slice onion.',
      'Combine vegetables with cooled quinoa.',
      'Add olives and crumbled feta.',
      'Dress with lemon juice and olive oil.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
    tags: ['healthy', 'mediterranean', 'vegetarian'],
  },
  {
    id: 'l2',
    title: 'Grilled Chicken Caesar Salad',
    mealType: 'lunch',
    description:
      'Crisp romaine lettuce with grilled chicken, parmesan, croutons, and creamy Caesar dressing.',
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    calories: 480,
    ingredients: [
      '2 chicken breasts',
      'Romaine lettuce',
      'Parmesan cheese',
      'Croutons',
      'Caesar dressing',
      'Lemon',
      'Olive oil',
    ],
    instructions: [
      'Season and grill chicken until cooked through.',
      'Chop romaine lettuce.',
      'Slice grilled chicken.',
      'Toss lettuce with dressing.',
      'Top with chicken, parmesan, and croutons.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&auto=format&fit=crop',
    tags: ['protein', 'classic', 'salad'],
  },
  {
    id: 'l3',
    title: 'Spicy Tuna Poke Bowl',
    mealType: 'lunch',
    description:
      'Fresh ahi tuna cubes with sushi rice, avocado, edamame, and spicy mayo drizzle.',
    prepTime: 20,
    cookTime: 20,
    servings: 2,
    calories: 520,
    ingredients: [
      '1/2 lb sushi-grade tuna',
      'Sushi rice',
      'Avocado',
      'Edamame',
      'Cucumber',
      'Soy sauce',
      'Sesame oil',
      'Sriracha mayo',
      'Sesame seeds',
    ],
    instructions: [
      'Cook sushi rice and let cool.',
      'Cube tuna and marinate in soy sauce and sesame oil.',
      'Slice avocado and cucumber.',
      'Assemble bowls with rice and toppings.',
      'Drizzle with spicy mayo and sesame seeds.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
    tags: ['asian', 'seafood', 'fresh'],
  },
  {
    id: 'l4',
    title: 'Caprese Panini',
    mealType: 'lunch',
    description:
      'Warm pressed sandwich with fresh mozzarella, ripe tomatoes, basil, and balsamic glaze.',
    prepTime: 10,
    cookTime: 8,
    servings: 1,
    calories: 450,
    ingredients: [
      'Ciabatta bread',
      'Fresh mozzarella',
      'Ripe tomatoes',
      'Fresh basil',
      'Balsamic glaze',
      'Olive oil',
      'Salt and pepper',
    ],
    instructions: [
      'Slice ciabatta and brush with olive oil.',
      'Layer mozzarella, tomato slices, and basil.',
      'Season with salt and pepper.',
      'Press in panini maker until golden.',
      'Drizzle with balsamic glaze.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop',
    tags: ['italian', 'vegetarian', 'quick'],
  },
  {
    id: 'l5',
    title: 'Thai Chicken Lettuce Wraps',
    mealType: 'lunch',
    description:
      'Savory ground chicken with Thai spices served in crisp butter lettuce cups.',
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    calories: 320,
    ingredients: [
      '1 lb ground chicken',
      'Butter lettuce',
      'Soy sauce',
      'Fish sauce',
      'Lime juice',
      'Garlic',
      'Ginger',
      'Green onions',
      'Cilantro',
      'Peanuts',
    ],
    instructions: [
      'Cook ground chicken with garlic and ginger.',
      'Add soy sauce, fish sauce, and lime juice.',
      'Separate lettuce leaves.',
      'Fill leaves with chicken mixture.',
      'Top with green onions, cilantro, and peanuts.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1529059997568-3d847b1154f0?w=800&auto=format&fit=crop',
    tags: ['thai', 'low-carb', 'fresh'],
  },
  {
    id: 'l6',
    title: 'Butternut Squash Soup',
    mealType: 'lunch',
    description:
      'Velvety smooth roasted butternut squash soup with a hint of sage and cream.',
    prepTime: 15,
    cookTime: 40,
    servings: 4,
    calories: 280,
    ingredients: [
      '1 butternut squash',
      'Onion',
      'Garlic',
      'Vegetable broth',
      'Heavy cream',
      'Fresh sage',
      'Nutmeg',
      'Olive oil',
    ],
    instructions: [
      'Roast cubed butternut squash until tender.',
      'Sauté onion and garlic.',
      'Add squash and broth, simmer.',
      'Blend until smooth.',
      'Stir in cream and season with sage and nutmeg.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&auto=format&fit=crop',
    tags: ['soup', 'comfort', 'vegetarian'],
  },
  {
    id: 'l7',
    title: 'Falafel Wrap',
    mealType: 'lunch',
    description:
      'Crispy homemade falafel in warm pita with hummus, pickled vegetables, and tahini sauce.',
    prepTime: 20,
    cookTime: 15,
    servings: 2,
    calories: 480,
    ingredients: [
      'Canned chickpeas',
      'Fresh herbs',
      'Garlic',
      'Cumin',
      'Pita bread',
      'Hummus',
      'Pickled vegetables',
      'Tahini sauce',
      'Lettuce',
    ],
    instructions: [
      'Blend chickpeas with herbs, garlic, and cumin.',
      'Form into patties and fry until golden.',
      'Warm pita bread.',
      'Spread hummus on pita.',
      'Add falafel, vegetables, and tahini.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=800&auto=format&fit=crop',
    tags: ['middle-eastern', 'vegan', 'protein'],
  },
  {
    id: 'l8',
    title: 'Shrimp Tacos',
    mealType: 'lunch',
    description:
      'Zesty lime-marinated shrimp in corn tortillas with cabbage slaw and chipotle crema.',
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    calories: 380,
    ingredients: [
      '1 lb shrimp',
      'Corn tortillas',
      'Purple cabbage',
      'Lime',
      'Chipotle peppers',
      'Sour cream',
      'Cilantro',
      'Avocado',
    ],
    instructions: [
      'Marinate shrimp in lime juice and spices.',
      'Make slaw with shredded cabbage and lime.',
      'Blend chipotle with sour cream for crema.',
      'Sauté shrimp until pink.',
      'Assemble tacos with all toppings.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&auto=format&fit=crop',
    tags: ['mexican', 'seafood', 'fresh'],
  },
]

export const dinnerRecipes: Recipe[] = [
  {
    id: 'd1',
    title: 'Herb-Crusted Salmon',
    mealType: 'dinner',
    description:
      'Perfectly baked salmon with a crispy herb crust, served with roasted asparagus and lemon.',
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    calories: 480,
    ingredients: [
      '2 salmon fillets',
      'Fresh herbs (dill, parsley)',
      'Panko breadcrumbs',
      'Dijon mustard',
      'Asparagus',
      'Lemon',
      'Olive oil',
      'Garlic',
    ],
    instructions: [
      'Mix herbs with panko and olive oil.',
      'Brush salmon with Dijon mustard.',
      'Press herb mixture onto salmon.',
      'Bake at 400°F for 15-18 minutes.',
      'Serve with roasted asparagus and lemon.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop',
    tags: ['seafood', 'healthy', 'elegant'],
  },
  {
    id: 'd2',
    title: 'Beef Stir-Fry',
    mealType: 'dinner',
    description:
      'Tender strips of beef with colorful vegetables in a savory ginger-soy sauce over rice.',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    calories: 520,
    ingredients: [
      '1 lb flank steak',
      'Bell peppers',
      'Broccoli',
      'Snap peas',
      'Soy sauce',
      'Ginger',
      'Garlic',
      'Sesame oil',
      'Rice',
    ],
    instructions: [
      'Slice beef against the grain.',
      'Stir-fry beef in hot wok, set aside.',
      'Cook vegetables until crisp-tender.',
      'Return beef, add sauce.',
      'Serve over steamed rice.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop',
    tags: ['asian', 'quick', 'protein'],
  },
  {
    id: 'd3',
    title: 'Creamy Tuscan Chicken',
    mealType: 'dinner',
    description:
      'Pan-seared chicken breasts in a rich sun-dried tomato and spinach cream sauce.',
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    calories: 550,
    ingredients: [
      '4 chicken breasts',
      'Sun-dried tomatoes',
      'Spinach',
      'Heavy cream',
      'Parmesan cheese',
      'Garlic',
      'Italian herbs',
      'Olive oil',
    ],
    instructions: [
      'Season and sear chicken until golden.',
      'Sauté garlic and sun-dried tomatoes.',
      'Add cream and parmesan.',
      'Stir in spinach until wilted.',
      'Return chicken to sauce and simmer.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop',
    tags: ['italian', 'creamy', 'comfort'],
  },
  {
    id: 'd4',
    title: 'Vegetable Pad Thai',
    mealType: 'dinner',
    description:
      'Classic Thai rice noodles with tofu, bean sprouts, peanuts, and tangy tamarind sauce.',
    prepTime: 20,
    cookTime: 15,
    servings: 3,
    calories: 450,
    ingredients: [
      'Rice noodles',
      'Firm tofu',
      'Bean sprouts',
      'Green onions',
      'Eggs',
      'Tamarind paste',
      'Fish sauce',
      'Peanuts',
      'Lime',
    ],
    instructions: [
      'Soak rice noodles in warm water.',
      'Press and cube tofu, fry until crispy.',
      'Scramble eggs in wok.',
      'Add noodles and sauce, toss.',
      'Top with peanuts, sprouts, and lime.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&auto=format&fit=crop',
    tags: ['thai', 'vegetarian', 'noodles'],
  },
  {
    id: 'd5',
    title: 'Lamb Chops with Mint',
    mealType: 'dinner',
    description:
      'Perfectly grilled lamb chops with fresh mint chimichurri and roasted baby potatoes.',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    calories: 620,
    ingredients: [
      '4 lamb chops',
      'Fresh mint',
      'Parsley',
      'Garlic',
      'Red wine vinegar',
      'Baby potatoes',
      'Olive oil',
      'Rosemary',
    ],
    instructions: [
      'Make chimichurri with mint, parsley, garlic, and vinegar.',
      'Season lamb chops with salt and pepper.',
      'Roast baby potatoes with rosemary.',
      'Grill lamb to desired doneness.',
      'Serve with chimichurri and potatoes.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop',
    tags: ['elegant', 'protein', 'special-occasion'],
  },
  {
    id: 'd6',
    title: 'Mushroom Risotto',
    mealType: 'dinner',
    description:
      'Creamy arborio rice slowly cooked with wild mushrooms, white wine, and parmesan.',
    prepTime: 10,
    cookTime: 35,
    servings: 4,
    calories: 480,
    ingredients: [
      'Arborio rice',
      'Mixed mushrooms',
      'White wine',
      'Vegetable broth',
      'Parmesan cheese',
      'Shallots',
      'Butter',
      'Fresh thyme',
    ],
    instructions: [
      'Sauté mushrooms until golden, set aside.',
      'Toast rice with shallots.',
      'Add wine and stir until absorbed.',
      'Gradually add broth, stirring constantly.',
      'Fold in mushrooms, butter, and parmesan.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&auto=format&fit=crop',
    tags: ['italian', 'vegetarian', 'comfort'],
  },
  {
    id: 'd7',
    title: 'BBQ Pulled Pork',
    mealType: 'dinner',
    description:
      'Slow-cooked pork shoulder in smoky BBQ sauce, served on brioche buns with coleslaw.',
    prepTime: 15,
    cookTime: 6,
    servings: 8,
    calories: 580,
    ingredients: [
      'Pork shoulder',
      'BBQ sauce',
      'Brown sugar',
      'Paprika',
      'Garlic powder',
      'Brioche buns',
      'Coleslaw mix',
      'Apple cider vinegar',
    ],
    instructions: [
      'Rub pork with spices and brown sugar.',
      'Slow cook for 6 hours until tender.',
      'Shred pork and mix with BBQ sauce.',
      'Make tangy coleslaw.',
      'Serve on toasted brioche buns.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop',
    tags: ['bbq', 'slow-cooker', 'american'],
  },
  {
    id: 'd8',
    title: 'Eggplant Parmesan',
    mealType: 'dinner',
    description:
      'Layers of breaded eggplant, marinara sauce, and melted mozzarella baked to perfection.',
    prepTime: 30,
    cookTime: 45,
    servings: 6,
    calories: 420,
    ingredients: [
      '2 large eggplants',
      'Marinara sauce',
      'Mozzarella cheese',
      'Parmesan cheese',
      'Eggs',
      'Breadcrumbs',
      'Fresh basil',
      'Olive oil',
    ],
    instructions: [
      'Slice and salt eggplant to remove moisture.',
      'Bread eggplant slices and fry until golden.',
      'Layer eggplant, sauce, and cheese in baking dish.',
      'Repeat layers.',
      'Bake until bubbly and golden.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&auto=format&fit=crop',
    tags: ['italian', 'vegetarian', 'comfort'],
  },
]

export const allRecipes = [
  ...breakfastRecipes,
  ...lunchRecipes,
  ...dinnerRecipes,
]

export function getRandomRecipe(
  mealType: 'breakfast' | 'lunch' | 'dinner',
): Recipe {
  const recipes =
    mealType === 'breakfast'
      ? breakfastRecipes
      : mealType === 'lunch'
        ? lunchRecipes
        : dinnerRecipes
  return recipes[Math.floor(Math.random() * recipes.length)]
}

export function getRecommendedRecipes(
  currentRecipe: Recipe,
  count: number = 3,
): Recipe[] {
  const sameTypeRecipes = allRecipes.filter(
    (r) => r.mealType === currentRecipe.mealType && r.id !== currentRecipe.id,
  )

  // Score recipes by matching tags
  const scored = sameTypeRecipes.map((recipe) => ({
    recipe,
    score: recipe.tags.filter((tag) => currentRecipe.tags.includes(tag)).length,
  }))

  // Sort by score (highest first) and take top N
  scored.sort((a, b) => b.score - a.score)

  return scored.slice(0, count).map((s) => s.recipe)
}

export function generateWeeklyPlan(): {
  day: string
  breakfast: Recipe
  lunch: Recipe
  dinner: Recipe
}[] {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  // Track used recipes to avoid duplicates
  const usedBreakfast = new Set<string>()
  const usedLunch = new Set<string>()
  const usedDinner = new Set<string>()

  return days.map((day) => {
    let breakfast = getRandomRecipe('breakfast')
    while (
      usedBreakfast.has(breakfast.id) &&
      usedBreakfast.size < breakfastRecipes.length
    ) {
      breakfast = getRandomRecipe('breakfast')
    }
    usedBreakfast.add(breakfast.id)

    let lunch = getRandomRecipe('lunch')
    while (usedLunch.has(lunch.id) && usedLunch.size < lunchRecipes.length) {
      lunch = getRandomRecipe('lunch')
    }
    usedLunch.add(lunch.id)

    let dinner = getRandomRecipe('dinner')
    while (
      usedDinner.has(dinner.id) &&
      usedDinner.size < dinnerRecipes.length
    ) {
      dinner = getRandomRecipe('dinner')
    }
    usedDinner.add(dinner.id)

    return { day, breakfast, lunch, dinner }
  })
}

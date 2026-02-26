import {
  mysqlTable,
  serial,
  varchar,
  timestamp,
  text,
  int,
} from 'drizzle-orm/mysql-core'

export const mealPlans = mysqlTable('meal_plans', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  weekStart: timestamp('week_start').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})

export const meals = mysqlTable('meals', {
  id: serial('id').primaryKey(),
  mealPlanId: int('meal_plan_id').notNull(),
  dayOfWeek: varchar('day_of_week', { length: 20 }).notNull(),
  mealType: varchar('meal_type', { length: 20 }).notNull(),
  recipeId: varchar('recipe_id', { length: 255 }),
  recipeName: varchar('recipe_name', { length: 255 }).notNull(),
  ingredients: text('ingredients'),
  instructions: text('instructions'),
  imageUrl: varchar('image_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow(),
})

export const recipes = mysqlTable('recipes', {
  id: serial('id').primaryKey(),
  externalId: varchar('external_id', { length: 255 }).unique(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  ingredients: text('ingredients'),
  instructions: text('instructions'),
  imageUrl: varchar('image_url', { length: 500 }),
  prepTime: int('prep_time'),
  cookTime: int('cook_time'),
  servings: int('servings'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const userLimits = mysqlTable('user_limits', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull().unique(),
  generationLimit: int('generation_limit').notNull().default(5),
  generationUsed: int('generation_used').notNull().default(0),
  lastResetAt: timestamp('last_reset_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})

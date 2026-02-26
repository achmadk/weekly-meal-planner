import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  integer,
} from 'drizzle-orm/pg-core'

export const mealPlans = pgTable('meal_plans', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  weekStart: timestamp('week_start').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
})

export const meals = pgTable('meals', {
  id: serial('id').primaryKey(),
  mealPlanId: integer('meal_plan_id').notNull(),
  dayOfWeek: varchar('day_of_week', { length: 20 }).notNull(),
  mealType: varchar('meal_type', { length: 20 }).notNull(),
  recipeId: varchar('recipe_id', { length: 255 }),
  recipeName: varchar('recipe_name', { length: 255 }).notNull(),
  ingredients: text('ingredients'),
  instructions: text('instructions'),
  imageUrl: varchar('image_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow(),
})

export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  externalId: varchar('external_id', { length: 255 }).unique(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  ingredients: text('ingredients'),
  instructions: text('instructions'),
  imageUrl: varchar('image_url', { length: 500 }),
  prepTime: integer('prep_time'),
  cookTime: integer('cook_time'),
  servings: integer('servings'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const userLimits = pgTable('user_limits', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull().unique(),
  generationLimit: integer('generation_limit').notNull().default(5),
  generationUsed: integer('generation_used').notNull().default(0),
  lastResetAt: timestamp('last_reset_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
})

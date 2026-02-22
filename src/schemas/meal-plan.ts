import { imageSchema } from '@/tools/image';
import { z } from 'zod';

export const RecipeSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    calories: z.number(),
    servings: z.number(),
    prepTime: z.number(),
    cookTime: z.number(),
    image: z.string().nullable(),
    ingredients: z.array(z.string()),
    instructions: z.array(z.string()),
    tags: z.array(z.string()).min(5),
    mealType: z.enum(['breakfast', 'lunch', 'dinner']),
});

export const DayPlanSchema = z.object({
    day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
    breakfast: RecipeSchema,
    lunch: RecipeSchema,
    dinner: RecipeSchema,
});

export const WeeklyPlanSchema = z.object({
    plan: z.array(DayPlanSchema),
});

export type Recipe = z.infer<typeof RecipeSchema>;
export type DayPlan = z.infer<typeof DayPlanSchema>;
export type WeeklyPlan = z.infer<typeof WeeklyPlanSchema>;

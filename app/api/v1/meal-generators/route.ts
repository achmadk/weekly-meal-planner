import { Output, streamText } from 'ai';
import { WeeklyPlanSchema } from '@/schemas/meal-plan';
import { model } from '@/server/agent';
import { setWaitUntil } from '@voltagent/core';
import { after } from 'next/server';

export const maxDuration = 60;

export const runtime = 'edge'

export async function POST(req: Request) {
    try {
        setWaitUntil(after);
        const result = streamText({
            model,
            output: Output.object({
                schema: WeeklyPlanSchema,
            }),
            system: `You are a specialized meal planning assistant. 
    Your goal is to help users generate delicious, healthy weekly meal plans for breakfast, lunch, and dinner.
    Generate a complete 7-day plan.
    For each recipe, provide a creative title, description, realistic calories, preparation time, ingredients, instructions, and tags.
    IMPORTANT: Use the 'recipeImageTool' to find a high-quality real image for each recipe and populate the 'imageUrl' field with the URL returned by the tool.
    Be creative and ensure variety across the week.`,
            prompt: 'Generate a weekly meal plan.',
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
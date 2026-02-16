import { Output } from 'ai';
import { WeeklyPlanSchema } from '@/schemas/meal-plan';
import { mealAgent } from '@/server/agent';
import { setWaitUntil } from '@voltagent/core';
import { after } from 'next/server';

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        setWaitUntil(after);
        const result = await mealAgent.streamText("Generate a complete 7-day plan!", {
            output: Output.object({
                schema: WeeklyPlanSchema,
            }),
        })
        return result.toTextStreamResponse();
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
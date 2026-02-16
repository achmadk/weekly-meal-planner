import { Agent, VoltAgent } from "@voltagent/core";
import { recipeImageTool } from "@/tools/image";
import { createOpenAI } from "@ai-sdk/openai";
import { honoServer } from "@voltagent/server-hono";

const deploymentMode = process.env.DEPLOYMENT_MODE ?? "local";

const openAI = createOpenAI({
  baseURL: "https://ai.sumopod.com",
  apiKey: process.env.OPENAI_API_KEY,
})

// export const model = openAI.responses("gpt-4o-mini")
export const model = openAI.responses("gpt-4.1")

// Define the meal planning agent
export const mealAgent = new Agent({
  name: "meal-agent",
  purpose: "A helpful agent that generates meal plans, its recipes, and grocery lists.",
  model,
  instructions: `You are a specialized meal planning assistant. 
  Your goal is to help users generate delicious, healthy meal plans for the breakfast, lunch, and dinner for a week, find recipes, and organize their grocery lists.
  Be creative, consider dietary restrictions if mentioned, and provide clear, structured output.`
  // IMPORTANT: Use the 'recipeImageTool' to find a high-quality real image for each recipe and populate the 'image' field with the URL returned by the tool.`,
  // tools: [recipeImageTool],
});

// Initialize the VoltAgent server instance
new VoltAgent({
  agents: { mealAgent },
  server: honoServer({
    port: 3141,
  }),
});

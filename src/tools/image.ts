
import { createTool } from "@voltagent/core";
import { z } from "zod";
import { searchPhotos, trackDownload } from "@/lib/unsplash";

export const imageSchema = z.object({
    url: z.string().describe("The URL of the high-quality food image."),
    username: z.string().describe("The complete of the image owner."),
    user_id: z.string().describe("The unsplash ID name of the image owner."),
}).nullable()

export const recipeImageTool = createTool({
    id: "recipe-image-tool",
    name: "recipe-image-tool",
    description: "Search for a high-quality food image for a given recipe query, and then return the image URL, username, and user ID.",
    parameters: z.object({
        query: z.string().describe("The name of the recipe or food item to search for."),
    }),
    execute: async ({ query }) => {
        const image = await searchPhotos(query);

        if (!image) {
            return null;
        }

        if (image.downloadLink) {
            // Fire and forget tracking as per Unsplash guidelines when hotlinking/displaying
            trackDownload(image.downloadLink).catch((e) =>
                console.error("Tracking failed", e)
            );
        }

        return {
            url: image.url,
            username: image.author.name,
            user_id: image.author.username
        }
    },
});

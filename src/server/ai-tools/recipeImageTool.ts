import { createTool } from "@voltagent/core";
import { z } from "zod";
import { searchPhotos, trackDownload } from "@/lib/unsplash";

export const recipeImageTool = createTool({
    name: "recipe-image-tool",
    description: "Search for a high-quality food image for a given recipe query.",
    parameters: z.object({
        query: z.string().describe("The name of the recipe or food item to search for."),
    }),
    execute: async ({ query }) => {
        const image = await searchPhotos(query);

        if (!image) {
            return "No image found.";
        }

        if (image.downloadLink) {
            // Fire and forget tracking as per Unsplash guidelines when hotlinking/displaying
            trackDownload(image.downloadLink).catch((e) =>
                console.error("Tracking failed", e)
            );
        }

        return image.url;
    },
});
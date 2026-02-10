"use client";

import { useState, useEffect } from 'react';
import { Recipe } from '@/components/meal-planner/types';
import { SearchPhotoResponse } from '@/lib/unsplash';

export type ImageAttribution = {
  imgName: string
  imgLink: string
  providerLink: string
}

export function useRecipeImage<
    Result extends SearchPhotoResponse = SearchPhotoResponse
>(recipe: Recipe, isCompleted: boolean) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [attribution, setAttribution] = useState<ImageAttribution | null>(null);
    const [triggerLoadImage, setTriggerLoadImage] = useState(false);

    const loadImage = async () => {
        try {
            const response = await fetch(`/api/v1/images?query=${recipe.description}`);
            const data = await response.json() as Result;
            setImageUrl(data.url);
            setAttribution({
                imgName: data.author.name,
                imgLink: data.author.link,
                providerLink: "https://unsplash.com/?utm_source=weekly_meal_planner&utm_medium=referral",
            });
        } finally {
            setTriggerLoadImage(false);
        }
    }

    useEffect(() => {
        if (isCompleted) {
            setTriggerLoadImage(true);
        }
    }, [isCompleted]);

    useEffect(() => {
        if (triggerLoadImage) {
            loadImage();
        }
    }, [triggerLoadImage]);

    return { imageUrl, attribution };
}

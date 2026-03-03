import { createStore } from "idb-keyval";

export const publicUserStore = createStore("wmp-store", "public_user");

export const userSavedMealsStore = createStore("wmp-store", "user_saved_meals");
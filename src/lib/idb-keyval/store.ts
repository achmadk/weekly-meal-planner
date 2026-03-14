import { createStore } from "idb-keyval";

export const publicUserStore = createStore("wmp-public-user-db", "keyval");

export const userSavedMealsStore = createStore("wmp-signed-user-meals-db", "keyval");
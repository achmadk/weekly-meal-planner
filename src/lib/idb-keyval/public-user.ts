import { clear, entries, keys, set } from "idb-keyval"
import { v7 } from "uuid"

import { publicUserStore } from "./store";

export const DEFAULT_REMAINING_COUNT = 7

export async function setStoredRemainingCount(remainingCount: number) {
    const publicUserKeys = await keys(publicUserStore);
    await set(publicUserKeys.length === 0 ? `public_user_${v7()}` : publicUserKeys[0], remainingCount, publicUserStore);
}

export async function getRemainingCount() {
    const storedPublicUsers = await entries(publicUserStore);
    console.log(storedPublicUsers);
    if (storedPublicUsers.length === 1) {
        return storedPublicUsers[0][1];
    }
    await set(`public_user_${v7()}`, DEFAULT_REMAINING_COUNT, publicUserStore);
    return DEFAULT_REMAINING_COUNT;
}

export async function getStoredPublicUserKeys() {
    const storedPublicUserKeys = await keys(publicUserStore);
    return storedPublicUserKeys.length;
}

export async function clearStoredPublicUsers() {
    await clear(publicUserStore);
}
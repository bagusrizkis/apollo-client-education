import { makeVar } from "@apollo/client";

export const message = makeVar("Hello Variable Reactive");
export const bookmarkedUser = makeVar([]);
export const blockedUser = makeVar([]);

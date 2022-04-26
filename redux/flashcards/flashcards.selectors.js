import { createSelector } from "reselect";

const selectFlashcardsReducer = state => state.flashcards;

export const selectFlashcards = createSelector(
    [selectFlashcardsReducer],
    (flashcardsSlice) => flashcardsSlice.flashcards,
);

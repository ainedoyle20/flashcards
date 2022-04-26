import FlashcardActionTypes from "./flashcards.types";

export const setFlashcardList = (flashcardList) => ({
    type: FlashcardActionTypes.SET_FLASHCARD_LIST,
    payload: flashcardList,
});

export const addReduxFlashcard = (flashcard) => ({
    type: FlashcardActionTypes.ADD_FLASHCARD,
    payload: flashcard,
});

export const deleteReduxFlashcard = (flashcardQuestion) => ({
    type: FlashcardActionTypes.DELETE_FLASHCARD,
    payload: flashcardQuestion,
});

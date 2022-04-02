import DecksActionTypes from "./decks.types";

export const setSpecificDeckId = (specificDeckId) => ({
    type: DecksActionTypes.SET_SPECIFIC_DECK_ID,
    payload: specificDeckId,
});

export const setDeckList = (deckList) => ({
    type: DecksActionTypes.SET_DECK_LIST,
    payload: deckList,
});

export const addReduxDeck = (createdDeck) => ({
    type: DecksActionTypes.ADD_DECK,
    payload: createdDeck,
});

export const deleteReduxDeck = (deckId) => ({
    type: DecksActionTypes.DELETE_DECK,
    payload: deckId,
});

export const editReduxDeck = (deckData) => ({
    type: DecksActionTypes.EDIT_DECK,
    payload: deckData,
});

export const setFlashcardList = (flashcardList) => ({
    type: DecksActionTypes.SET_FLASHCARD_LIST,
    payload: flashcardList,
});

export const addReduxFlashcard = (flashcard) => ({
    type: DecksActionTypes.ADD_FLASHCARD,
    payload: flashcard,
});

export const deleteReduxFlashcard = (flashcardQuestion) => ({
    type: DecksActionTypes.DELETE_FLASHCARD,
    payload: flashcardQuestion,
});

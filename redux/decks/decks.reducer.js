import DecksActionTypes from './decks.types';

import { editReduxDeckHelper, addReduxFlashcardHelper } from './decks.utils';

const INITIAL_STATE = {
    specificDeckId: null,
    deckList: [],
    flashcardList: [],
}

const decksReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case DecksActionTypes.SET_SPECIFIC_DECK_ID:
            return {
                ...state,
                specificDeckId: action.payload,
            }
        case DecksActionTypes.SET_DECK_LIST:
            return {
                ...state,
                deckList: action.payload,
            }
        case DecksActionTypes.ADD_DECK:
            return {
                ...state,
                deckList: [...state.deckList, action.payload],
            }
        case DecksActionTypes.DELETE_DECK:
            return {
                ...state,
                deckList: state.deckList.filter(deck => deck.id !== action.payload),
            }
        case DecksActionTypes.EDIT_DECK:
            return {
                ...state,
                deckList: editReduxDeckHelper(state.deckList, action.payload),
            }
        case DecksActionTypes.SET_FLASHCARD_LIST:
            return {
                ...state,
                flashcardList: action.payload,
            }
        case DecksActionTypes.ADD_FLASHCARD:
            return {
                ...state,
                flashcardList: addReduxFlashcardHelper(state.flashcardList, action.payload),
            }
        case DecksActionTypes.DELETE_FLASHCARD:
            return {
                ...state,
                flashcardList: state.flashcardList.filter(flashcard => flashcard.question !== action.payload),
            }
        default:
            return state;
    }
}

export default decksReducer;

import FlashcardActionTypes from './flashcards.types';

import { addReduxFlashcardHelper } from '../decks/decks.utils';

const INITIAL_STATE = {
    flashcards: [],
}

const flashcardsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FlashcardActionTypes.SET_FLASHCARD_LIST:
            return {
                ...state,
                flashcards: action.payload,
            }
        case FlashcardActionTypes.ADD_FLASHCARD:
            return {
                ...state,
                flashcards: addReduxFlashcardHelper(state.flashcards, action.payload),
            }
        case FlashcardActionTypes.DELETE_FLASHCARD:
            return {
                ...state,
                flashcards: state.flashcards.filter(flashcard => flashcard.question !== action.payload),
            }
        default:
            return state;
    }
}

export default flashcardsReducer;

import DecksActionTypes from './decks.types';

const INITIAL_STATE = {
    specificDeckId: null,
}

const decksReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case DecksActionTypes.SET_SPECIFIC_DECK_ID:
            return {
                ...state,
                specificDeckId: action.payload,
            }
        default:
            return state;
    }
}

export default decksReducer;

import DecksActionTypes from './decks.types';

import { editHelper } from './decks.utils';

const INITIAL_STATE = {
    specificDeck: null,
    decksObject: {},
    isDecksLoading: false,
    error: null,
}

const decksReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case DecksActionTypes.SET_SPECIFIC_DECK:
            return {
                ...state,
                specificDeck: action.payload,
            }
        case DecksActionTypes.FETCH_DECKS_START: 
            return {
                ...state,
                isDecksLoading: true,
            }
        case DecksActionTypes.FETCH_DECKS_SUCCESS:
            return {
                ...state,
                error: null,
                isDecksLoading: false,
                decksObject: action.payload,
            }
        case DecksActionTypes.FETCH_DECKS_FAILED:
            return {
                ...state,
                isDecksLoading: false,
                error: action.payload,
            }
        case DecksActionTypes.ADD_DECK:
            return {
                ...state,
                decksObject: {...state.decksObject, [action.payload.id]: action.payload},
            }
        case DecksActionTypes.DELETE_DECK:
            return {
                ...state,
                decksObject: Object.keys(state.decksObject)
                    .filter(key => key !== action.payload)
                    .reduce((obj,key) => {
                        obj[key] = state.decksObject[key]
                        return obj;
                    }, {}),
            }
        case DecksActionTypes.EDIT_DECK:
            return {
                ...state,
                decksObject: editHelper(state.decksObject, action.payload),
            }
        default:
            return state;
    }
}

export default decksReducer;

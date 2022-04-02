import PublicDecksActionTypes from "./public-decks.types";

import { editReduxPublicDeckHelper } from "./public-decks.utils";

const INITIAL_STATE = {
    publicDecksList: [],
}

const publicDecksReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case PublicDecksActionTypes.SET_PUBLICDECKS_LIST:
            return {
                ...state,
                publicDecksList: action.payload,
            }
        case PublicDecksActionTypes.ADD_PUBLIC_DECK:
            return {
                ...state,
                publicDecksList: [ ...state.publicDecksList, action.payload],
            }
        case PublicDecksActionTypes.DELETE_PUBLIC_DECK:
            return {
                ...state,
                publicDecksList: state.publicDecksList.filter(publicDeck => publicDeck.id !== action.payload),
            }
        case PublicDecksActionTypes.EDIT_PUBLIC_DECK:
            return {
                ...state,
                publicDecksList: editReduxPublicDeckHelper(state.publicDecksList, action.payload),
            }
        default:
            return state;
    }
}

export default publicDecksReducer;

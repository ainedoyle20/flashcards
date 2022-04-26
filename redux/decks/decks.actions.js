import DecksActionTypes from "./decks.types";

import { getDecks, getPublicDecks } from '../../firebase/firebase.utils';

export const setSpecificDeck = (specificDeck) => ({
    type: DecksActionTypes.SET_SPECIFIC_DECK,
    payload: specificDeck,
});

export const fetchDecksStart = () => ({
    type: DecksActionTypes.FETCH_DECKS_START,
});

export const fetchDecksSuccess = (decksObject) => ({
    type: DecksActionTypes.FETCH_DECKS_SUCCESS,
    payload: decksObject,
});

export const fetchDecksFailed = (error) => ({
    type: DecksActionTypes.FETCH_DECKS_FAILED,
    payload: error,
});

export const fetchPrivateDecksAsync = (currentUserId) => {
    return async (dispatch) => {
        dispatch(fetchDecksStart());

        try {
            const decksObject = await getDecks(currentUserId);
            dispatch(fetchDecksSuccess(decksObject));
        } catch (error) {
            dispatch(fetchDecksFailed(error));
        }
    }
}

export const fetchPublicDecksAsync = () => {
    return async (dispatch) => {
        dispatch(fetchDecksStart());

        try {
            const decksObject = await getPublicDecks();
            dispatch(fetchDecksSuccess(decksObject));
        } catch (error) {
            dispatch(fetchDecksFailed(error));
        }
    }
}

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

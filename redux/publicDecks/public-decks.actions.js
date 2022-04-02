import PublicDecksActionTypes from './public-decks.types';

export const setPublicDecksList = (publicDecksList) => ({
    type: PublicDecksActionTypes.SET_PUBLICDECKS_LIST,
    payload: publicDecksList,
});

export const addReduxPublicDeck = (createdPublicDeck) => ({
    type: PublicDecksActionTypes.ADD_PUBLIC_DECK,
    payload: createdPublicDeck,
});

export const deleteReduxPublicDeck = (pubicDeckId) => ({
    type: PublicDecksActionTypes.DELETE_PUBLIC_DECK,
    payload: pubicDeckId,
});

export const editReduxPublicDeck = (publicDeckData) => ({
    type: PublicDecksActionTypes.EDIT_PUBLIC_DECK,
    payload: publicDeckData,
});

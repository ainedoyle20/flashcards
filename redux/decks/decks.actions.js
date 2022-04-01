import DecksActionTypes from "./decks.types";

export const setSpecificDeckId = (specificDeckId) => ({
    type: DecksActionTypes.SET_SPECIFIC_DECK_ID,
    payload: specificDeckId,
});

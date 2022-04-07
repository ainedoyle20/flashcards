import ModalsActionTypes from "./modals-types";

export const toggleDeckModal = () => ({
    type: ModalsActionTypes.TOGGLE_DECK_MODAL,
});

export const toggleFlashcardModal = () => ({
    type: ModalsActionTypes.TOGGLE_FLASHCARD_MODAL,
});

export const toggleDeleteDeckModal = (deleteVals) => ({
    type: ModalsActionTypes.TOGGLE_DELETE_DECK_MODAL,
    payload: deleteVals,
});

export const setEditModalVal = (deckId) => ({
    type: ModalsActionTypes.SET_EDIT_MODAL_VAL,
    payload: deckId,
});

export const toggleErrorModal = () => ({
    type: ModalsActionTypes.TOGGLE_ERROR_MODAL,
});

export const toggleCopyModal = (specificDeck) => ({
    type: ModalsActionTypes.TOGGLE_COPY_MODAL,
    payload: specificDeck,
});

export const togglePostModal = (specificDeck) => ({
    type: ModalsActionTypes.TOGGLE_POST_MODAL,
    payload: specificDeck,
});

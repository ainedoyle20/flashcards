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

export const toggleErrorModal = () => ({
    type: ModalsActionTypes.TOGGLE_ERROR_MODAL,
});

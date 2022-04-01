import ModalsActionTypes from "./modals-types";

const INITIAL_STATE = {
    showDeckModal: false,
    showFlashcardModal: false,
    showDeleteDeckModal: null,
    editModalVal: null,
    showErrorModal: false,
}

const modalsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ModalsActionTypes.TOGGLE_DECK_MODAL:
            return {
                ...state,
                showDeckModal: !state.showDeckModal
            }
        case ModalsActionTypes.TOGGLE_FLASHCARD_MODAL:
            return {
                ...state,
                showFlashcardModal: !state.showFlashcardModal
            }
        case ModalsActionTypes.TOGGLE_DELETE_DECK_MODAL:
            return {
                ...state,
                showDeleteDeckModal: action.payload
            }
        case ModalsActionTypes.SET_EDIT_MODAL_VAL:
            return {
                ...state,
                editModalVal: action.payload
            }
        case ModalsActionTypes.TOGGLE_ERROR_MODAL:
            return {
                ...state,
                showErrorModal: !state.showErrorModal
            }
        default:
            return state;
    }
}

export default modalsReducer;

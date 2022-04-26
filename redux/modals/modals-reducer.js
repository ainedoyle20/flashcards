import ModalsActionTypes from "./modals-types";

import { toggleModalHelper } from "./modals.utils";

const INITIAL_STATE = {
    showModal: null,
}

const modalsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ModalsActionTypes.TOGGLE_MODAL:
            return {
                ...state,
                showModal: toggleModalHelper(state.showModal, action.payload),
            }
        default:
            return state;
    }
}

export default modalsReducer;

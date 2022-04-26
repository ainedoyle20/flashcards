import ModalsActionTypes from "./modals-types";

export const toggleModal = (modalName) => ({
    type: ModalsActionTypes.TOGGLE_MODAL,
    payload: modalName,
});

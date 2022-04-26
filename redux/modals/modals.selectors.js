import { createSelector } from "reselect";

const selectModalsReducer = state => state.modals;

export const selectShowModal = createSelector(
    [selectModalsReducer],
    (modalsSlice) => modalsSlice.showModal,
);

export const toggleModalHelper = (showModalState, activeModalName) => {
    // showModal is active, it needs to be closed:
    if (showModalState !== null || activeModalName === null) {
        return null;

        // showModal is false, it needs to be opened:
    } else {
        return activeModalName;
    }
}

import { createSelector } from "reselect";

const selectDecksReducer = state => state.decks;

const selectDecksObject = createSelector(
    [selectDecksReducer],
    (decksSlice) => decksSlice.decksObject,
)

const selectDecksArray = createSelector(
    [selectDecksObject],
    (decksObject) => {
        const decksArray = [];
        for (let key in decksObject) {
            decksArray.push(decksObject[key]);
        }

        return decksArray;
    }
);

export const selectDecks = createSelector(
    [selectDecksArray],
    (decksArray) => decksArray.sort((a, b) => {
        const date1 = new Date(b.createdAt);
        const date2 = new Date(a.createdAt);
        return date1.getTime() - date2.getTime();
    })
);

export const selectIsDecksLoading = createSelector(
    [selectDecksReducer],
    (decksSlice) => decksSlice.isDecksLoading,
);

export const selectSpecificDeck = createSelector(
    [selectDecksReducer],
    (decksSlice) => decksSlice.specificDeck,
);

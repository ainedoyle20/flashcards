export function editReduxPublicDeckHelper(publicDeckList, publicDeckData) {
    const { deckId, formInput} = publicDeckData;
    const { title, description, createdBy } = formInput;

    const deckToEdit = publicDeckList.filter((deck) => deck.id === deckId)[0];

    const editedDeck = {
        ...deckToEdit,
        title,
        description,
        createdBy,
    }

    const filteredDeckList = publicDeckList.filter(deck => deck.id !== deckId);
    return [...filteredDeckList, editedDeck];
}

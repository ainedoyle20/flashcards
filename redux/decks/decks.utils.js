export function editReduxDeckHelper(deckList, deckData) {
    const { deckId, formInput} = deckData;
    const { title, description, createdBy } = formInput;

    const deckToEdit = deckList.filter((deck) => deck.id === deckId)[0];

    const editedDeck = {
        ...deckToEdit,
        title,
        description,
        createdBy,
    }

    const filteredDeckList = deckList.filter(deck => deck.id !== deckId);
    return [...filteredDeckList, editedDeck];
}

export function addReduxFlashcardHelper(flashcardList, flashcardToAdd) {
    if (flashcardList.length < 1) {
        flashcardList.push(flashcardToAdd);
        return flashcardList;
    }

    const flashcardQuestion = flashcardToAdd.question;

    const filteredFlashcardList = flashcardList.filter(flashcard => flashcard.question !== flashcardQuestion);

    console.log('filtered flashcardList: ', filteredFlashcardList);

    filteredFlashcardList.push(flashcardToAdd);
    return filteredFlashcardList;
}

export function editHelper(decksObject, { deckId, formInput}) {
    const { title, description, createdBy } = formInput;
    console.log('deckId, title', deckId, title);

    const deckToEdit = decksObject[deckId];

    return { ...decksObject, [deckId]: { ...deckToEdit, title, description, createdBy }};
}

export function addReduxFlashcardHelper(flashcardList, flashcardToAdd) {
    if (flashcardList.length < 1) {
        flashcardList.push(flashcardToAdd);
        return flashcardList;
    }

    const flashcardQuestion = flashcardToAdd.question;

    const filteredFlashcardList = flashcardList.filter(flashcard => flashcard.question !== flashcardQuestion);

    filteredFlashcardList.push(flashcardToAdd);
    return filteredFlashcardList;
}

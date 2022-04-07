import FlashcardListItem from './flashcard-list-item';

function FlashcardsList({ flashcards }) {

    return (
        <div className="w-4/5 max-h-[70vh] overflow-y-scroll absolute top-36 shadow-[1px_2px_2px_3px_rgba(180,180,180)] lg:w-3/4 xl:w-3/5">
            <ul className="list-none p-0 m-0">
                {
                    flashcards.map((flashcard, index) => {
                        return (
                            <FlashcardListItem key={Math.floor(Math.random() * 100000)} flashcard={flashcard} index={index} />
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default FlashcardsList;

import { useState } from "react";

import FlashcardModal from './flashcard-modal';
import FlashcardsCarousel from "./flashcards-carousel";

import styles from './flashcards-container.module.css';

function FlashcardsContainer({props}) {
    const [showFlascardModal, setShowFlashcardModal] = useState(false);

    const { deck, currentUserId, deckId } = props;
    const flashcards = deck.flashcards;

    console.log('props: ', props);
    

    return (
        <div className={styles.flashcardContainer}>
            <button onClick={() => setShowFlashcardModal(!showFlascardModal)}>Add Flashcard</button>
            {
                showFlascardModal ? <FlashcardModal currentUserId={currentUserId} deck={deck} deckId={deckId} /> : null
            }
            {
                flashcards.length ? <FlashcardsCarousel flashcards={flashcards} /> : <h1>No available Flashcards!</h1>
            }
        </div>
    )
}
export default FlashcardsContainer;

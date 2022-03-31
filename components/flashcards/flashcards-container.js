import { useState } from "react";

import FlashcardHeader from "./flashcard-header";
import FlashcardModal from '../flashcards-modals/flashcard-modal';
import FlashcardsCarousel from "./flashcards-carousel";
import FlashcardsList from "./flashcards-list";

import styles from './flashcards-container.module.css';

function FlashcardsContainer({props, setShowErrorModal}) {
    const [showFlascardModal, setShowFlashcardModal] = useState(false);
    const [showList, setShowList] = useState(false);

    const { deck, currentUserId } = props;
    const flashcards = deck.flashcards;

    return (
        <div className={styles.flashcardContainer}>
            <FlashcardHeader setShowFlashcardModal={setShowFlashcardModal} setShowList={setShowList} setShowErrorModal={setShowErrorModal} props={props} />
            {
                showFlascardModal ? <FlashcardModal currentUserId={currentUserId} showFlascardModal={showFlascardModal} deck={deck} /> : null
            }
            {
                flashcards.length && !showList ? <FlashcardsCarousel flashcards={flashcards} /> : (
                    flashcards.length && showList ? <FlashcardsList flashcards={flashcards} /> : <h1>No available Flashcards!</h1>
                )
            }
        </div>
    )
}
export default FlashcardsContainer;

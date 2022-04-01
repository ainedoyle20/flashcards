import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { setSpecificDeckId } from '../../redux/decks/decks.actions';
import { setCurrentUserId } from '../../redux/user/user.actions';

import FlashcardHeader from "./flashcard-header";
import FlashcardModal from '../flashcards-modals/flashcard-modal';
import DeleteErrorModal from "../decks-modals/delete-error-modal";
import FlashcardsCarousel from "./flashcards-carousel";
import FlashcardsList from "./flashcards-list";

import styles from './flashcards-container.module.css';

function FlashcardsContainer({props, setSpecificDeckId, showFlashcardModal, showErrorModal, currentUser }) {
    const [showList, setShowList] = useState(false);

    const { deck } = props;
    const flashcards = deck.flashcards;

    useEffect(() => {
        console.log('FlashcardContainer useEffect running with deck.id: ', deck.id);
        setSpecificDeckId(deck.id);
    }, []);

    return (
        <div className={styles.flashcardContainer}>
            <FlashcardHeader setShowList={setShowList} props={props} />
            {
                flashcards.length && !showList ? <FlashcardsCarousel flashcards={flashcards} /> : (
                    flashcards.length && showList ? <FlashcardsList flashcards={flashcards} /> : <h1>No available Flashcards!</h1>
                )
            }
            {
                showFlashcardModal 
                    ? <FlashcardModal currentUserId={currentUser.id} deck={deck} /> 
                    : null
            }
            {
                showErrorModal ? <DeleteErrorModal /> : null
            }
        </div>
    );
}

const mapStateToProps = ({ modals, user }) => ({
    showFlashcardModal: modals.showFlashcardModal,
    showErrorModal: modals.showErrorModal,
    currentUser: user.currentUser,
});

const mapDispatchToProps = dispatch => ({
    setSpecificDeckId: (specificDeckId) => dispatch(setSpecificDeckId(specificDeckId)),
    setCurrentUserId: (currentUserId) => dispatch(setCurrentUserId(currentUserId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardsContainer);

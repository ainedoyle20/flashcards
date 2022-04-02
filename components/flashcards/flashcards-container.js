import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { setSpecificDeckId, setFlashcardList } from '../../redux/decks/decks.actions';

import FlashcardHeader from "./flashcard-header";
import FlashcardModal from '../flashcards-modals/flashcard-modal';
import DeleteErrorModal from "../decks-modals/delete-error-modal";
import FlashcardsCarousel from "./flashcards-carousel";
import FlashcardsList from "./flashcards-list";

import styles from './flashcards-container.module.css';

function FlashcardsContainer({props, setSpecificDeckId, setFlashcardList, showFlashcardModal, showErrorModal, currentUser, flashcardList }) {
    const [showList, setShowList] = useState(false);

    const { deck } = props;
    const flashcards = deck.flashcards;

    useEffect(() => {
        console.log('FlashcardContainer useEffect running with deck.id: ', deck.id);
        setSpecificDeckId(deck.id);
        setFlashcardList(flashcards);
    }, []);

    return (
        <div className={styles.flashcardContainer}>
            <FlashcardHeader setShowList={setShowList} props={props} />
            {
                flashcardList.length && !showList ? <FlashcardsCarousel flashcards={flashcardList} /> : (
                    flashcardList.length && showList ? <FlashcardsList flashcards={flashcardList} /> : <h1>No available Flashcards!</h1>
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

const mapStateToProps = ({ modals, user, decks }) => ({
    showFlashcardModal: modals.showFlashcardModal,
    showErrorModal: modals.showErrorModal,
    currentUser: user.currentUser,
    flashcardList: decks.flashcardList,
});

const mapDispatchToProps = dispatch => ({
    setSpecificDeckId: (specificDeckId) => dispatch(setSpecificDeckId(specificDeckId)),
    setFlashcardList: (flashcardList) => dispatch(setFlashcardList(flashcardList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardsContainer);

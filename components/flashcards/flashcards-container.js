import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import { setSpecificDeckId, setFlashcardList } from '../../redux/decks/decks.actions';
import { toggleFlashcardModal, toggleErrorModal } from "../../redux/modals/modals-actions";

import FlashcardHeader from "./flashcard-header";
import ModalScreen from "../modals/modal-screen";
import FlashcardModal from '../modals/flashcard-modal';
import DeleteErrorModal from "../modals/delete-error-modal";
import FlashcardsCarousel from "./flashcards-carousel";
import FlashcardsList from "./flashcards-list";


function FlashcardsContainer({
    props, setSpecificDeckId, setFlashcardList, showFlashcardModal, showErrorModal, currentUser, flashcardList, toggleFlashcardModal, toggleErrorModal 
}) {
    const [showList, setShowList] = useState(false);

    const { deck } = props;
    const flashcards = deck.flashcards;

    useEffect(() => {
        console.log('FlashcardContainer useEffect running with deck.id: ', deck.id);
        setSpecificDeckId(deck.id);
        setFlashcardList(flashcards);
    }, []);

    return (
        <div className="h-screen flex flex-col items-center m-0 p-0">
            <FlashcardHeader setShowList={setShowList} props={props} />
            {
                flashcardList.length && !showList ? <FlashcardsCarousel flashcards={flashcardList} /> : (
                    flashcardList.length && showList ? <FlashcardsList flashcards={flashcardList} /> : <h1>No available Flashcards!</h1>
                )
            }
            {showFlashcardModal 
                ? <Fragment><ModalScreen toggleModal={() => toggleFlashcardModal()} /> <FlashcardModal currentUserId={currentUser.id} deck={deck} /></Fragment> 
                : null
            }
            {showErrorModal 
                ? <Fragment><ModalScreen toggleModal={() => toggleErrorModal()} /><DeleteErrorModal /></Fragment>
                : null
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
    toggleErrorModal: () => dispatch(toggleErrorModal()),
    toggleFlashcardModal: () => dispatch(toggleFlashcardModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardsContainer);

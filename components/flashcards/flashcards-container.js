import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSpecificDeck } from '../../redux/decks/decks.actions';
import { setFlashcardList } from "../../redux/flashcards/flashcards.actions";

import { selectFlashcards } from "../../redux/flashcards/flashcards.selectors";
import { selectShowModal } from '../../redux/modals/modals.selectors';

import FlashcardHeader from "./flashcard-header";
import ModalScreen from "../modals/modal-screen";
import FlashcardModal from '../modals/flashcard-modal';
import DeleteErrorModal from "../modals/delete-error-modal";
import FlashcardsCarousel from "./flashcards-carousel";
import FlashcardsList from "./flashcards-list";

function FlashcardsContainer({ props }) {
    const dispatch = useDispatch();
    const reduxFlashcards = useSelector(selectFlashcards);
    const activeModal = useSelector(selectShowModal);

    const [showList, setShowList] = useState(false);
    const [modal, setModal] = useState(null);

    const { deck } = props;
    const flashcards = deck.flashcards;

    useEffect(() => {
        dispatch(setSpecificDeck(deck));

        // Clearing specific deck from redux on leaving a specific deck
        return () => {
            dispatch(setSpecificDeck({}));
        }
    }, []);

    useEffect(() => {
        dispatch(setFlashcardList(flashcards));

        // Clearing the flashcard list from redux on leaving a specific deck
        return () => {
            dispatch(setFlashcardList([]));
        }
    }, []);

    useEffect(() => {
        switch(activeModal) {
            case 'addFlashcardModal':
                setModal(<Fragment><ModalScreen /> <FlashcardModal /></Fragment> );
                return;
            case 'errorModal':
                setModal(<Fragment><ModalScreen /><DeleteErrorModal /></Fragment>);
                return;
            default:
                setModal(null);
        }
    }, [activeModal]);

    return (
        <div className="h-screen flex flex-col items-center m-0 p-0">
            <FlashcardHeader setShowList={setShowList} />
            {
                reduxFlashcards.length && !showList ? <FlashcardsCarousel /> : (
                    reduxFlashcards.length && showList ? <FlashcardsList /> : <h1>No available Flashcards!</h1>
                )
            }
            
            {modal}
            
        </div>
    );
}

export default FlashcardsContainer;

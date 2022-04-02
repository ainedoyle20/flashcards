import { useState } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import { updateFlashcards, updateFlashcardsPublic } from '../../firebase/firebase.utils';
import { toggleFlashcardModal } from '../../redux/modals/modals-actions';
import { addReduxFlashcard } from '../../redux/decks/decks.actions';

import styles from './flashcard-modal.module.css';

function FlashcardModal({ currentUserId, deck, toggleFlashcardModal, addReduxFlashcard }) {
    const [formInput, setFormInput] = useState({
        question: '',
        answer: '',
    });
    const [ranCheck, setRanCheck] = useState(false);
    const [duplicate, setDuplicate] = useState(false);

    const router = useRouter();

    function checkForFlashcardDuplicates(deck, flashcardQuestion) {
        const currentFlashcards = deck.flashcards;
        const isDuplicate = currentFlashcards.find(flashcard => flashcard.question === flashcardQuestion);

        if (isDuplicate) {
            setDuplicate(true);
        }
    }

    function handleChange(e) {
        const { id, value } = e.target;

        if (e.target.id === 'answer') {
            checkForFlashcardDuplicates(deck, formInput.question);
            setRanCheck(true);
        } else {
            if (ranCheck === true) {
              setRanCheck(false);
              setDuplicate(false);  
            }
        }

        setFormInput({ ...formInput, [id]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (router.route === '/decks/[deckId]') {
            try {
                await updateFlashcards(currentUserId, deck, formInput);
                addReduxFlashcard(formInput);
                setFormInput({
                    question: '',
                    answer: '',
                });
                toggleFlashcardModal()
            } catch (error) {
                console.log('error in flashcardmodal: ', error.message);
            }    
        } else {
            try {
                const isCreator = await updateFlashcardsPublic(currentUserId, deck, formInput);
                if (isCreator) addReduxFlashcard(formInput);
                if (!isCreator) {
                    alert('You cannot update a public deck unless you created it. However, if you add the deck to your personal decks, you can then alter it.');
                }
                setFormInput({
                    question: '',
                    answer: '',
                });
                toggleFlashcardModal();
            } catch (error) {
                console.log('error in flashcardmodal: ', error.message);
            } 
        }
    }

    return (
    <div className={styles.flashcardModal}>
        <form onSubmit={handleSubmit}>
            <label htmlFor="question">Question:</label>
            <input 
                id='question' 
                type='text'
                value={formInput.question}
                onChange={handleChange}
                required
            />
            { duplicate ?
             <span className={styles.duplicate}>
                This flashcard already exists! If you add this flashcard it will override the flashcard that already exists.
            </span>  
            : null 
            }
            
            <label htmlFor="answer">Answer:</label>
            <input 
                id='answer' 
                type='text'
                value={formInput.answer}
                onChange={handleChange}
                required
            />
            <div className={styles.modalbuttons}>   
                <button type="button" onClick={() => toggleFlashcardModal()}>Cancel</button>
                <button>Add Flashcard</button>
            </div>
            
        </form>
    </div>
    );
}

const mapDispatchToProps = dispatch => ({
    toggleFlashcardModal: () => dispatch(toggleFlashcardModal()),
    addReduxFlashcard: (flashcard) => dispatch(addReduxFlashcard(flashcard)),
})

export default connect(null, mapDispatchToProps)(FlashcardModal);

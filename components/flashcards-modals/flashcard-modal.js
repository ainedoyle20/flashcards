import { useState } from 'react';
import { useRouter } from 'next/router';

import { updateFlashcards, updateFlashcardsPublic } from '../../firebase/firebase.utils';

import styles from './flashcard-modal.module.css';

function FlashcardModal({ currentUserId, deck }) {
    const [formInput, setFormInput] = useState({
        question: '',
        answer: '',
    });

    const router = useRouter();
    console.log('router.route: ', router.route);

    function handleChange(e) {
        const { id, value } = e.target;

        setFormInput({ ...formInput, [id]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (router.route === '/decks/[deckId]') {
            try {
                await updateFlashcards(currentUserId, deck, formInput);
                setFormInput({
                    question: '',
                    answer: '',
                });
                // router.reload();
            } catch (error) {
                console.log('error in flashcardmodal: ', error.message);
            }    
        } else {
            try {
                const isCreator = await updateFlashcardsPublic(currentUserId, deck, formInput);
                if (!isCreator) {
                    alert('You cannot update a public deck unless you created it. However, if you add the deck to your personal decks, you can then alter it.');
                }
                setFormInput({
                    question: '',
                    answer: '',
                });
                router.reload();
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
            <label htmlFor="answer">Answer:</label>
            <input 
                id='answer' 
                type='text'
                value={formInput.answer}
                onChange={handleChange}
                required
            />
            <button>Add Flashcard</button>
        </form>
    </div>
    )
}

export default FlashcardModal;

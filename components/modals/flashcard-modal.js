import { useState } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import { updateFlashcards, updateFlashcardsPublic } from '../../firebase/firebase.utils';
import { toggleFlashcardModal } from '../../redux/modals/modals-actions';
import { addReduxFlashcard } from '../../redux/decks/decks.actions';

function FlashcardModal({ currentUserId, deck, toggleFlashcardModal, addReduxFlashcard, flashcardList }) {
    const [formInput, setFormInput] = useState({
        question: '',
        answer: '',
    });
    const [ranCheck, setRanCheck] = useState(false);
    const [duplicate, setDuplicate] = useState(false);

    const router = useRouter();

    function checkForFlashcardDuplicates(flashcardList, flashcardQuestion) {
        let isDuplicate = false;

        for (let char of flashcardList) {
            if (char.question === flashcardQuestion) {
                isDuplicate = true;
            }
        }

        if (isDuplicate) {
            setDuplicate(true);
        }
    }

    function handleChange(e) {
        const { id, value } = e.target;

        if (e.target.id === 'answer' && ranCheck === false) {
            checkForFlashcardDuplicates(flashcardList, formInput.question);
            setRanCheck(true);
        }

        if (e.target.id === 'question' && ranCheck === true) {
            setRanCheck(false);
            setDuplicate(false);  
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
                await updateFlashcardsPublic(currentUserId, deck, formInput);
                addReduxFlashcard(formInput);
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
    <div className="flex flex-col items-center p-4 w-[60vw] h-auto absolute top-[30vh] left-[20vw] bg-[#e4e4e4] text-extrabold rounded-2xl cursor-default sm:w-[50vw] sm:left-[25vw] md:w-[40vw] md:left-[30vw] lg:w-[30vw] lg:left-[35vw]">
        <form 
            className="flex flex-col items-center w-full my-2"
            onSubmit={handleSubmit}
        >
            <label className="mt-1 text-lg" htmlFor="question">Question:</label>
            <input 
                className="m-1 w-3/4 sm:w-3/5 focus:outline-none"
                id='question' 
                type='text'
                value={formInput.question}
                onChange={handleChange}
                required
            />
            { duplicate ?
             <span>
                This flashcard already exists! If you add this flashcard it will override the flashcard that already exists.
            </span>  
            : null 
            }
            
            <label className="mt-1 text-lg" htmlFor="answer">Answer:</label>
            <textarea 
                className="m-1 h-10 max-h-14 w-3/4 max-w-3/4 sm:w-3/5 sm:max-w-3/5 focus:outline-none"
                id='answer' 
                type='text'
                value={formInput.answer}
                onChange={handleChange}
                required
            />
            <div className="w-3/5 sm:w-[45%] pt-3.5 flex justify-between">   
                <button className="underline text-sm" type="button" onClick={() => toggleFlashcardModal()}>Cancel</button>
                <button className="underline text-sm">Add</button>
            </div>
            
        </form>
    </div>
    );
}

const mapStateToProps = ({ decks }) => ({
    flashcardList: decks.flashcardList,
});

const mapDispatchToProps = dispatch => ({
    toggleFlashcardModal: () => dispatch(toggleFlashcardModal()),
    addReduxFlashcard: (flashcard) => dispatch(addReduxFlashcard(flashcard)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardModal);

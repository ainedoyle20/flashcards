import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import { checkIsCreator } from '../../firebase/firebase.utils';
import { toggleFlashcardModal, toggleErrorModal } from '../../redux/modals/modals-actions';

import styles from './flashcard-header.module.css';

function FlashcardHeader({ setShowList, props, toggleErrorModal, toggleFlashcardModal }) {
    const { currentUserId, deck } = props;

    const router = useRouter();
    
    // NOTE: remove createrId from deck when bringing it to client side
    
    async function handleAddFlashcard() {
        console.log('clicked');
        if (router.route === '/public-decks/[publicDeckId]') {
            const isCreator = await checkIsCreator(currentUserId, deck.id);
            if (isCreator) {
                console.log('is creator!!');
                toggleFlashcardModal();
            } else {
                toggleErrorModal();
            }    
        } else {
            toggleFlashcardModal();
        }
    }
    
    return (
        <div className={styles.flashcardheader}> 
            <div>
                <span onClick={() => setShowList(false)}>cards</span>
                <span onClick={() => setShowList(true)}>list</span>
            </div>
            <button onClick={handleAddFlashcard}>Add Flashcard</button>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    toggleFlashcardModal: () => dispatch(toggleFlashcardModal()),
    toggleErrorModal: () => dispatch(toggleErrorModal()),
});

export default connect(null, mapDispatchToProps)(FlashcardHeader);

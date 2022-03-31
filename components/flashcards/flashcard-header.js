import { useRouter } from 'next/router';
import { checkIsCreator } from '../../firebase/firebase.utils';

import styles from './flashcard-header.module.css';

function FlashcardHeader({ setShowFlashcardModal, showFlascardModal, setShowList, setShowErrorModal, props }) {
    const { currentUserId, deck } = props;
    console.log('deck.id: ', deck.id);

    const router = useRouter();
    
    // NOTE: remove createrId from deck when bringing it to client side
    
    async function handleAddFlashcard() {
        console.log('clicked');
        if (router.route === '/public-decks/[publicDeckId]') {
            const isCreator = await checkIsCreator(currentUserId, deck.id);
            if (isCreator) {
                console.log('is creator!!');
                setShowFlashcardModal(!showFlascardModal)
            } else {
                setShowErrorModal(true);
            }    
        } else {
            setShowFlashcardModal(!showFlascardModal)
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

export default FlashcardHeader;

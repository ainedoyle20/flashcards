import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import { deleteFlashcard, deletePublicFlashcard } from '../../firebase/firebase.utils';
import { toggleErrorModal } from '../../redux/modals/modals-actions';

import DeleteErrorModal from '../decks-modals/delete-error-modal';

import styles from './flashcards-list.module.css';

function FlashcardsList({ flashcards, specificDeckId, currentUserId, toggleErrorModal, showErrorModal }) {
    const router = useRouter();

    async function handleDelete(flashcardQuestion) {
        if (router.route === '/decks/[deckId]') {
            try {
                await deleteFlashcard(currentUserId, specificDeckId, flashcardQuestion);
            } catch (error) {
                console.log('error in handleDelete: ', error.message);
            } 
        } else {
            try {
                const isCreator = await deletePublicFlashcard(currentUserId, specificDeckId, flashcardQuestion);
                console.log('isCreator: ', isCreator);
                if (!isCreator) {
                    console.log('got here');
                    toggleErrorModal();
                    return;
                }
            } catch (error) {
                console.log('error in handleDelete: ', error.message);
            } 
        }
    }

    return (
        <div className={styles.listcontainer}>
            <ul className={styles.list}>
                {
                    flashcards.map((flashcard, index) => {
                        return (
                            <li key={Math.floor(Math.random() * 10000)}>
                                <div>
                                    <span className={styles.index}>{index + 1}.</span>
                                    <span>{flashcard.question}</span>
                                </div>
                                <div>
                                    <span>{flashcard.answer}</span>
                                    <span className={styles.listdelete} onClick={() => handleDelete(flashcard.question)}>Delete</span>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
            {
                showErrorModal ? <DeleteErrorModal /> : null
            }
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    toggleErrorModal: () => dispatch(toggleErrorModal()),
});

const mapStateToProps = ({ decks, user, modals }) => ({
    specificDeckId: decks.specificDeckId,
    currentUserId: user.currentUserId,
    showErrorModal: modals.showErrorModal,
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardsList);

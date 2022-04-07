import { useRouter } from 'next/router';
import Image from 'next/image';
import { connect } from 'react-redux';

import { deleteFlashcard, deletePublicFlashcard } from '../../firebase/firebase.utils';
import { toggleErrorModal } from '../../redux/modals/modals-actions';
import { deleteReduxFlashcard } from '../../redux/decks/decks.actions';

import RubbishBin from '../../public/images/trash-can.svg';

function FlashcardsListItem({ flashcard, index, specificDeckId, currentUser, deleteReduxFlashcard }) {
    const router = useRouter();

    async function handleDelete(flashcardQuestion) {
        if (router.route === '/decks/[deckId]') {
            try {
                await deleteFlashcard(currentUser.id, specificDeckId, flashcardQuestion);
                deleteReduxFlashcard(flashcardQuestion);
            } catch (error) {
                console.log('Error deleting flashcard.');
            } 
        } else {
            try {
                const isCreator = await deletePublicFlashcard(currentUser.id, specificDeckId, flashcardQuestion);
                if (!isCreator) {
                    toggleErrorModal();
                    return;
                }
                deleteReduxFlashcard(flashcardQuestion);
            } catch (error) {
                console.log('Error deleting flashcard.');
            } 
        }
    }

    return (
        <li className="w-full flex flex-col">
            
            <div className="w-full flex items-center p-2">
                <p className="text-lg">Q{index + 1}. {flashcard.question}</p>
            </div>

            <div className="w-full border-b-2 flex items-start justify-between p-2">
                <p className="text-lg">A. {flashcard.answer}</p>
                <span className="flex items-top" onClick={() => handleDelete(flashcard.question)}>
                    <Image className="cursor-pointer" src={RubbishBin} alt="trash" width={20} height={20} />
                </span>
            </div>
            
        </li>
    );
}

const mapStateToProps = ({ decks, user }) => ({
    specificDeckId: decks.specificDeckId,
    currentUser: user.currentUser,
});

const mapDispatchToProps = dispatch => ({
    toggleErrorModal: () => dispatch(toggleErrorModal()),
    deleteReduxFlashcard: (flashcardQuestion) => dispatch(deleteReduxFlashcard(flashcardQuestion)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardsListItem);

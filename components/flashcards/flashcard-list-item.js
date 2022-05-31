import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import { deleteFlashcard, deletePublicFlashcard } from '../../firebase/firebase.utils';
import { toggleModal } from '../../redux/modals/modals-actions';
import { deleteReduxFlashcard } from '../../redux/flashcards/flashcards.actions';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectSpecificDeck } from '../../redux/decks/decks.selectors';

import RubbishBin from '../../public/images/trash-can.svg';

function FlashcardsListItem({ flashcard, index }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const specificDeck = useSelector(selectSpecificDeck);
    const router = useRouter();

    async function handleDelete(flashcardQuestion) {
        if (router.route === '/decks/[deckId]') {
            try {
                await deleteFlashcard(currentUser.id, specificDeck.id, flashcardQuestion);
                dispatch(deleteReduxFlashcard(flashcardQuestion));
            } catch (error) {
                console.log('Error deleting flashcard.');
            } 
        } else {
            try {
                const isCreator = await deletePublicFlashcard(currentUser.id, specificDeck.id, flashcardQuestion);
                if (!isCreator) {
                    dispatch(toggleModal('errorModal'));
                    return;
                }
                dispatch(deleteReduxFlashcard(flashcardQuestion));
            } catch (error) {
                console.log('Error deleting flashcard.');
            } 
        }
    }

    return (
        <li className="w-full flex flex-col">
            
            <div className="w-full flex items-top justify-between p-2">
                <p className="text-lg w-[95%]">Q{index + 1}. {flashcard.question}</p>
                <span onClick={() => handleDelete(flashcard.question)}>
                    <Image className="cursor-pointer" src={RubbishBin} alt="trash" width={20} height={20} />
                </span>
            </div>

            <div className="w-full border-b-2 flex items-center p-2">
                <div>
                    A. {
                        flashcard.answer.match(/\n/g)||[].length > 0 
                        ? flashcard.answer.split("\n").map(line => <p key={Math.random(1000000*10000)} className="my-2">{line}</p>)
                        : <p>{flashcard.answer}</p>
                    }
                </div>
            </div>
            
        </li>
    );
}
export default FlashcardsListItem;

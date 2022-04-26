import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { checkIsCreator } from '../../firebase/firebase.utils';
import { toggleModal } from '../../redux/modals/modals-actions';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectSpecificDeck } from '../../redux/decks/decks.selectors';

function FlashcardHeader({ setShowList }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const specificDeck = useSelector(selectSpecificDeck);

    const router = useRouter();
    
    async function handleAddFlashcard() {
        if (router.route === '/public-decks/[publicDeckId]') {
            const isCreator = await checkIsCreator(currentUser.id, specificDeck.id);
            if (isCreator) {
                dispatch(toggleModal('addFlashcardModal'));
            } else {
                dispatch(toggleModal('errorModal'));
            }    
        } else {
            dispatch(toggleModal('addFlashcardModal'));
        }
    }
    
    return (
        <div className="w-full flex justify-between"> 
            <div className="p-3.5">
                <span className="mr-3.5 cursor-pointer text-[15px] hover:text-base" onClick={() => setShowList(false)}>cards</span>
                <span className="cursor-pointer text-[15px] hover:text-base" onClick={() => setShowList(true)}>list</span>
            </div>
            <span className="p-3.5 cursor-pointer text-[15px] hover:text-base" onClick={handleAddFlashcard}>Add Flashcard</span>
        </div>
    );
}

export default FlashcardHeader;

import { useDispatch, useSelector } from 'react-redux';

import { copyPublicDeck } from '../../firebase/firebase.utils';
import { toggleModal } from '../../redux/modals/modals-actions';

import {selectSpecificDeck} from '../../redux/decks/decks.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

function CopyModal() {
    const dispatch = useDispatch();
    const specificDeck = useSelector(selectSpecificDeck);
    const currentUser = useSelector(selectCurrentUser);

    async function handleConfirm() {
        const { title, description, flashcards, createdBy } = specificDeck;

        const strippedDeck = {
            title,
            description,
            flashcards,
            createdBy,
        }

        try {
            await copyPublicDeck(currentUser.id, strippedDeck);
            dispatch(toggleModal(null));
        } catch (error) {
            console.log('Error copying public deck.');
            alert('Sorry, there was an error copying this public deck. Please try again later.');
        }
    }

    return (
        <div className="flex flex-col items-center p-4 w-[60vw] h-auto absolute top-[30vh] left-[20vw] bg-[#e4e4e4] text-extrabold rounded-2xl cursor-default sm:w-[50vw] sm:left-[25vw] md:w-[40vw] md:left-[30vw] lg:w-[30vw] lg:left-[35vw]">
            <h2 className="text-xl mt-[4vh] mb-[2%]">Copy</h2>
                
                <span>{specificDeck.title}</span>

            <span className="text-lg mt-[2%] mb-3.5">to your personal decks?</span>

            <div className="w-1/4 mb-[4vh] flex justify-between">
                <button className="underline" onClick={() => dispatch(toggleModal(null))}>No</button>
                <button className="underline" onClick={handleConfirm}>Yes</button>
            </div>
        </div>
    );
}

export default CopyModal;

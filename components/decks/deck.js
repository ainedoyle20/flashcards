import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { checkIsCreator } from '../../firebase/firebase.utils';

import { toggleModal } from '../../redux/modals/modals-actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { setSpecificDeck } from '../../redux/decks/decks.actions';

function Deck({ deck }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    function handleClick() {
        if (router.route === '/decks') {
           router.push(`/decks/${deck.id}`); 
        } else {
            router.push(`/public-decks/${deck.id}`); 
        }
    }

    function handleCopy() {
        dispatch(setSpecificDeck(deck));
        dispatch(toggleModal('copyModal'));
    }

    function handlePost() {
        dispatch(setSpecificDeck(deck));
        dispatch(toggleModal('postModal'));
    }

    async function handleDelete() {
        dispatch(setSpecificDeck(deck));
        if (router.route === '/public-decks') {
            const isCreator = await checkIsCreator(currentUser.id, deck.id);
            if (isCreator) {
                dispatch(toggleModal('deleteDeckModal'));
            } else {
                dispatch(toggleModal('errorModal'));
                return;
            }
        } else {
            dispatch(toggleModal('deleteDeckModal'));
        }
    }

    async function handleEdit() {
        dispatch(setSpecificDeck(deck));
        if (router.route === '/public-decks') {
            const isCreator = await checkIsCreator(currentUser.id, deck.id);
            if (isCreator) {
                dispatch(toggleModal('editModal'));
            } else {
                dispatch(toggleModal('errorModal'));
                return;
            }
        } else {
            dispatch(toggleModal('editModal'));
        }
    }

    return (
        <Fragment>
            <div className="flex flex-col items-center cursor-pointer h-[30vh] shadow-[1px_2px_2px_3px_rgba(180,180,180)] group sm:max-w-[50vw] md:h-[35vh]">
                <div className="flex justify-between items-center w-full h-[15%]">
                    <div className="w-2/4 flex">
                    {
                        router.route === '/public-decks' 
                        ? <span className="px-[10%] hidden group-hover:flex" onClick={handleCopy}>Copy</span>
                        : <span className="px-[10%] hidden group-hover:flex" onClick={handlePost}>Post</span>
                    }
                    </div>
                    <div className=" w-2/4 flex justify-end">
                        <span className="px-[10%] hidden group-hover:flex" onClick={handleEdit}>Edit</span>
                        <span className="px-[10%] hidden group-hover:flex" onClick={handleDelete}>Delete</span>
                    </div>
                </div>
                <div className="flex flex-col items-center h-5/6 w-full" onClick={handleClick}>
                    <h2 className="mt-4 text-xl md:mt-[6vh]">{deck.title}</h2>
                    <span className="p-5">{deck.description}</span>
                    {
                        router.route === '/public-decks' ? <span className="text-sm">Created By: {deck.createdBy}</span> : null
                    }
                </div>
            </div>   
        </Fragment>
        
    );
}

export default Deck;

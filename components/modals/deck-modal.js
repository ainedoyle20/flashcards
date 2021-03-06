import {useState} from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { createDeck, createPublicDeck } from '../../firebase/firebase.utils';
import { toggleModal } from '../../redux/modals/modals-actions';
import { addReduxDeck } from '../../redux/decks/decks.actions';

import { selectCurrentUser } from '../../redux/user/user.selectors';

function DeckModal() {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    const [formInput, setFormInput] = useState({
        title: '',
        description: '',
        createdBy: '',
    });

    const router = useRouter();

    function handleChange(e) {
        const { id, value } = e.target;

        setFormInput({ ...formInput, [id]: value, });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const currentUserId = currentUser.id;

        if (router.route !== '/public-decks') {
            try {
                const createdDeck = await createDeck(currentUserId, formInput);
                dispatch(addReduxDeck(createdDeck));
                setFormInput({
                    title: '',
                    description: '',
                    createdBy: '',
                });
                dispatch(toggleModal(null));
            } catch (error) {
                console.log('Error creating deck.');
                alert('Sorry, there was an error creating your deck.');
            }    
        } else {
            try {
                const createdPublicDeck = await createPublicDeck(currentUserId, formInput);
                dispatch(addReduxDeck(createdPublicDeck));
                setFormInput({
                    title: '',
                    description: '',
                    createdBy: '',
                });
                dispatch(toggleModal(null));
            } catch (error) {
                console.log('Error creating deck.');
                alert('Sorry, there was an error creating your deck.');
            } 
        }
    }

    return (
        <div 
            onClick={() => null}
            className="flex flex-col items-center p-4 w-[60vw] h-auto absolute top-[30vh] left-[20vw] bg-[#e4e4e4] text-extrabold rounded-2xl cursor-default sm:w-[50vw] sm:left-[25vw] md:w-[40vw] md:left-[30vw] lg:w-[30vw] lg:left-[35vw]"
        >
            <form 
                className="flex flex-col items-center w-full mt-2 mb-3.5"
                onSubmit={handleSubmit}
            >
                <label className="mt-1" htmlFor="title">Title</label>
                <input 
                    className="m-1 w-3/4 sm:w-3/5 focus:outline-none"
                    id='title' 
                    type='text'
                    value={formInput.title}
                    onChange={handleChange}
                    required
                />
                <label className="mt-1" htmlFor="description">Description</label>
                <input 
                    className="m-1 w-3/4 sm:w-3/5 focus:outline-none"
                    id='description' 
                    type='text'
                    value={formInput.description}
                    onChange={handleChange}
                    required
                />
                <label className="mt-1" htmlFor="createdBy">Created By</label>
                <input 
                    className="m-1 w-3/4 sm:w-3/5 focus:outline-none"
                    id='createdBy' 
                    type='text'
                    value={formInput.createdBy}
                    onChange={handleChange}
                    required
                />  
                <div className="w-3/5 sm:w-[45%] pt-3.5 flex justify-between">
                    <button type='button' className="text-sm underline" onClick={() => dispatch(toggleModal(null))}>Cancel</button>
                    <button className="text-sm underline">Create</button>
                </div>
            </form>
        </div>
    );
}

export default DeckModal;

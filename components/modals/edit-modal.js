import {useState} from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { editDeck, editPublicDeck } from '../../firebase/firebase.utils';
import { toggleModal } from '../../redux/modals/modals-actions';
import { editReduxDeck } from '../../redux/decks/decks.actions';

import { selectSpecificDeck } from '../../redux/decks/decks.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

function EditModal() {
    const dispatch = useDispatch();
    const specificDeck = useSelector(selectSpecificDeck);
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

        if (router.route === '/public-decks') {
            try {
                await editPublicDeck(specificDeck.id, formInput);
                dispatch(editReduxDeck({deckId: specificDeck.id, formInput}));
                setFormInput({
                    title: '',
                    description: '',
                    createdBy: '',
                });
                dispatch(toggleModal('editModal'));    
            } catch (error) {
                console.log('Error editing deck.');
                alert('Sorry there was an error editing your deck. Please try again later.');
            }
        } else {
            try {
                await editDeck(currentUserId, specificDeck.id, formInput);
                dispatch(editReduxDeck({deckId: specificDeck.id, formInput}));
                setFormInput({
                    title: '',
                    description: '',
                    createdBy: '',
                });
                dispatch(toggleModal('editModal'));
            } catch (error) {
                console.log('Error editing deck.');
                alert('Sorry there was an error editing your deck. Please try again later.');
            } 
        }
    }

    return (
        <div className="flex flex-col items-center p-4 w-[60vw] h-auto absolute top-[30vh] left-[20vw] bg-[#e4e4e4] text-extrabold rounded-2xl cursor-default sm:w-[50vw] sm:left-[25vw] md:w-[40vw] md:left-[30vw] lg:w-[30vw] lg:left-[35vw]">
            <form 
                className="flex flex-col items-center w-full my-2"
                onSubmit={handleSubmit}
            >
                <label className="mt-1" htmlFor="title">Title</label>
                <input
                    className="m-1 w-4/5 sm:w-3/5 focus:outline-none" 
                    id='title' 
                    type='text'
                    value={formInput.title}
                    onChange={handleChange}
                    placeholder={`Currently: ${specificDeck.title}`}
                    required
                />
                <label className="mt-1" htmlFor="description">Description</label>
                <input
                    className="m-1 w-4/5 sm:w-3/5 focus:outline-none" 
                    id='description' 
                    type='text'
                    value={formInput.description}
                    onChange={handleChange}
                    placeholder={`Currently: ${specificDeck.description}`}
                    required
                />
                <label className="mt-1" htmlFor="createdBy">Created By</label>
                <input
                    className="m-1 w-4/5 sm:w-3/5 focus:outline-none" 
                    id='createdBy' 
                    type='text'
                    value={formInput.createdBy}
                    onChange={handleChange}
                    placeholder={`Currently: ${specificDeck.createdBy}`}
                    required
                />
                <div className="w-3/5 sm:w-[45%] pt-3.5 flex justify-between">
                    <button className="text-sm underline" type="button" onClick={() => dispatch(toggleModal(null))}>Cancel</button>
                    <button className="text-sm underline">Edit</button>
                </div>
            </form>
        </div>
    );
}

export default EditModal;

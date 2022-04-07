import {useState} from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import { editDeck, editPublicDeck } from '../../firebase/firebase.utils';
import { setEditModalVal } from '../../redux/modals/modals-actions';
import { editReduxDeck } from '../../redux/decks/decks.actions';
import { editReduxPublicDeck } from '../../redux/publicDecks/public-decks.actions';

function EditModal({ currentUser, editModalVal, setEditModalVal, editReduxDeck, editReduxPublicDeck }) {
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
                await editPublicDeck(editModalVal.id, formInput);
                editReduxPublicDeck(editModalVal.id, formInput);
                setFormInput({
                    title: '',
                    description: '',
                    createdBy: '',
                });
                setEditModalVal(null);    
            } catch (error) {
                console.log('Error editing deck.');
                alert('Sorry there was an error editing your deck. Please try again later.');
            }
        } else {
            try {
                await editDeck(currentUserId, editModalVal.id, formInput);
                editReduxDeck(editModalVal.id, formInput);
                setFormInput({
                    title: '',
                    description: '',
                    createdBy: '',
                });
                setEditModalVal(null);
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
                    placeholder={`Currently: ${editModalVal.title}`}
                    required
                />
                <label className="mt-1" htmlFor="description">Description</label>
                <input
                    className="m-1 w-4/5 sm:w-3/5 focus:outline-none" 
                    id='description' 
                    type='text'
                    value={formInput.description}
                    onChange={handleChange}
                    placeholder={`Currently: ${editModalVal.description}`}
                    required
                />
                <label className="mt-1" htmlFor="createdBy">Created By</label>
                <input
                    className="m-1 w-4/5 sm:w-3/5 focus:outline-none" 
                    id='createdBy' 
                    type='text'
                    value={formInput.createdBy}
                    onChange={handleChange}
                    placeholder={`Currently: ${editModalVal.createdBy}`}
                    required
                />
                <div className="w-3/5 sm:w-[45%] pt-3.5 flex justify-between">
                    <button className="text-sm underline" type="button" onClick={() => setEditModalVal(null)}>Cancel</button>
                    <button className="text-sm underline">Edit</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = ({ modals, user }) => ({
    editModalVal: modals.editModalVal,
    currentUser: user.currentUser,
});

const mapDispatchToProps = dispatch => ({
    setEditModalVal: (specificDeck) => dispatch(setEditModalVal(specificDeck)),
    editReduxDeck: (deckId, formInput) => dispatch(editReduxDeck({ deckId, formInput })),
    editReduxPublicDeck: (deckId, formInput) => dispatch(editReduxPublicDeck({ deckId, formInput })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);

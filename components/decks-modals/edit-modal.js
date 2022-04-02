import {useState} from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import { editDeck, editPublicDeck } from '../../firebase/firebase.utils';
import { setEditModalVal } from '../../redux/modals/modals-actions';
import { editReduxDeck } from '../../redux/decks/decks.actions';
import { editReduxPublicDeck } from '../../redux/publicDecks/public-decks.actions';

import styles from './edit-modal.module.css';

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
            await editPublicDeck(editModalVal.id, formInput);
            editReduxPublicDeck(editModalVal.id, formInput);
            setFormInput({
                title: '',
                description: '',
                createdBy: '',
            });
            setEditModalVal(null); 
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
                console.log('error in deck modal: ', error.message);
            } 
        }
    }

    return (
        <div className={styles.modal}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input 
                    id='title' 
                    type='text'
                    value={formInput.title}
                    onChange={handleChange}
                    placeholder={`Currently: ${editModalVal.title}`}
                    required
                />
                <label htmlFor="description">Description</label>
                <input 
                    id='description' 
                    type='text'
                    value={formInput.description}
                    onChange={handleChange}
                    placeholder={`Currently: ${editModalVal.description}`}
                    required
                />
                <label htmlFor="createdBy">Created By</label>
                <input 
                    id='createdBy' 
                    type='text'
                    value={formInput.createdBy}
                    onChange={handleChange}
                    placeholder={`Currently: ${editModalVal.createdBy}`}
                    required
                />
                <div className={styles.modalbuttons}>
                    <button type="button" onClick={() => setEditModalVal(null)}>Cancel</button>
                    <button>Edit</button>
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

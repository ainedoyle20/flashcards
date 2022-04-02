import {useState} from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import { createDeck, createPublicDeck } from '../../firebase/firebase.utils';
import { toggleDeckModal } from '../../redux/modals/modals-actions';
import { addReduxDeck } from '../../redux/decks/decks.actions';
import { addReduxPublicDeck } from '../../redux/publicDecks/public-decks.actions';

import styles from './deck-modal.module.css';

function DeckModal({currentUser, toggleDeckModal, addReduxDeck, addReduxPublicDeck }) {
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
                addReduxDeck(createdDeck);
                setFormInput({
                    title: '',
                    description: '',
                    createdBy: '',
                });
                toggleDeckModal();
            } catch (error) {
                console.log('error in deck modal: ', error.message);
            }    
        } else {
            try {
                const createdPublicDeck = await createPublicDeck(currentUserId, formInput);
                addReduxPublicDeck(createdPublicDeck);
                setFormInput({
                    title: '',
                    description: '',
                    createdBy: '',
                });
                toggleDeckModal();
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
                    required
                />
                <label htmlFor="description">Description</label>
                <input 
                    id='description' 
                    type='text'
                    value={formInput.description}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="createdBy">Created By</label>
                <input 
                    id='createdBy' 
                    type='text'
                    value={formInput.createdBy}
                    onChange={handleChange}
                    required
                />
                <div className={styles.modalbuttons}>   
                    <button type="button" onClick={() => toggleDeckModal()}>Cancel</button>
                    <button>Create</button>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});

const mapDispatchToProps = dispatch => ({
    toggleDeckModal: () => dispatch(toggleDeckModal()),
    addReduxDeck: (createdDeck) => dispatch(addReduxDeck(createdDeck)),
    addReduxPublicDeck: (createdPublicDeck) => dispatch(addReduxPublicDeck(createdPublicDeck)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckModal);

import {useState} from 'react';
import { useRouter } from 'next/router';
import { createDeck, createPublicDeck } from '../../firebase/firebase.utils';

import styles from './deck-modal.module.css';

function DeckModal(props) {
    const [formInput, setFormInput] = useState({
        title: '',
        description: '',
        createdBy: '',
    });

    const router = useRouter();
    console.log('deckModal props: ', props);
    console.log('router.route: ', router.route);

    function handleChange(e) {
        const { id, value } = e.target;

        setFormInput({ ...formInput, [id]: value, });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const { currentUserId } = props;

        if (router.route !== '/public-decks') {
            try {
                await createDeck(currentUserId, formInput);
                setFormInput({
                    title: '',
                    description: '',
                    createdBy: '',
                });
                router.reload();
            } catch (error) {
                console.log('error in deck modal: ', error.message);
            }    
        } else {
            try {
                await createPublicDeck(currentUserId, formInput);
                setFormInput({
                    title: '',
                    description: '',
                    createdBy: '',
                });
                router.reload();
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
                <button>Create</button>
            </form>
        </div>
    )
}

export default DeckModal;

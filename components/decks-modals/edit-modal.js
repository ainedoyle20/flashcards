import {useState} from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import { editDeck } from '../../firebase/firebase.utils';

import styles from './edit-modal.module.css';

function EditModal({ props, editModalVal }) {
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

        const { currentUserId } = props;

        if (router.route === '/public-decks') {
            console.log('in pubic-decks!');
            return;
            // try {
            //     // await createDeck(currentUserId, formInput);
            //     setFormInput({
            //         title: '',
            //         description: '',
            //         createdBy: '',
            //     });
            //     router.reload();
            // } catch (error) {
            //     console.log('error in edit modal: ', error.message);
            // }    
        } else {
            try {
                await editDeck(currentUserId, editModalVal, formInput);
                setFormInput({
                    title: '',
                    description: '',
                    createdBy: '',
                });
                // router.reload();
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

const mapStateToProps = ({ modals }) => ({
    editModalVal: modals.editModalVal,
});

export default connect(mapStateToProps)(EditModal);

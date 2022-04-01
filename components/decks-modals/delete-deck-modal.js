import { useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import {deletePublicDeck, deleteDeck } from '../../firebase/firebase.utils';
import { toggleDeleteDeckModal } from '../../redux/modals/modals-actions'

import styles from './delete-deck-modal.module.css';

function DeleteDeckModal({ toggleDeleteDeckModal, showDeleteDeckModal }) {
    const [inputVal, setInputVal] = useState('');

    const router = useRouter();

    const { deck, currentUserId } = showDeleteDeckModal;
    console.log('deck: ', deck);

    async function confirmedDelete(currentUserId, deckId) {
        if (router.route === '/public-decks') {
            await deletePublicDeck(deckId);
        } else {
            await deleteDeck(currentUserId, deckId);
        }
    }

    function handleChange(e) {
        setInputVal(e.target.value);
    }

    async function handleClick() {
        if (inputVal !== deck.title) {
            alert('Please enter the title of the deck you wish to delete');
            return;
        }

        await confirmedDelete(currentUserId, deck.id);
    }

    return (
        <div className={styles.deletemodal}>
            <h2>Warning</h2>
            <p>
                You are about to delete a deck. <br/> 
                Once a deck is deleted it is lost forever.
            </p>
            <div>
                <label htmlFor="delete-input">Please enter the deck title to confirm deletion.</label>
                <input
                    id="delete-input"
                    type="text"
                    value={inputVal}
                    onChange={handleChange}
                    placeholder={deck.title}
                    required
                />
                <button onClick={handleClick}>DELETE</button>
            </div>
            <button onClick={() => toggleDeleteDeckModal(null)}>Cancel</button>
        </div>
    );
}

const mapStateToProps = ({ modals }) => ({
    showDeleteDeckModal: modals.showDeleteDeckModal,
})

const mapDispatchToProps = dispatch => ({
    toggleDeleteDeckModal: (payload) => dispatch(toggleDeleteDeckModal(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDeckModal);

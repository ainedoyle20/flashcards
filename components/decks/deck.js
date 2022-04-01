import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { connect } from 'react-redux';

import { checkIsCreator } from '../../firebase/firebase.utils';
import { toggleDeleteDeckModal, setEditModalVal } from '../../redux/modals/modals-actions';

import DeleteDeckModal from '../decks-modals/delete-deck-modal';

import styles from './deck.module.css';

function Deck({ deck, currentUserId, toggleDeleteDeckModal, toggleErrorModal, showDeleteDeckModal, setEditModalVal }) {
    const router = useRouter();

    function handleClick() {
        if (router.route === '/decks') {
           router.push(`/decks/${deck.id}`); 
        } else {
            router.push(`/public-decks/${deck.id}`); 
        }
    }

    async function handleDelete() {
        if (router.route === '/public-decks') {
            const isCreator = await checkIsCreator(currentUserId, deck.id);
            if (isCreator) {
                toggleDeleteDeckModal({
                    show: true,
                    deck,
                    currentUserId,
                });
            } else {
                console.log('not creator!');
                toggleErrorModal();
                return;
            }
        } else {
            toggleDeleteDeckModal({
                show: true,
                deck,
                currentUserId,
            });
            
        }
    }

    return (
        <Fragment>
            <div className={styles.deck}>
                <div className={styles.delete}>
                    <span onClick={() => {
                        console.log('edit modal');
                        setEditModalVal(deck.id);
                    }}>Edit</span>
                    <span onClick={handleDelete}>Delete</span>
                </div>
                <div className={styles.deckcontent} onClick={handleClick}>
                    <h2>{deck.title}</h2>
                    <span>{deck.description}</span>
                    {
                        deck.createrId === null ? <span>Created By: {deck.createdBy}</span> : null
                    }
                </div>
            </div>    
            {
                showDeleteDeckModal ? <DeleteDeckModal currentUserId={currentUserId} deck={deck} /> : null
            }
        </Fragment>
        
    );
}

const mapStateToProps = ({ modals }) => ({
    showDeleteDeckModal: modals.showDeleteDeckModal,
});

const mapDispatchToProps = dispatch => ({
    toggleDeleteDeckModal: (payload) => dispatch(toggleDeleteDeckModal(payload)),
    toggleErrorModal: () => dispatch(toggleErrorModal()),
    setEditModalVal: (deckId) => dispatch(setEditModalVal(deckId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck);

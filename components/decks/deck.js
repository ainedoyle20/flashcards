import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { connect } from 'react-redux';

import { checkIsCreator } from '../../firebase/firebase.utils';
import { toggleDeleteDeckModal, setEditModalVal, toggleErrorModal, toggleCopyModal } from '../../redux/modals/modals-actions';

import styles from './deck.module.css';

function Deck({ deck, currentUser, toggleDeleteDeckModal, toggleErrorModal, setEditModalVal, toggleCopyModal }) {
    const router = useRouter();

    function handleClick() {
        if (router.route === '/decks') {
           router.push(`/decks/${deck.id}`); 
        } else {
            router.push(`/public-decks/${deck.id}`); 
        }
    }

    async function handleDelete() {
        console.log('delete');
        if (router.route === '/public-decks') {
            const isCreator = await checkIsCreator(currentUser.id, deck.id);
            if (isCreator) {
                toggleDeleteDeckModal({
                    show: true,
                    deck,
                    currentUserId: currentUser.id,
                });
            } else {
                toggleErrorModal();
                return;
            }
        } else {
            toggleDeleteDeckModal({
                show: true,
                deck,
                currentUserId: currentUser.id,
            });
            
        }
    }

    async function handleEdit() {
        console.log('edit');
        if (router.route === '/public-decks') {
            const isCreator = await checkIsCreator(currentUser.id, deck.id);
            if (isCreator) {
                setEditModalVal(deck);
            } else {
                toggleErrorModal();
                return;
            }
        } else {
            setEditModalVal(deck);
        }
    }

    return (
        <Fragment>
            <div className={styles.deck}>
                <div className={styles.delete}>
                    {
                        router.route === '/public-decks' 
                        ? <span className={styles.copy} onClick={() => toggleCopyModal(deck)}>Copy</span>
                        : null
                    }
                    <span onClick={handleEdit}>Edit</span>
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
        </Fragment>
        
    );
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});

const mapDispatchToProps = dispatch => ({
    toggleDeleteDeckModal: (payload) => dispatch(toggleDeleteDeckModal(payload)),
    toggleErrorModal: () => dispatch(toggleErrorModal()),
    setEditModalVal: (specificDeck) => dispatch(setEditModalVal(specificDeck)),
    toggleCopyModal: (specificDeck) => dispatch(toggleCopyModal(specificDeck)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck);

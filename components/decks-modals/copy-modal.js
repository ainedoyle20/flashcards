import { connect } from 'react-redux';

import { copyPublicDeck } from '../../firebase/firebase.utils';
import { toggleCopyModal } from '../../redux/modals/modals-actions';

import styles from './copy-modal.module.css';

function CopyModal({ deck, toggleCopyModal, currentUser }) {

    async function handleConfirm() {
        const { title, description, flashcards } = deck;

        const strippedDeck = {
            title,
            description,
            flashcards,
            createdBy: currentUser.displayName,
        }

        try {
            await copyPublicDeck(currentUser.id, strippedDeck);
        } catch (error) {
            console.log('error in handleConfirm');
        }
    }

    return (
        <div className={styles.copymodal}>
            <span>Copy {deck.title} to your personal decks?</span>
            <div className={styles.copybuttons}>
                <button onClick={() => toggleCopyModal(null)}>No</button>
                <button onClick={handleConfirm}>Yes</button>
            </div>
        </div>
    );
}

const mapStateToProps = ({ user, modals }) => ({
    currentUser: user.currentUser,
    deck: modals.showCopyModal,
});

const mapDispatchToProps = dispatch => ({
    toggleCopyModal: (specificDeck) => dispatch(toggleCopyModal(specificDeck)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CopyModal);

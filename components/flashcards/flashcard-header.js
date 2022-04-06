import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import { checkIsCreator } from '../../firebase/firebase.utils';
import { toggleFlashcardModal, toggleErrorModal } from '../../redux/modals/modals-actions';

function FlashcardHeader({ setShowList, props, toggleErrorModal, toggleFlashcardModal, currentUser }) {
    const { deck } = props;

    const router = useRouter();
    
    async function handleAddFlashcard() {
        if (router.route === '/public-decks/[publicDeckId]') {
            const isCreator = await checkIsCreator(currentUser.id, deck.id);
            if (isCreator) {
                toggleFlashcardModal();
            } else {
                toggleErrorModal();
            }    
        } else {
            toggleFlashcardModal();
        }
    }
    
    return (
        <div className="w-full flex justify-between"> 
            <div className="p-3.5">
                <span className="mr-3.5 cursor-pointer text-[15px] hover:text-base" onClick={() => setShowList(false)}>cards</span>
                <span className="cursor-pointer text-[15px] hover:text-base" onClick={() => setShowList(true)}>list</span>
            </div>
            <span className="p-3.5 cursor-pointer text-[15px] hover:text-base" onClick={handleAddFlashcard}>Add Flashcard</span>
        </div>
    );
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});

const mapDispatchToProps = dispatch => ({
    toggleFlashcardModal: () => dispatch(toggleFlashcardModal()),
    toggleErrorModal: () => dispatch(toggleErrorModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardHeader);

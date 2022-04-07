import { connect } from 'react-redux';

import { postDeck } from '../../firebase/firebase.utils';

import { togglePostModal } from '../../redux/modals/modals-actions';

function PostModal({ deck, currentUser, togglePostModal }) {

    async function handlePost() {
        try {
            await postDeck(currentUser.id, deck);
            togglePostModal(null);
        } catch (error) {
            console.log('Error posting deck.');
            alert('Sorry there was an error posting your deck. Please try again later.');
        }
    }

    return (
        <div className="flex flex-col items-center p-4 w-[60vw] h-auto absolute top-[30vh] left-[20vw] bg-[#e4e4e4] text-extrabold rounded-2xl cursor-default sm:w-[50vw] sm:left-[25vw] md:w-[40vw] md:left-[30vw] lg:w-[30vw] lg:left-[35vw]">
            <h2 className="text-lg">Post your Deck</h2>
            <span className="p-4">You are about to post your personal flashcard deck:</span>
            <span className="p-4 text-lg">{deck.title}</span>
            <span className="p-4">
                This means this deck will be added to the public decks collection where it can be 
                viewed by anyone.
            </span>

            <span>Make your personal deck public?</span>
            <div className="w-1/4 mb-[4vh] p-1 flex justify-between">
                <button className="underline" onClick={() => togglePostModal(null)}>No</button>
                <button className="underline" onClick={handlePost}>Yes</button>
            </div>
        </div>
    );
}

const mapStateToProps = ({ user, modals }) => ({
    currentUser: user.currentUser,
    deck: modals.showPostModal,
});

const mapDispatchToProps = dispatch => ({
    togglePostModal: (specificDeck) => dispatch(togglePostModal(specificDeck)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);

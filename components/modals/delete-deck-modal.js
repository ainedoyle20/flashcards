import { useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import {deletePublicDeck, deleteDeck } from '../../firebase/firebase.utils';
import { toggleDeleteDeckModal } from '../../redux/modals/modals-actions'
import { deleteReduxDeck } from "../../redux/decks/decks.actions";
import { deleteReduxPublicDeck } from '../../redux/publicDecks/public-decks.actions';

function DeleteDeckModal({ toggleDeleteDeckModal, showDeleteDeckModal, deleteReduxDeck, deleteReduxPublicDeck }) {
    const [inputVal, setInputVal] = useState('');

    const router = useRouter();

    const { deck, currentUserId } = showDeleteDeckModal;

    async function confirmedDelete(currentUserId, deckId) {
        if (router.route === '/public-decks') {
            await deletePublicDeck(deckId);
            deleteReduxPublicDeck(deckId);
        } else {
            await deleteDeck(currentUserId, deckId);
            deleteReduxDeck(deckId);
            toggleDeleteDeckModal();
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
        <div className="flex flex-col items-center p-5 w-[60vw] min-h-[250px] absolute top-[30vh] left-[20vw] bg-[#e4e4e4] text-extrabold rounded-2xl cursor-default md:w-[50vw] md:left-[25vw] lg:w-[40vw] lg:left-[30vw] xl:max-h-[350px]">
            <h2 className="my-3.5 text-xl text-black">Warning</h2>
            <p>
                You are about to delete deck: "{deck.title}".
            </p>

            <p className="mt-1 mb-3.5">Once a deck is deleted it is lost forever.</p>

            <div className="w-full flex flex-col items-center">
                <label className="text-sm" htmlFor="delete-input">Enter deck title to confirm deletion.</label>
                <div>
                    <input
                        className="border-[1px] border-black focus:outline-none"
                        id="delete-input"
                        type="text"
                        value={inputVal}
                        onChange={handleChange}
                        placeholder={deck.title}
                        required
                    />
                    <button className="ml-1 underline" onClick={handleClick}>DELETE</button>
                </div>    
            </div>
            
            <button className="mt-[5%] underline text-sm" onClick={() => toggleDeleteDeckModal(null)}>Cancel</button>
        </div>
    );
}

const mapStateToProps = ({ modals }) => ({
    showDeleteDeckModal: modals.showDeleteDeckModal,
})

const mapDispatchToProps = dispatch => ({
    toggleDeleteDeckModal: (payload) => dispatch(toggleDeleteDeckModal(payload)),
    deleteReduxDeck: (deckId) => dispatch(deleteReduxDeck(deckId)),
    deleteReduxPublicDeck: (deckId) => dispatch(deleteReduxPublicDeck(deckId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDeckModal);

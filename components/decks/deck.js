import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { connect } from 'react-redux';

import { checkIsCreator } from '../../firebase/firebase.utils';
import { 
    toggleDeleteDeckModal, 
    setEditModalVal, 
    toggleErrorModal, 
    toggleCopyModal,
    togglePostModal, 
} from '../../redux/modals/modals-actions';

function Deck({ deck, currentUser, toggleDeleteDeckModal, toggleErrorModal, setEditModalVal, toggleCopyModal, togglePostModal }) {
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
            <div className="flex flex-col items-center cursor-pointer h-[30vh] shadow-[1px_2px_2px_3px_rgba(180,180,180)] group sm:max-w-[50vw] md:h-[35vh]">
                <div className="flex justify-between items-center w-full h-[15%]">
                    <div className="w-2/4 flex">
                    {
                        router.route === '/public-decks' 
                        ? <span className="px-[10%] hidden group-hover:flex" onClick={() => toggleCopyModal(deck)}>Copy</span>
                        : <span className="px-[10%] hidden group-hover:flex" onClick={() => togglePostModal(deck)}>Post</span>
                    }
                    </div>
                    <div className=" w-2/4 flex justify-end">
                        <span className="px-[10%] hidden group-hover:flex" onClick={handleEdit}>Edit</span>
                        <span className="px-[10%] hidden group-hover:flex" onClick={handleDelete}>Delete</span>
                    </div>
                </div>
                <div className="flex flex-col items-center h-5/6 w-full" onClick={handleClick}>
                    <h2 className="mt-4 text-xl md:mt-[6vh]">{deck.title}</h2>
                    <span className="p-5">{deck.description}</span>
                    {
                        deck.createrId === null ? <span className="text-sm">Created By: {deck.createdBy}</span> : null
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
    togglePostModal: (specificDeck) => dispatch(togglePostModal(specificDeck)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck);

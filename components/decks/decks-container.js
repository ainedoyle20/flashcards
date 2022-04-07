import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import { setDeckList } from "../../redux/decks/decks.actions";
import { setPublicDecksList } from "../../redux/publicDecks/public-decks.actions";
import { 
    toggleDeckModal, 
    setEditModalVal, 
    toggleCopyModal, 
    toggleErrorModal, 
    toggleDeleteDeckModal,
    togglePostModal, 
} from '../../redux/modals/modals-actions';

import DecksHeader from "./decks-header";
import DecksGrid from "./decks-grid";
import ModalScreen from "../modals/modal-screen";
import DeckModal from '../modals/deck-modal';
import DeleteErrorModal from '../modals/delete-error-modal';
import EditModal from '../modals/edit-modal';
import DeleteDeckModal from "../modals/delete-deck-modal";
import CopyModal from "../modals/copy-modal";
import PostModal from "../modals/post-modal";


function DecksContainer({ 
    props, 
    showDeckModal, 
    showErrorModal, 
    editModalVal, 
    setDeckList, 
    showDeleteDeckModal, 
    setPublicDecksList, 
    showCopyModal,
    showPostModal, 
    toggleDeckModal,
    toggleCopyModal,
    toggleDeleteDeckModal,
    setEditModalVal,
    toggleErrorModal,
    togglePostModal,
}) {
    const {decks} = props;

    const router = useRouter();

    useEffect(() => {
        if (router.route === '/decks') {
            const decksArray = [];
            if (decks !== undefined) {
                for (let key in decks) {
                    decksArray.push({ ...decks[key] });
                }
            }

            setDeckList(decksArray);  
        } else {
            const publicDecksList = [];
            for (let key in decks) {
                publicDecksList.push({ ...decks[key], createrId: null });
            }
            setPublicDecksList(publicDecksList);
        }
        
    }, [decks, router.route, setDeckList, setPublicDecksList]);

    return (
        <Fragment>
            <DecksHeader />
            <DecksGrid props={props} />

            {showDeckModal 
                ? <Fragment><ModalScreen toggleModal={() => toggleDeckModal()} /><DeckModal /></Fragment> 
                : null
            }

            {showErrorModal 
                ? <Fragment><ModalScreen toggleModal={() => toggleErrorModal()} /> <DeleteErrorModal /></Fragment> 
                : null
            }

            {editModalVal 
                ? <Fragment><ModalScreen toggleModal={() => setEditModalVal(null)} /><EditModal /></Fragment> 
                : null
            }

            {showDeleteDeckModal 
                ? <Fragment><ModalScreen toggleModal={() => toggleDeleteDeckModal(null)} /><DeleteDeckModal /></Fragment> 
                : null
            }

            {showCopyModal 
                ? <Fragment><ModalScreen toggleModal={() => toggleCopyModal(null)}/><CopyModal /></Fragment> 
                : null
            }

            {showPostModal 
                ? <Fragment><ModalScreen toggleModal={() => togglePostModal(null)}/><PostModal /></Fragment> 
                : null
            }

        </Fragment>
    );
}

const mapStateToProps = ({ modals }) => ({
    showDeckModal: modals.showDeckModal,
    showErrorModal: modals.showErrorModal,
    editModalVal: modals.editModalVal,
    showDeleteDeckModal: modals.showDeleteDeckModal,
    showCopyModal: modals.showCopyModal,
    showPostModal: modals.showPostModal,
});

const mapDispatchToProps = dispatch => ({
    setDeckList: (deckList) => dispatch(setDeckList(deckList)),
    setPublicDecksList: (publicDecksList) => dispatch(setPublicDecksList(publicDecksList)),
    toggleDeckModal: () => dispatch(toggleDeckModal()),
    setEditModalVal: (val) => dispatch(setEditModalVal(val)),
    toggleDeleteDeckModal: (val) => dispatch(toggleDeleteDeckModal(val)),
    toggleErrorModal: () => dispatch(toggleErrorModal()),
    toggleCopyModal: (val) => dispatch(toggleCopyModal(val)),
    togglePostModal: (val) => dispatch(togglePostModal(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DecksContainer);

import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectShowModal } from '../../redux/modals/modals.selectors';

import DecksHeader from "./decks-header";
import DecksGrid from "./decks-grid";
import ModalScreen from "../modals/modal-screen";
import DeckModal from '../modals/deck-modal';
import DeleteErrorModal from '../modals/delete-error-modal';
import EditModal from '../modals/edit-modal';
import DeleteDeckModal from "../modals/delete-deck-modal";
import CopyModal from "../modals/copy-modal";
import PostModal from "../modals/post-modal";


function DecksContainer() {
    const activeModal = useSelector(selectShowModal);

    const [modal, setModal] = useState(null);

    useEffect(() => {
        switch(activeModal) {
            case 'addDeckModal':
                setModal(<DeckModal /> );
                return;
            case 'errorModal':
                setModal(<DeleteErrorModal /> );
                return;
            case 'editModal':
                setModal(<EditModal /> );
                return;
            case 'deleteDeckModal':
                setModal(<DeleteDeckModal /> );
                return;
            case 'copyModal':
                setModal(<CopyModal /> );
                return;
            case 'postModal':
                setModal(<PostModal /> );
                return;
            default: 
                setModal(null);
        }
    }, [activeModal]);

    return (
        <Fragment>
            <DecksHeader />
            <DecksGrid />

            { modal ? <Fragment><ModalScreen />{modal}</Fragment> : null}
            

        </Fragment>
    );
}

export default DecksContainer;

import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import { setDeckList } from "../../redux/decks/decks.actions";
import { setPublicDecksList } from "../../redux/publicDecks/public-decks.actions";

import DecksHeader from "./decks-header";
import DecksGrid from "./decks-grid";
import DeckModal from '../decks-modals/deck-modal';
import DeleteErrorModal from '../decks-modals/delete-error-modal';
import EditModal from '../decks-modals/edit-modal';
import DeleteDeckModal from "../decks-modals/delete-deck-modal";
import CopyModal from "../decks-modals/copy-modal";


function DecksContainer({ props, showDeckModal, showErrorModal, editModalVal, setDeckList, showDeleteDeckModal, setPublicDecksList, showCopyModal }) {
    const {decks} = props;

    const router = useRouter();

    useEffect(() => {
        console.log('running deckscontainer useEffect');

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
    }, []);

    return (
        <Fragment>
            <DecksHeader />
            <DecksGrid props={props} />
            {
                showDeckModal ? <DeckModal /> : null
            }
            {
                showErrorModal ? <DeleteErrorModal /> : null
            }
            {
                editModalVal ? <EditModal /> : null
            }
            {
                showDeleteDeckModal ? <DeleteDeckModal /> : null
            }
            {showCopyModal ? <CopyModal /> : null}
        </Fragment>
    );
}

const mapStateToProps = ({ modals }) => ({
    showDeckModal: modals.showDeckModal,
    showErrorModal: modals.showErrorModal,
    editModalVal: modals.editModalVal,
    showDeleteDeckModal: modals.showDeleteDeckModal,
    showCopyModal: modals.showCopyModal,
});

const mapDispatchToProps = dispatch => ({
    setDeckList: (deckList) => dispatch(setDeckList(deckList)),
    setPublicDecksList: (publicDecksList) => dispatch(setPublicDecksList(publicDecksList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DecksContainer);

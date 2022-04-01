import { Fragment } from "react";
import { connect } from "react-redux";

import DecksHeader from "./decks-header";
import DecksGrid from "./decks-grid";
import DeckModal from '../decks-modals/deck-modal';
import DeleteErrorModal from '../decks-modals/delete-error-modal';
import EditModal from '../decks-modals/edit-modal';

function DecksContainer({ props, showDeckModal, showErrorModal, editModalVal }) {
    return (
        <Fragment>
            <DecksHeader />
            <DecksGrid props={props} />
            {
                showDeckModal ? <DeckModal props={props} /> : null
            }
            {
                showErrorModal ? <DeleteErrorModal /> : null
            }
            {
                editModalVal ? <EditModal props={props} /> : null
            }
        </Fragment>
    );
}

const mapStateToProps = ({ modals }) => ({
    showDeckModal: modals.showDeckModal,
    showErrorModal: modals.showErrorModal,
    editModalVal: modals.editModalVal,
});

export default connect(mapStateToProps)(DecksContainer);

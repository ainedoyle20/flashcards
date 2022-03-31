import { Fragment } from "react";
import { connect } from "react-redux";

import DecksHeader from "./decks-header";
import DecksGrid from "./decks-grid";
import DeckModal from '../decks-modals/deck-modal';
import DeleteErrorModal from '../decks-modals/delete-error-modal';

function DecksContainer({ props, showDeckModal, showErrorModal }) {

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
        </Fragment>
    );
}

const mapStateToProps = ({ modals }) => ({
    showDeckModal: modals.showDeckModal,
    showErrorModal: modals.showErrorModal,
});

export default connect(mapStateToProps)(DecksContainer);

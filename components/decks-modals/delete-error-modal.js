import { connect } from 'react-redux';

import { toggleErrorModal } from '../../redux/modals/modals-actions';

import styles from './delete-error-modal.module.css';

function DeleteErrorModal({ toggleErrorModal }) {
    return (
        <div className={styles.errormodal}>
            <h2>Invalid Authorization</h2>
            <p>You can only edit a public deck if you are the creator.</p>
            <button onClick={() => toggleErrorModal()}>Close</button>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    toggleErrorModal: () => dispatch(toggleErrorModal())
});

export default connect(null, mapDispatchToProps)(DeleteErrorModal);

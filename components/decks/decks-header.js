import { useRouter } from "next/router";
import { connect } from "react-redux";

import { toggleDeckModal } from '../../redux/modals/modals-actions';

import styles from './decks-header.module.css';

function DecksHeader({ toggleDeckModal }) {
    const router = useRouter();
    const isPublicHeader = router.route === '/public-decks' ? true : false;

    return (
        <div className={styles.decksheader}>
            {
                isPublicHeader 
                ? <button onClick={() => toggleDeckModal()}>Create Public Deck</button>
                : <button onClick={() => toggleDeckModal()}>Create Deck</button>
            }
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    toggleDeckModal: () => dispatch(toggleDeckModal()),
});

export default connect(null, mapDispatchToProps)(DecksHeader);

import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import { signOutUser } from "../../firebase/firebase.utils";

import styles from './main-header.module.css';


function MainHeader({ currentUser }) {
    const router = useRouter();
    const atAuth = router.route === '/auth' ? true : false;

    function reroute() {
        setTimeout(() => {
            console.log('logout reroute is running');
            router.replace('/auth');
        }, 1000);
    }

    function signOutUserHandler() {
        console.log('done');
        signOutUser();
    }

    if (currentUser === null && router.route !== '/auth') {
        console.log('no currentUser in mainheader!!');
        router.push('/auth');
    }

    return (
        <header className={atAuth ? styles.hidden : styles.mainheader}>
            <Link href="/decks">My Flashcards</Link>
            <nav>
                <ul>
                    <li>
                        <Link href="/public-decks">Public-Decks</Link>
                    </li>
                    <li>
                        <div onClick={signOutUserHandler}>Logout</div>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});

export default connect(mapStateToProps)(MainHeader);

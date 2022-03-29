// import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { signOutUser } from "../../firebase/firebase.utils";

// import { UserContext } from "../../contexts/user.context";

import styles from './main-header.module.css';

function MainHeader() {
    // const { currentUser } = useContext(UserContext);
    // console.log('currentUser: ', currentUser);

    const router = useRouter();
    const atAuth = router.route === '/auth' ? true : false;

    function signOutUserHandler() {
        signOutUser();
    }
    return (
        <header className={atAuth ? styles.hidden : styles.mainheader}>
            <Link href="/decks">My Flashcards</Link>
            <nav>
                <ul>
                    <li>
                        <Link href="/public-flashcards">Public-Flashcards</Link>
                    </li>
                    <li>
                        <Link href="/auth" >
                            <a>
                                <span onClick={signOutUserHandler}>Logout</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainHeader;

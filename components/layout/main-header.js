import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import { signOutUser } from "../../firebase/firebase.utils";

function MainHeader({ currentUser }) {
    const router = useRouter();
    const atAuth = router.route === '/auth' ? true : false;

    function signOutUserHandler() {
        console.log('done');
        signOutUser();
    }

    if (currentUser === null && router.route !== '/auth') {
        console.log('no currentUser in mainheader!!');
        router.push('/auth');
    }

    return (
        <header className={atAuth ? 'hidden' : 'w-screen h-12 flex items-center justify-between p-2 m-0 shadow-[0px_0px_0px_2px_rgba(199,199,199)] sm:h-20 sm:p-6'}>
            <Link href="/decks">
                <a className={
                    router.route === '/decks' || router.route === '/decks/[deckId]' 
                    ? 'px-2 sm:text-2xl sm:hover:text-[25px] lg:text-3xl lg:hover:text-[31px] underline' 
                    : "px-2 sm:text-2xl sm:hover:text-[25px] lg:text-3xl lg:hover:text-[31px]"
                } > 
                    My Decks
                </a>
            </Link>
            <nav>
                <ul className="flex">
                    <li>
                        <Link href="/public-decks">
                            <a className={
                                router.route === '/public-decks' || router.route === '/public-decks/[publicDeckId]' 
                                ? 'px-2 sm:text-2xl sm:mr-2 sm:hover:text-[25px] lg:text-3xl lg:hover:text-[31px] underline' 
                                : "px-2 sm:text-2xl sm:mr-2 sm:hover:text-[25px] lg:text-3xl lg:hover:text-[31px]"
                            }>
                                Public-Decks
                            </a>   
                        </Link>
                    </li>
                    <li>
                        <div className="px-2 sm:text-2xl cursor-pointer sm:hover:text-[25px] lg:text-3xl lg:hover:text-[31px]" onClick={signOutUserHandler}>Logout</div>
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

//className={router.route === '/decks' || router.route === '/decks/[deckId]' ? styles.active : styles.link}

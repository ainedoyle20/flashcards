import { Fragment } from "react";
import { useRouter } from "next/router";

function Hero() {
    const router = useRouter();
    return (
        <Fragment>
        <h1>Welcome!</h1>
        <button style={{ cursor: 'pointer'}} onClick={() => router.push('/decks')}>View Flashcards</button>
        </Fragment>
    );
}

export default Hero;

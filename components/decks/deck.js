import { useRouter } from 'next/router';

import styles from './deck.module.css';

function Deck({ deck, index }) {
    const router = useRouter();
    console.log('index: ', index);

    function handleClick() {
        if (router.route === '/decks') {
           router.push(`/decks/${deck.id}`); 
        } else {
            router.push(`/public-decks/${deck.id}`); 
        }
    }

    return (
        <div onClick={handleClick} className={styles.deck}>
            <h2>{deck.title}</h2>
            <span>{deck.description}</span>
            {
                deck.createrId === null ? <span>Created By: {deck.createdBy}</span> : null
            }
        </div>
    );
}

export default Deck;

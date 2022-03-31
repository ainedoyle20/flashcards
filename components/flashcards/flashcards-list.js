import { Fragment } from 'react';
import styles from './flashcards-list.module.css';

function FlashcardsList({ flashcards }) {
    return (
        <div className={styles.listcontainer}>
            <ul className={styles.list}>
                {
                    flashcards.map((flashcard, index) => {
                        return (
                            <li key={Math.floor(Math.random() * 10000)}>
                                <div>
                                    <span className={styles.index}>{index + 1}.</span>
                                    <span>{flashcard.question}</span>
                                </div>
                                <span>{flashcard.answer}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default FlashcardsList;

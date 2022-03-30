import styles from './flashcard.module.css';

function Flashcard({ flashcard }) {
    return (
        <div className={styles.flashcard}>
            <span>Question: {flashcard.question}</span>
            <span>Answer: {flashcard.answer}</span>
        </div>
    );
}

export default Flashcard;

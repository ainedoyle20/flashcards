import { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';

import Flashcard from './flashcard';
import IncrementArrow from '../../public/images/increment-arrow.svg';
import DecrementArrow from '../../public/images/decrement-arrow.svg';

import styles from './flashcards-carousel.module.css';

function FlashcardsCarousel({ flashcards }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeFlashcard, setActiveFlashcard] = useState();

    const totalLength = flashcards.length;
    const maxIndex = flashcards.length - 1;

    useEffect(() => {
        setActiveFlashcard(flashcards[activeIndex]);
        console.log('running carousel useEffect!');
    }, [activeIndex])

    function incrementActiveIndex() {
        if (activeIndex === maxIndex) {
            setActiveIndex(0);
        } else {
          setActiveIndex(activeIndex + 1);  
        }
    }

    function decrementActiveIndex() {
        if (activeIndex === 0) {
            setActiveIndex(maxIndex);
        } else {
           setActiveIndex(activeIndex -1); 
        }
    }

    if (!activeFlashcard) return <p>Loading...</p>

    return (
        <Fragment>
            <span>{activeIndex + 1}/{totalLength}</span>
            <div className={styles.carousel}>
                <span onClick={() => decrementActiveIndex()}>
                    <Image src={DecrementArrow} alt='back arrow' width={40} height={40} />
                </span>
                    <Flashcard 
                        flashcard={activeFlashcard}
                    />
                <span onClick={() => incrementActiveIndex()}>
                    <Image src={IncrementArrow} alt='forwards arrow' width={40} height={40} />
                </span>
            </div>    
        </Fragment>
        
    );
}

export default FlashcardsCarousel;

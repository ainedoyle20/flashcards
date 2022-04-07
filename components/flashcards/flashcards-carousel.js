import { useState, useEffect } from 'react';

import Flashcard from './flashcard';

function FlashcardsCarousel({ flashcards }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeFlashcard, setActiveFlashcard] = useState();

    const totalLength = flashcards.length;
    const maxIndex = flashcards.length - 1;

    useEffect(() => {
        setActiveFlashcard(flashcards[activeIndex]);
    }, [activeIndex, flashcards, setActiveFlashcard]);

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
        <div className="w-full flex flex-col items-center mt-[10vh]">
            <div className="flex justify-between items-center w-[90vw] mb-2 sm:w-[80vw] md:justify-center">
                <span className="text-2xl text-[#c0c0c0] cursor-pointer md:hidden" 
                    onClick={() => decrementActiveIndex()}
                >
                    &#8920;
                </span>
                <span>{activeIndex + 1}/{totalLength}</span>
                <span className="text-2xl text-[#c0c0c0] cursor-pointer md:hidden" onClick={() => incrementActiveIndex()}>
                    &#8921;
                </span>    
            </div>
            
            <div className="flex items-center mt-[1%]">
                <span className="text-4xl text-[#c0c0c0] border-l-[1px] border-[#c0c0c0] cursor-pointer mr-20 hidden md:flex" 
                    onClick={() => decrementActiveIndex()}
                >
                    &#8920;
                </span>
                <Flashcard 
                    flashcard={activeFlashcard}
                />
                <span className="text-4xl text-[#c0c0c0] border-r-[1px] border-[#c0c0c0] cursor-pointer ml-20 hidden md:flex" onClick={() => incrementActiveIndex()}>
                    &#8921;
                </span> 
            </div>    
        </div>
        
    );
}

export default FlashcardsCarousel;

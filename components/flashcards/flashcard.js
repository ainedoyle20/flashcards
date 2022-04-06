import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

function Flashcard({ flashcard }) {
    const [isFlipped, setIsFlipped] = useState(false);


    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection='vertical' >
            <div 
                className="flex justify-center w-[90vw] h-[40vh] cursor-pointer shadow-[1px_2px_2px_3px_rgba(180,180,180)] bg-notebook sm:w-[80vw] md:w-[60vw] lg:w-[50vw]" 
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className="w-4/5 flex flex-col items-center overflow-y-scroll">
                    <h2 className="text-2xl mt-10 mb-[12%]">Q.</h2>
                    <span>{flashcard.question}</span>
                </div>
            </div>

            <div 
                className="flex justify-center w-[90vw] h-[40vh] cursor-pointer shadow-[1px_2px_2px_3px_rgba(180,180,180)] bg-notebook sm:w-[80vw] md:w-[60vw] lg:w-[50vw]" 
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className="w-4/5 flex flex-col items-center overflow-y-scroll">
                    <h2 className="text-2xl mt-10 mb-[12%]">A.</h2>
                    <p>{flashcard.answer}</p>
                </div>
            </div>
        </ReactCardFlip>
    );
}

export default Flashcard;

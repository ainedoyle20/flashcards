import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

function Flashcard({ flashcard }) {
    const [isFlipped, setIsFlipped] = useState(false);


    return (
        <>
        {
        isFlipped
        ?  <div 
                className="flex justify-center w-[90vw] h-[40vh] overflow-scroll cursor-pointer shadow-[1px_2px_2px_3px_rgba(180,180,180)] bg-white sm:w-[80vw] md:w-[60vw] lg:w-[50vw]" 
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className="w-4/5 flex flex-col items-center overflow-y-scroll">
                    <h2 className="text-2xl mt-10 mb-[12%]">Q.</h2>
                    <span>{flashcard.question}</span>
                </div>
            </div>
        
        :   <div 
                className="flex justify-center w-[90vw] h-[40vh] overflow-y-scroll cursor-pointer shadow-[1px_2px_2px_3px_rgba(180,180,180)] bg-white sm:w-[80vw] md:w-[60vw] lg:w-[50vw]" 
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className="w-4/5 flex flex-col items-center overflow-scroll">
                    <h2 className="text-2xl mt-8 mb-[6%]">A.</h2>
                    <div>
                    {
                        flashcard.answer.match(/\n/g)||[].length > 0 
                        ? flashcard.answer.split("\n").map(line => <p key={Math.random(1000000*10000)} className="my-2">{line}</p>)
                        : <p>{flashcard.answer}</p>
                    }
                    </div>
                </div>
            </div>
        }
        </>
    );
}

export default Flashcard;

// bg-notebook
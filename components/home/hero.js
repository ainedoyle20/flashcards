import { useRouter } from "next/router";

function Hero() {
    const router = useRouter();
    return (
        <div className="w-screen h-screen">
            <div className="flex flex-col items-center justify-center h-3/4">
                <h1 className="text-lg mb-5 sm:text-2xl xl:text-4xl">Welcome to Flashcards!</h1>
                <span className="underline cursor-pointer" onClick={() => router.push('/decks')}>View Flashcards</span>
            </div>
        </div>
    );
}

export default Hero;

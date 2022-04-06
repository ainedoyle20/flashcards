import { useRouter } from "next/router";
import { connect } from "react-redux";

import Deck from "./deck";

function DecksGrid({ deckList, publicDecksList }) {

    const router = useRouter();
    const isPublicGrid = router.route === '/public-decks' ? true : false;

    const decks = isPublicGrid ? publicDecksList : deckList;

    return (
        <div className="grid grid-cols-fluid gap-4 p-3.5 sm:p-5">
            {
                decks.length 
                ? decks.map(deck => (
                    <Deck 
                        key={deck.id} 
                        deck={deck}
                    />
                ))
                : isPublicGrid 
                    ? <h2 className="text-lg">No Public Decks Available. <br /> Be the first to create a public deck!</h2>
                    : <h2 className="text-lg">No Decks Available <br /> Create your first deck to get started! </h2>
            }
        </div>
    );
}

const mapStateToProps = ({ decks, publicDecks }) => ({
    deckList: decks.deckList,
    publicDecksList: publicDecks.publicDecksList,
});

export default connect(mapStateToProps)(DecksGrid);

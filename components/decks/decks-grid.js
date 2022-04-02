import { Fragment } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import Deck from "./deck";

function DecksGrid({ deckList, publicDecksList }) {

    const router = useRouter();
    const isPublicGrid = router.route === '/public-decks' ? true : false;

    const decks = isPublicGrid ? publicDecksList : deckList;

    return (
        <Fragment>
            {
                decks.length 
                ? decks.map(deck => (
                    <Deck 
                        key={deck.id} 
                        deck={deck}
                    />
                ))
                : isPublicGrid 
                    ? <h2>No Public Decks Available</h2>
                    : <h2>No Decks Available</h2>
            }
        </Fragment>
    );
}

const mapStateToProps = ({ decks, publicDecks }) => ({
    deckList: decks.deckList,
    publicDecksList: publicDecks.publicDecksList,
});

export default connect(mapStateToProps)(DecksGrid);

import { Fragment } from "react";
import { useRouter } from "next/router";

import Deck from "./deck";

function DecksGrid({ props }) {
    const { decks, currentUserId } = props;

    const router = useRouter();
    const isPublicGrid = router.route === '/public-decks' ? true : false;

    const decksArray = [];
    if (decks !== undefined) {
      for (let key in decks) {
        decksArray.push({ ...decks[key], createrId: null });
      }
    }

    return (
        <Fragment>
            {
                decksArray.length 
                ? decksArray.map(deck => (
                    <Deck 
                        key={deck.id} 
                        deck={deck} 
                        currentUserId={currentUserId}
                    />
                ))
                : isPublicGrid 
                    ? <h2>No Public Decks Available</h2>
                    : <h2>No Decks Available</h2>
            }
        </Fragment>
    );
}

export default DecksGrid;

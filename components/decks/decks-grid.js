import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { fetchPrivateDecksAsync, fetchPublicDecksAsync } from '../../redux/decks/decks.actions';
import { selectDecks, selectIsDecksLoading } from "../../redux/decks/decks.selectors";
import { selectCurrentUser } from '../../redux/user/user.selectors';

import Deck from "./deck";
import Spinner from "../spinner/spinner";

function DecksGrid() {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const decks = useSelector(selectDecks);
    const isLoading = useSelector(selectIsDecksLoading);

    const router = useRouter();

    useEffect(() => {
        if (router.route === '/decks') {
            dispatch(fetchPrivateDecksAsync(currentUser.id));
        } else {
            dispatch(fetchPublicDecksAsync());
        }
    }, []);

    if (isLoading) {
        return <Spinner />
    }
    
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
                : (router.route === '/public-decks')
                    ? <h2 className="text-lg">No Public Decks Available. <br /> Be the first to create a public deck!</h2>
                    : <h2 className="text-lg">No Decks Available <br /> Create your first deck to get started! </h2>
            }
        </div>
    );
}

export default DecksGrid;

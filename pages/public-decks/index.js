import { Fragment, useState } from 'react';
import { getPublicDecks } from '../../firebase/firebase.utils';

import Deck from '../../components/decks/deck';
import DeckModal from '../../components/decks/deck-modal';

function PublicFlashcards(props) {
  const [showDeckModal, setShowDeckModal] = useState(false);
  const { publicDecks, currentUserId } = props;
  console.log('currentUserId: ', currentUserId);
  console.log('publicDecks: ', publicDecks);

  const publicDecksArr = [];
  if (publicDecks) {
    for (let key in publicDecks) {
      publicDecksArr.push({ ...publicDecks[key], id: key, createrId: null });
    }
  }

  return (
    <Fragment>
      <button onClick={() => setShowDeckModal(!showDeckModal)}>Create Public Deck</button>
      {
        showDeckModal ? <DeckModal currentUserId={currentUserId} /> : null
      }
      {
        !publicDecks ? <h1>No Public Decks Available</h1> : (
          publicDecksArr.map(publicDeck => <Deck key={publicDeck.id} deck={publicDeck} />)
        )
      }
    </Fragment>
  );
}

export async function getServerSideProps(context) {
    const currentUser = context.req.cookies.currentUser;
    const currentUserId = context.req.cookies.currentUserId
  
    if (currentUser === 'false') {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      }
    }

    const publicDecks = await getPublicDecks();
  
    return {
      props: {
        currentUser,
        publicDecks,
        currentUserId,
      }
    };
}

export default PublicFlashcards;

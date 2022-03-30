import { Fragment, useState } from 'react';
import { getDecks } from '../../firebase/firebase.utils';

import DeckModal from '../../components/decks/deck-modal';
import Deck from '../../components/decks/deck';

function DecksPage(props) {
  const [showDeckModal, setShowDeckModal] = useState(false);

  const { currentUserId } = props;
  const { decks } = props;
  console.log('UserId: ', currentUserId);
  console.log('decks', decks);
  const noDecks = decks ? false : true;

  const decksArray = [];
  if (!noDecks) {
    for (let key in decks) {
      decksArray.push({ ...decks[key], id: key});
    }
    console.log('decksArray: ', decksArray);
  }

  return (
    <Fragment>
      <button onClick={() => setShowDeckModal(!showDeckModal)}>Create Deck</button>
      {
        showDeckModal ? <DeckModal currentUserId={currentUserId} /> : null
      }
      {
        noDecks ? <h1>You currently have no flashcard decks</h1> : (
          decksArray.map(deck => <Deck key={deck.id} deck={deck} />)
        )
      }
    </Fragment>
    
  );
}

export async function getServerSideProps(context) {
  const currentUser = context.req.cookies.currentUser;
  const {currentUserId} = context.req.cookies;

  if (currentUser === 'false') {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  const decks = await getDecks(currentUserId);

  return {
    props: {
      currentUserId,
      decks,
    }
  };
}

export default DecksPage;
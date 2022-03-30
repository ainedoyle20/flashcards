import { Fragment, useState } from 'react';
import { getSpecificDeck } from '../../firebase/firebase.utils';

import FlashcardModal from '../../components/flashcards/flashcard-modal';
import Flashcard from '../../components/flashcards/flashcard';

function SpecificDeckPage(props) {
  const [showFlascardModal, setShowFlashcardModal] = useState(false);

  const { deck, currentUserId, deckId } = props;
  const flashcards = deck.flashcards;
  console.log('specificDeck: ', deck);
  console.log('specificDeck.flashcards: ', deck.flashcards);


  return (
    <Fragment>
      <button onClick={() => setShowFlashcardModal(!showFlascardModal)}>Add Flashcard</button>
      {
        showFlascardModal ? <FlashcardModal currentUserId={currentUserId} deck={deck} deckId={deckId} /> : null
      }
      {
        !flashcards.length ? <h1>No flashcards created in this deck yet!</h1> : (
          flashcards.map(flashcard => <Flashcard key={flashcard.question} flashcard={flashcard} />)
        )
      }
    </Fragment>
  );
}

export async function getServerSideProps(context) {
    const currentUser = context.req.cookies.currentUser;
    const {currentUserId} = context.req.cookies;
    const deckId = context.params.deckId;
    console.log('deckId: ', deckId);
  
    if (currentUser === 'false') {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      }
    }
  
    const specificDeck = await getSpecificDeck(currentUserId, deckId);

    if (!specificDeck) {
      return {
        redirect: {
          destination: '/decks',
          permanent: false,
        }
      }
    }
  
    return {
      props: {
        currentUserId,
        deck: specificDeck,
        deckId,
      }
    };
  }

export default SpecificDeckPage;

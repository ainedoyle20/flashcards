import { Fragment, useState } from 'react';
import { getSpecificPublicDeck } from '../../firebase/firebase.utils';

import FlashcardModal from '../../components/flashcards/flashcard-modal';
import Flashcard from '../../components/flashcards/flashcard';

function SpecificDeckPage(props) {
  const [showFlascardModal, setShowFlashcardModal] = useState(false);

  const { deck, currentUserId, publicDeckId } = props;
  const flashcards = deck.flashcards;
  console.log('specificPublicDeck: ', deck);
  console.log('specificPublicDeck.createrId: ', deck.createrId);

  return (
    <Fragment>
      <button onClick={() => setShowFlashcardModal(!showFlascardModal)}>Add Flashcard</button>
      {
        showFlascardModal ? <FlashcardModal currentUserId={currentUserId} deck={deck} deckId={publicDeckId} /> : null
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
    const publicDeckId = context.params.publicDeckId;
  
    if (currentUser === 'false') {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      }
    }
  
    const specificPublicDeck = await getSpecificPublicDeck(publicDeckId);

    if (!specificPublicDeck) {
      return {
        redirect: {
          destination: '/public-decks',
          permanent: false,
        }
      }
    }
  
    return {
      props: {
        currentUserId,
        deck: specificPublicDeck,
        publicDeckId,
      }
    };
}

export default SpecificDeckPage;

import { getSpecificDeck } from '../../firebase/firebase.utils';

import FlashcardsContainer from '../../components/flashcards/flashcards-container';

function SpecificDeckPage(props) {
  return (
    <FlashcardsContainer props={props} />
  );
}

export async function getServerSideProps(context) {
    const currentUser = context.req.cookies.currentUser;
    const currentUserId = context.req.cookies.currentUserId;
    const deckId = context.params.deckId;
  
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
        deck: specificDeck,
      }
    };
  }

export default SpecificDeckPage;

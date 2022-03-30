import { Fragment, useState } from 'react';
import { getSpecificDeck } from '../../firebase/firebase.utils';

import FlashcardsContainer from '../../components/flashcards/flashcards-container';

function SpecificDeckPage(props) {
  return (
    <Fragment>
      <FlashcardsContainer props={props} />
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

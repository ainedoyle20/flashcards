import { Fragment } from 'react';
import Head from 'next/head';

import { getSpecificPublicDeck } from '../../firebase/firebase.utils';

import FlashcardsContainer from '../../components/flashcards/flashcards-container';

function SpecificPublicDeckPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.deck.title}</title>
        <meta name="content" content="The flashcards of a specific deck." />
      </Head>
      <FlashcardsContainer props={props} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
    const currentUser = context.req.cookies.currentUser;
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
        deck: specificPublicDeck,
      }
    };
}

export default SpecificPublicDeckPage;

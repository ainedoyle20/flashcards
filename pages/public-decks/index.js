import { Fragment } from 'react';
import Head from 'next/head';

import { getPublicDecks } from '../../firebase/firebase.utils';

import DecksContainer from '../../components/decks/decks-container';

function PublicFlashcards(props) {
  return (
    <Fragment>
      <Head>
        <title>Public Decks</title>
        <meta name="content" content="Public flashcard decks." />
      </Head>
      <DecksContainer props={props} />
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
      decks: publicDecks,
      currentUserId,
    }
  };
}

export default PublicFlashcards;

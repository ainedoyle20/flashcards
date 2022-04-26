import { Fragment } from 'react';
import Head from 'next/head';

import DecksContainer from '../../components/decks/decks-container';

function PublicFlashcards(props) {
  return (
    <Fragment>
      <Head>
        <title>Public Decks</title>
        <meta name="content" content="Public flashcard decks." />
      </Head>
      <DecksContainer />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const currentUser = context.req.cookies.currentUser;
  const currentUserId = context.req.cookies.currentUserId

  if (currentUser === 'false' || currentUser === undefined) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {
      currentUser,
    }
  };
}

export default PublicFlashcards;

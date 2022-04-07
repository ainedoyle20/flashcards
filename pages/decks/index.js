import { Fragment } from 'react';
import Head from 'next/head';

import { getDecks } from '../../firebase/firebase.utils';

import DecksContainer from '../../components/decks/decks-container';

function DecksPage(props) {

  return (
    <Fragment>
      <Head>
        <title>Private Decks</title>
        <meta name="content" content="Private flashcard decks." />
      </Head>
      <DecksContainer props={props} />
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
      decks,
    }
  };
}

export default DecksPage;
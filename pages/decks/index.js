import { Fragment } from 'react';
import Head from 'next/head';

import DecksContainer from '../../components/decks/decks-container';

function DecksPage() {
  return (
    <Fragment>
      <Head>
        <title>Private Decks</title>
        <meta name="content" content="Private flashcard decks." />
      </Head>
      <DecksContainer />
    </Fragment>
    
  );
}

export async function getServerSideProps(context) {
  const currentUser = context.req.cookies.currentUser;

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

export default DecksPage;
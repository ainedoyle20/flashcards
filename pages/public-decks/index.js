import { getPublicDecks } from '../../firebase/firebase.utils';

import DecksContainer from '../../components/decks/decks-container';

function PublicFlashcards(props) {
  return (
    <DecksContainer props={props} />
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

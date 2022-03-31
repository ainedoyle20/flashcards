import { getDecks } from '../../firebase/firebase.utils';

import DecksContainer from '../../components/decks/decks-container';

function DecksPage(props) {

  return (
    <DecksContainer props={props} />
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
      currentUserId,
      decks,
    }
  };
}

export default DecksPage;
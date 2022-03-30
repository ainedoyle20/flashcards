import { getDecks } from '../../firebase/firebase.utils';

function DecksPage(props) {
  const { decks } = props;
  console.log('decks: ', decks);
  return (
    <h1>Decks Page</h1>
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
      currentUser,
      decks,
    }
  };
}

export default DecksPage;

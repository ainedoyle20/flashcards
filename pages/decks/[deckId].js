import { getSpecificDeck } from '../../firebase/firebase.utils';

function SpecificDeckPage(props) {
    const { deck } = props;
    console.log('specificDeck: ', deck);
    console.log('specificDeck[flashcards]: ', deck['flashcards']);
    console.log('specificDeck.flashcards: ', deck.flashcards);
    return (
        <h1>Specific Deck Page</h1>
    );
}

export async function getServerSideProps(context) {
    const currentUser = context.req.cookies.currentUser;
    const {currentUserId} = context.req.cookies;
    console.log('type of currentUserId: ', typeof currentUserId);
  
    if (currentUser === 'false') {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      }
    }
  
    const specificDeck = await getSpecificDeck(currentUserId, 1);

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
        currentUser,
        deck: specificDeck,
      }
    };
  }

export default SpecificDeckPage;

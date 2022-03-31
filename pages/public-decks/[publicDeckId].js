import { Fragment, useState } from 'react';

import { getSpecificPublicDeck } from '../../firebase/firebase.utils';

import DeleteErrorModal from '../../components/decks/delete-error-modal';
import FlashcardsContainer from '../../components/flashcards/flashcards-container';

function SpecificPublicDeckPage(props) {
  const [showErrorModal, setShowErrorModal] = useState(false);

  return (
    <Fragment>
      {showErrorModal ? <DeleteErrorModal setShowDeleteErrorModal={setShowErrorModal} /> : null}
      <FlashcardsContainer props={props} setShowErrorModal={setShowErrorModal} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
    const currentUser = context.req.cookies.currentUser;
    const {currentUserId} = context.req.cookies;
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
        currentUserId,
        deck: specificPublicDeck,
      }
    };
}

export default SpecificPublicDeckPage;

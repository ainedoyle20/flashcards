function PublicFlashcards() {
    return (
        <h1>Public Flashcards</h1>
    );
}

export async function getServerSideProps(context) {
    const currentUser = context.req.cookies.currentUser;
  
    if (currentUser === 'false') {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      }
    }
  
    return {
      props: {currentUser}
    };
}

export default PublicFlashcards;

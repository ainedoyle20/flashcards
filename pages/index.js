import { Fragment } from "react";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  return (
    <Fragment>
      <h1>Welcome!</h1>
      <button style={{ cursor: 'pointer'}} onClick={() => router.push('/decks')}>View Flashcards</button>
    </Fragment>
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
    props: {
      currentUser
    }
  };
}

export default Home;

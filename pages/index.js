import Head from 'next/head';
import { Fragment } from 'react';
import Hero from '../components/home/hero';

function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Hero props={props} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  let currentUser = context.req.cookies.currentUser;

  if (currentUser === 'false' || currentUser === undefined) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  if (currentUser === undefined) {
    currentUser = null;
  }

  return {
    props: {
      currentUser,
    }
  };
}

export default Home;

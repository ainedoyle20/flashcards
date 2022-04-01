import Hero from '../components/home/hero';

function Home(props) {
  return (
    <Hero props={props} />
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

  console.log('currentUser in /: ', currentUser);
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

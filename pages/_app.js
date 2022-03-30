import { CookiesProvider } from "react-cookie";
import { UserContextProvider } from '../contexts/user.context';
import Layout from '../components/layout/layout';

import '../styles/globals.css'
import { Fragment } from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <UserContextProvider>
          <Fragment>
              <Layout>
                <Component {...pageProps} />
              </Layout>
          </Fragment>
      </UserContextProvider>
    </CookiesProvider>
  );
}

export default MyApp;

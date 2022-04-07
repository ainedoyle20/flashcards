import { Fragment } from 'react';
import Head from 'next/head';
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '../redux/store';
import Layout from '../components/layout/layout';
import Auth from '../components/auth/auth';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CookiesProvider>
              <Fragment>
                <Auth>
                  <Layout>
                    <Head>
                      <title>Flashcards App</title>
                      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    </Head>
                    <Component {...pageProps} />
                  </Layout>
                </Auth>
              </Fragment>
        </CookiesProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
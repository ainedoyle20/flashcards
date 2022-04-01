import { Fragment } from 'react';
import { CookiesProvider } from "react-cookie";
// import { UserContextProvider } from '../contexts/user.context';
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
          {/* <UserContextProvider> */}
              <Fragment>
                <Auth>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </Auth>
              </Fragment>
          {/* </UserContextProvider> */}
        </CookiesProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
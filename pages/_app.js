import { Fragment } from 'react';
import { CookiesProvider } from "react-cookie";
import { UserContextProvider } from '../contexts/user.context';
import { Provider } from "react-redux";

import store from '../redux/store';
import Layout from '../components/layout/layout';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <UserContextProvider>
            <Fragment>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
            </Fragment>
        </UserContextProvider>
      </CookiesProvider>
    </Provider>
  );
}

export default MyApp;

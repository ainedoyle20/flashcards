import { createContext, useState, useEffect } from "react";
// import { useCookies } from 'react-cookie';
import useCookie from "../custom-hooks/useCookie";

import { onAuthStateChanged, createUserProfileDocument, auth, getDoc } from '../firebase/firebase.utils'

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export function UserContextProvider({ children }) {
  // const [cookies, setCookie] = useCookies(['currentUser']);
  const [ currentUser, setCurrentUser ] = useState(null);
  const value = { currentUser, setCurrentUser };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async userAuth => {
      console.log('userContext useEffect running');

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        const snapShot = await getDoc(userRef);

        const currentUserId = snapShot.id;

        // await createUserDeckDocument(currentUserId);

        setCurrentUser({
          id: currentUserId,
          ...snapShot.data(),
        });
        // setCookie('currentUser', true, { path: '/' });
      } else {
        setCurrentUser(userAuth);
        // setCookie('currentUser', false, { path: '/' });
      }
      
    });

    return unsubscribe;
  }, []);

  useCookie(currentUser);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

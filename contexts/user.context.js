// import { createContext, useState, useEffect } from "react";
// import useCookie from "../custom-hooks/useCookie";

// import { onAuthStateChanged, createUserProfileDocument, auth, getDoc } from '../firebase/firebase.utils';

// export const UserContext = createContext({
//   user: null,
// });

// export function UserContextProvider({ children }) {
//   const [ user, setUser ] = useState(null);
//   const value = { user };
  
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async userAuth => {
//       console.log('userContext useEffect running');

//       if (userAuth) {
//         const userRef = await createUserProfileDocument(userAuth);
//         const snapShot = await getDoc(userRef);

//         const currentUserId = snapShot.id;
//         setUser({
//           id: currentUserId,
//           ...snapShot.data(),
//         });
//       } else {
//         setUser(userAuth);
//       }
//     });

//     return unsubscribe;
//   }, []);

//   useCookie(user);

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
// };

import { useEffect } from "react";
import { useCookies } from 'react-cookie';
import { connect } from "react-redux";

import { setCurrentUser } from "../../redux/user/user.actions";
import { onAuthStateChanged, auth, getDoc, createUserProfileDocument } from '../../firebase/firebase.utils';

function Auth({ children, setCurrentUser}) {
    const [cookies, setCookie] = useCookies(['currentUser']);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async userAuth => {
          console.log('auth useEffect running');
    
          if (userAuth) {
            const userRef = await createUserProfileDocument(userAuth);
            const snapShot = await getDoc(userRef);
    
            const currentUserId = snapShot.id;

            const currentUserData = {
              id: currentUserId,
              ...snapShot.data(),
            }

            setCurrentUser(currentUserData);

            setCookie('currentUser', true, { path: '/' });
            setCookie('currentUserId', currentUserId, { path: '/' });

          } else {
            setCurrentUser(userAuth);

            setCookie('currentUser', false, { path: '/' });
            setCookie('currentUserId', null, { path: '/' });
          }
        });
    
        return unsubscribe;
    }, []);

    return (
        <main>
            {children}
        </main>
    );
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: (userData) => dispatch(setCurrentUser(userData)),
});

export default connect(null, mapDispatchToProps)(Auth);

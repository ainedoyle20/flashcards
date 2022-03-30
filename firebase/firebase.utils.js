import { initializeApp } from "firebase/app";

import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
} from 'firebase/auth';

import { getFirestore, onSnapshot, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJJzthwt-KQMuz9EdTgB8fnKEaiS_ql7Q",
  authDomain: "flashcards-5a8a6.firebaseapp.com",
  projectId: "flashcards-5a8a6",
  storageBucket: "flashcards-5a8a6.appspot.com",
  messagingSenderId: "592767297119",
  appId: "1:592767297119:web:172aa157cdad91bbc85dea"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Start of user related functions
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(db, 'users', `${userAuth.uid}`);
    const snapShot = await getDoc(userRef);

    if (!snapShot.exists() && userAuth.uid) {
        const { email, displayName } = userAuth;
        console.log('inside createUserProfileDoc:, email: ', email);
        console.log('inside createUserProfileDoc:, additionalData: ', additionalData);
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user document: ', error.message);
        }
    }

    return userRef;
}

export const registerWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const loginWithEmailAndPassword = async (email, password) => {
    console.log('loginWithEmailAndPassword');
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => signInWithPopup(auth, provider).then((result) => console.log('signed in with google: ', result)).catch(error => console.log(error.message));
// End of user related functions

// Start of flashcard functions
async function setDeckDoc(currentUserId) {
    const deckRef = doc(db, 'decks', currentUserId);

    try {
        await setDoc(deckRef, {
            decks: {},
        });
    } catch (error) {
        console.log('error setting deck document: ', error.message);
    }
}

// export async function createUserDeckDocument(currentUserId) {
//     const decksRef = doc(db, 'decks', currentUserId);
//     const decksSnap = await getDoc(decksRef);

//     if (!decksSnap.exists()) {
//         console.log('decks document does NOT exist');
//         try {
//             await setDeckDoc(currentUserId);
//         } catch (error) {
//             console.log('error creating user deck doc: ', error.message);
//         }
//     }

//     console.log('got here');
//     return;
// }

export async function getDecks(currentUserId) {
    const decksRef = doc(db, 'decks', currentUserId);
    const decksSnap = await getDoc(decksRef);

    if (!decksSnap.exists()) {
        return {};
    }

    const decks = decksSnap.data();
    return decks;
}

export async function getSpecificDeck(currentUserId, deckId) {
    const allDecks = await getDecks(currentUserId);
    console.log('allDecks: ', allDecks);

    if (allDecks === {}) {
        console.log('got in here')
        return;
    }

    return allDecks[deckId];
}

export {onAuthStateChanged, onSnapshot, auth, getDoc};

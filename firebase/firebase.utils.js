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

import { getFirestore, onSnapshot, doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore';

// For unique ids
import { v4 as createUid } from 'uuid';

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
export async function checkIsCreator(currentUserId, deckId) {
    const specificPublicDeck = await getSpecificPublicDeck(deckId);
    console.log('specificPublicDeck.createrId: ', specificPublicDeck.createrId);
    console.log('currentUserId: ', currentUserId);
    return currentUserId === specificPublicDeck.createrId;
}

async function updatePublicDecks(deckRef, currentUserId, publicDeckObj) {
    const { title, description, createdBy } = publicDeckObj;
    const uniqueId = createUid();

    console.log('currentUserId: ', currentUserId);
    try {
        await updateDoc(deckRef, {
            [uniqueId]: {
                title: title,
                description: description,
                createdBy: createdBy,
                flashcards: [],
                createrId: currentUserId,
                id: uniqueId,
            }
        })
    } catch (error) {
        console.log('error updating public decks in updatePublicDecks func: ', error.message);
    }
}


async function updateDeckDoc(currentUserId, deckObj) {
    const deckRef = doc(db, 'decks', currentUserId);

    const { title, description, createdBy } = deckObj;
    const uniqueId = createUid();
    // console.log('uniqueId: ', uniqueId);

    try {
        await updateDoc(deckRef, {
            [uniqueId]: {
                title: title,
                description: description,
                createdBy: createdBy,
                flashcards: [],
                id: uniqueId,
            }
        })
    } catch (error) {
        console.log('error updating doc in updateDeckDoc func: ', error.message);
    }
}

async function setDeckDoc(currentUserId, deckObj) {
    const deckRef = doc(db, 'decks', currentUserId);

    const { title, description, createdBy } = deckObj;
    const uniqueId = createUid();

    try {
        await setDoc(deckRef, {
            [uniqueId]: {
                title,
                description,
                createdBy,
                flashcards: [],
                id: uniqueId,
            },
        });
    } catch (error) {
        console.log('error setting deck document inside setDeckDoc: ', error.message);
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

export async function deletePublicDeck(deckId) {
    const publicDecksId = 'PUBLIC_DECKS_UID';
    const decksRef = doc(db, 'public-decks', publicDecksId);

    try {
        await updateDoc(decksRef, {
            [deckId]: deleteField()
        });
    } catch (error) {
        console.log('error deleting deck', error.message);
    }
}

export async function deletePublicFlashcard(currentUserId, specificDeckId, flashcardQuestion) {
    const isCreator = await checkIsCreator(currentUserId, specificDeckId);
    if (!isCreator) return false;

    const publicDecksId = 'PUBLIC_DECKS_UID';

    const decksRef = doc(db, 'public-decks', publicDecksId);
    const deckSnap = await getDoc(decksRef);
    const specificDeck = deckSnap.data()[specificDeckId];
    const flashcards = specificDeck.flashcards;
    const filteredFlashcards = flashcards.filter(flashcard => flashcard.question !== flashcardQuestion);

    try {
        await updateDoc(decksRef, {
            [specificDeckId]: {
                ...specificDeck,
                flashcards: filteredFlashcards,
            }
        });
        return true;
    } catch (error) {
        console.log('error deleting public flashcard: ', error.message);
    }
}

export async function updateFlashcardsPublic(currentUserId, deck, flashcardObj) {
    const isCreator = await checkIsCreator(currentUserId, deck.id);
    if (!isCreator) return false;

    const publicDecksId = 'PUBLIC_DECKS_UID';

    const decksRef = doc(db, 'public-decks', publicDecksId);
    const decksSnap = await getDoc(decksRef);
    const flashcards = decksSnap.data()[deck.id].flashcards;
    flashcards.push(flashcardObj);

    try {
        await updateDoc(decksRef, {
            [deck.id]: {
                ...deck,
                flashcards: flashcards,
            }
        });
    } catch (error) {
        console.log('error updating public flashcards: ', error.message);
    }

    return true;
}

export async function getSpecificPublicDeck(deckId) {
    const allPublicDecks = await getPublicDecks();

    if (!allPublicDecks) {
        return;
    }

    return allPublicDecks[deckId];
}

export async function getPublicDecks() {
    const publicDecksId = 'PUBLIC_DECKS_UID';

    const decksRef = doc(db, 'public-decks', publicDecksId);
    const decksSnap = await getDoc(decksRef);
    console.log('decksSnap.data(): ', decksSnap.data().length);

    const publicDecks = decksSnap.data();
    return publicDecks;
}

export async function deleteDeck(currentUserId, deckId) {
    const decksRef = doc(db, 'decks', currentUserId);

    try {
        await updateDoc(decksRef, {
            [deckId]: deleteField()
        });
    } catch (error) {
        console.log('error deleting deck', error.message);
    }
}

export async function deleteFlashcard(currentUserId, specificDeckId, flashcardQuestion) {
    const deckRef = doc(db, 'decks', currentUserId);
    const deckSnap = await getDoc(deckRef);
    const deckData = deckSnap.data();
    const specificDeck = deckData[specificDeckId];
    const flashcards = specificDeck.flashcards;
    const filteredFlashcards = flashcards.filter(flashcard => flashcard.question !== flashcardQuestion);

    try {
        await updateDoc(deckRef, {
            [specificDeckId]: {
                ...specificDeck,
                flashcards: filteredFlashcards,
            }
        });
    } catch (error) {
        console.log('error deleting flashcard: ', error.message);
    }
}

export async function updateFlashcards(currentUserId, deck, flashcardObj) {
    const deckRef = doc(db, 'decks', currentUserId);
    const deckSnap = await getDoc(deckRef);
    const deckData = deckSnap.data();
    const flashcards = deckData[deck.id].flashcards;
    flashcards.push(flashcardObj);

    try {
        await updateDoc(deckRef, {
            [deck.id]: {
                ...deck,
                flashcards: flashcards,
            }
        });
    } catch (error) {
        console.log('error updating flashcards: ', error.message);
    }
}

export async function editDeck(currentUserId, deckId, deckContent) {
    const decksRef = doc(db, 'decks', currentUserId);
    const deckSnap = await getDoc(decksRef);
    const specificDeckData = deckSnap.data()[deckId];

    const { title, description, createdBy } = deckContent;

    try {
        updateDoc(decksRef, {
            [deckId]: {
                ...specificDeckData,
                title,
                description,
                createdBy,
            }
        })
    } catch (error) {
        console.log('Error editing deck: ', error.message);
    }
}

export async function getDecks(currentUserId) {
    const decksRef = doc(db, 'decks', currentUserId);
    const decksSnap = await getDoc(decksRef);

    if (!decksSnap.exists()) {
        return false;
    }

    const decks = decksSnap.data();
    return decks;
}

export async function getSpecificDeck(currentUserId, deckId) {
    const allDecks = await getDecks(currentUserId);

    if (!allDecks) {
        console.log('got in here')
        return;
    }

    return allDecks[deckId];
}

export async function createPublicDeck(currentUserId, publicDeckObj) {
    const publicDecksId = 'PUBLIC_DECKS_UID';

    const decksRef = doc(db, 'public-decks', publicDecksId);
    try {
        await updatePublicDecks(decksRef, currentUserId, publicDeckObj);
    } catch (error) {
        console.log('error creating public deck: ', error.message);
    }
}

export async function createDeck(currentUserId, deckObj) {
    const decksRef = doc(db, 'decks', currentUserId);
    const decksSnap = await getDoc(decksRef);

    if (!decksSnap.exists()) {
        try {
            console.log('decksSnap does NOT exist');
            await setDeckDoc(currentUserId, deckObj);
        } catch (error) {
            console.log('error creating user deck doc: ', error.message);
        }
    } else {
        try {
            console.log('decksSnap DOES exist');
            await updateDeckDoc(currentUserId, deckObj);
        } catch (error) {
            console.log('error updating deck doc', error.message);
        }
    }
}

export const tempFunc = () => {
    return 'Hello from firbase!';
}

export {onAuthStateChanged, onSnapshot, auth, getDoc};

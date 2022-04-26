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

// USER FUNCTIONS START
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(db, 'users', `${userAuth.uid}`);
    const snapShot = await getDoc(userRef);

    if (!snapShot.exists() && userAuth.uid) {
        const { email, displayName } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user document.');
        }
    }

    return userRef;
}

export const registerWithEmailAndPassword = (email, password) => {
    if (!email || !password) return;
    return createUserWithEmailAndPassword(auth, email, password);
}

export const loginWithEmailAndPassword = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => signInWithPopup(auth, provider).then((result) => console.log('Successfully signed in with google.')).catch(error => console.log('Error signing in with google.'));
// USER FUNCTIONS END

// HELPERS
async function updatePublicDecks(deckRef, currentUserId, publicDeckObj) {
    const { title, description, createdBy } = publicDeckObj;
    const uniqueId = createUid();
    const createdAt = Date();

    const createdPublicDeck = {
        title: title,
        description: description,
        createdBy: createdBy,
        createdAt,
        flashcards: [],
        createrId: currentUserId,
        id: uniqueId,
    }
    
    try {
        await updateDoc(deckRef, {
            [uniqueId]: createdPublicDeck,
        });
    } catch (error) {
        console.log('Error updating public decks.');
    }

    return createdPublicDeck;
}

async function updateDeckDoc(currentUserId, deckObj) {
    const deckRef = doc(db, 'decks', currentUserId);

    const { title, description, createdBy } = deckObj;
    const uniqueId = createUid();
    const createdAt = Date();

    const createdDeck = {
        title: title,
        description: description,
        createdBy: createdBy,
        createdAt,
        flashcards: [],
        id: uniqueId,
    }

    try {
        await updateDoc(deckRef, {
            [uniqueId]: createdDeck,
        });
    } catch (error) {
        console.log('Error updating document.');
    }

    return createdDeck;
}

async function setDeckDoc(currentUserId, deckObj) {
    const deckRef = doc(db, 'decks', currentUserId);

    const { title, description, createdBy } = deckObj;
    const uniqueId = createUid();
    const createdAt = Date();

    const createdDeck = {
        title,
        description,
        createdBy,
        createdAt,
        flashcards: [],
        id: uniqueId,
    }

    try {
        await setDoc(deckRef, {
            [uniqueId]: createdDeck,
        });
        return createdDeck;
    } catch (error) {
        console.log('Error setting deck document inside setDeckDoc.');
    }
}

export async function checkIsCreator(currentUserId, deckId) {
    const specificPublicDeck = await getSpecificPublicDeck(deckId);
    return currentUserId === specificPublicDeck.createrId;
}

// FLASHCARDS
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
        console.log('Error deleting public flashcard.');
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
        console.log('Error deleting flashcard.');
    }
}

export async function updateFlashcardsPublic(currentUserId, deck, flashcardObj) {
    const isCreator = await checkIsCreator(currentUserId, deck.id);
    if (!isCreator) return false;

    const publicDecksId = 'PUBLIC_DECKS_UID';

    const decksRef = doc(db, 'public-decks', publicDecksId);
    const decksSnap = await getDoc(decksRef);
    const flashcards = decksSnap.data()[deck.id].flashcards;

    const filteredFlashcards = flashcards.filter(flashcard => flashcard.question !== flashcardObj.question);

    filteredFlashcards.push(flashcardObj);

    try {
        await updateDoc(decksRef, {
            [deck.id]: {
                ...deck,
                flashcards: filteredFlashcards,
            }
        });
    } catch (error) {
        console.log('Error updating public flashcards.');
    }

    return true;
}

export async function updateFlashcards(currentUserId, deck, flashcardObj) {
    const deckRef = doc(db, 'decks', currentUserId);
    const deckSnap = await getDoc(deckRef);
    const deckData = deckSnap.data();
    
    const flashcards = deckData[deck.id].flashcards;

    const filteredFlashcards = flashcards.filter(flashcard => flashcard.question !== flashcardObj.question);

    filteredFlashcards.push(flashcardObj);

    try {
        await updateDoc(deckRef, {
            [deck.id]: {
                ...deck,
                flashcards: filteredFlashcards,
            }
        });
    } catch (error) {
        console.log('Error updating flashcards.');
    }
}

// COPY AND POST
export async function copyPublicDeck(currentUserId, strippedDeck) {
    const { title, description, createdBy, flashcards } = strippedDeck;

    const uniqueId = createUid();
    const createdAt = Date();

    const copiedDeck = {
        title,
        description,
        createdBy,
        createdAt,
        flashcards,
        id: uniqueId,
    }

    const decksRef = doc(db, 'decks', currentUserId);
    const decksSnap = await getDoc(decksRef);

    if (!decksSnap.exists()) {
        try {
            const createdDeck = await setDoc(decksRef, {
                [uniqueId]: copiedDeck,
            });
            return createdDeck;
        } catch (error) {
            console.log('Error copying public deck.');
        }
    }

    try {
        const createdDeck = await updateDoc(decksRef, {
            [uniqueId]: copiedDeck,
        });
        return createdDeck;
    } catch (error) {
        console.log('Error copying public deck.');
    }
}

export async function postDeck(currentUserId, specificDeck) {
    const { title, description, createdBy, flashcards } = specificDeck;
    const uniqueId = createUid();
    const createdAt = Date();

    const publicDecksId = 'PUBLIC_DECKS_UID';
    const decksRef = doc(db, 'public-decks', publicDecksId);

    try {
        await updateDoc(decksRef, {
            [uniqueId]: {
                title,
                description,
                createdBy,
                createdAt,
                flashcards,
                createrId: currentUserId,
                id: uniqueId,
            }
        });
    } catch (error) {
        console.log('Error posting deck.');
    }
}

// DELETE
export async function deletePublicDeck(deckId) {
    const publicDecksId = 'PUBLIC_DECKS_UID';
    const decksRef = doc(db, 'public-decks', publicDecksId);

    try {
        await updateDoc(decksRef, {
            [deckId]: deleteField()
        });
    } catch (error) {
        console.log('Error deleting deck.');
    }
}

export async function deleteDeck(currentUserId, deckId) {
    const decksRef = doc(db, 'decks', currentUserId);

    try {
        await updateDoc(decksRef, {
            [deckId]: deleteField()
        });
    } catch (error) {
        console.log('Error deleting deck.');
    }
}

// EDIT
export async function editPublicDeck(deckId, deckContent) {
    const publicDecksId = 'PUBLIC_DECKS_UID';

    const decksRef = doc(db, 'public-decks', publicDecksId);
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
        console.log('Error editing public deck.');
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
        console.log('Error editing deck.');
    }
}

// GET SPECIFIC DECK
export async function getSpecificPublicDeck(deckId) {
    const allPublicDecks = await getPublicDecks();

    if (!allPublicDecks) {
        return;
    }

    return allPublicDecks[deckId];
}

export async function getSpecificDeck(currentUserId, deckId) {
    const allDecks = await getDecks(currentUserId);

    if (!allDecks) {
        return;
    }

    return allDecks[deckId];
}

// GET ALL DECKS
export async function getPublicDecks() {
    const publicDecksId = 'PUBLIC_DECKS_UID';

    const decksRef = doc(db, 'public-decks', publicDecksId);
    const decksSnap = await getDoc(decksRef);

    const publicDecks = decksSnap.data();
    return publicDecks;
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

// CREATE DECKS
export async function createPublicDeck(currentUserId, publicDeckObj) {
    const publicDecksId = 'PUBLIC_DECKS_UID';

    const decksRef = doc(db, 'public-decks', publicDecksId);
    try {
        const createdPublicDeck = await updatePublicDecks(decksRef, currentUserId, publicDeckObj);
        return createdPublicDeck;
    } catch (error) {
        console.log('error creating public deck');
    }
}

export async function createDeck(currentUserId, deckObj) {
    const decksRef = doc(db, 'decks', currentUserId);
    const decksSnap = await getDoc(decksRef);

    if (!decksSnap.exists()) {
        try {
            const createdDeck = await setDeckDoc(currentUserId, deckObj);
            return createdDeck;
        } catch (error) {
            console.log('error creating decks document');
        }
    } else {
        try {
            const createdDeck = await updateDeckDoc(currentUserId, deckObj);
            return createdDeck;
        } catch (error) {
            console.log('error creating deck');
        }
    }
}

export {onAuthStateChanged, onSnapshot, auth, getDoc};

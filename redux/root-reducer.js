import { combineReducers } from "redux";

import modalsReducer from "./modals/modals-reducer";
import decksReducer from './decks/decks.reducer';
import flashcardsReducer from "./flashcards/flashcards.reducer";
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
    modals: modalsReducer,
    decks: decksReducer,
    flashcards: flashcardsReducer,
    user: userReducer,
});

export default rootReducer;

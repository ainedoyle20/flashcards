import { combineReducers } from "redux";

import modalsReducer from "./modals/modals-reducer";
import decksReducer from './decks/decks.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
    modals: modalsReducer,
    decks: decksReducer,
    user: userReducer,
});

export default rootReducer;

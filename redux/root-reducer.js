import { combineReducers } from "redux";

import modalsReducer from "./modals/modals-reducer";

const rootReducer = combineReducers({
    modals: modalsReducer,
});

export default rootReducer;

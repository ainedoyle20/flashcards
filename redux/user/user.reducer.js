import userActionTypes from './user.types';

const INITIAL_STATE = {
    currentUserId: null,
    currentUser: null,
}

const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER_ID:
            return {
                ...state,
                currentUserId: action.payload,
            }
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default: 
            return state;
    }
}

export default userReducer;

import userActionTypes from './user.types';

export const setCurrentUser = (currentUser) => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: currentUser,
});

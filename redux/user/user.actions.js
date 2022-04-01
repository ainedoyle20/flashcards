import userActionTypes from './user.types';

export const setCurrentUserId = (currentUserId) => ({
    type: userActionTypes.SET_CURRENT_USER_ID,
    payload: currentUserId,
});

export const setCurrentUser = (currentUser) => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: currentUser,
});

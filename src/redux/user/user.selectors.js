import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  // returns selectUser as key of userReducer return object
  [selectUser],
  // updates user 
  user => user.currentUser
);
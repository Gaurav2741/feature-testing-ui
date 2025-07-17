// userActions.js
export const addUser = (userData) => ({
  type: 'ADD_USER',
  payload: userData,
});

export const editUser = (userId, userData) => ({
  type: 'EDIT_USER',
  payload: { userId, userData },
});

export const deleteUser = (userId) => ({
  type: 'DELETE_USER',
  payload: userId,
});


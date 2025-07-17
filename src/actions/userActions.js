// userActions.js
let nextId = 1; // Since we already have one user with id 1

export const addUser = (userData) => ({
  type: "ADD_USER",
  payload: { ...userData, id: String(nextId++) },
});

export const editUser = (userId, userData) => ({
  type: "EDIT_USER",
  payload: { userId, userData },
});

export const deleteUser = (userId) => ({
  type: "DELETE_USER",
  payload: userId,
});

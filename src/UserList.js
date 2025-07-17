// UserList.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../actions/userActions';
import { Link } from 'react-router-dom';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <h2>User List</h2>
      <Link to="/add">Add New User</Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}{user.phone}  - {user.email} 
            <button onClick={() => handleDelete(user.id)}>Delete</button>
            <Link to={`/edit/${user.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;


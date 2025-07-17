// UserList.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../actions/userActions";
import { Link } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>User List</h2>
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <Link
          to="/add"
          style={{
            textDecoration: "none",
            background: "#007bff",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "4px",
          }}
        >
          Add New User
        </Link>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user) => (
          <li
            key={user.id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              {user.firstName} {user.lastName} - {user.email}
            </span>
            <div>
              <button
                onClick={() => handleDelete(user.id)}
                style={{
                  marginRight: "10px",
                  background: "#dc3545",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
              <Link
                to={`/edit/${user.id}`}
                style={{
                  textDecoration: "none",
                  background: "#28a745",
                  color: "#fff",
                  padding: "6px 10px",
                  borderRadius: "4px",
                }}
              >
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

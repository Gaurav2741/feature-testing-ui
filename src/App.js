// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

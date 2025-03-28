import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegistration from "./components/UserRegistration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<UserRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;

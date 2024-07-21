import React from "react";
import SignUpForm from "./components/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/SignIn";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Create from "./components/Create";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<SignUpForm />} /> */}
          <Route path="/" element={<Signin />} />
          <Route path="/getEmployeeData" element={<Dashboard />} />
          <Route path="/create" element={<Create />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

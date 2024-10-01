import React from "react";
import SignUpForm from "./pages/SignUp/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Signin from "./pages/SignIn/SignIn";
import Dashboard from "./pages/Dashboard/Dashboard"; // Import the new layout
import Leave from "./components/Leave/Leave";
import Employee from "./components/Employees/Employee";
import "./App.css";
import EmployerProfilePage from "./components/Profile/Profile";

function App() {
  return (
    <div className="App">
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={3000}
      ></SnackbarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/getEmployeeData" element={<Dashboard />}>
            <Route path="leave" element={<Leave />} />
            <Route path="employees" element={<Employee />} />
            <Route path="profile" element={<EmployerProfilePage />} />
          </Route>
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

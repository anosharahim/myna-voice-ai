// import logo from "./logo.svg";
import "./App.css";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  const checkAuthentication = () => {
    fetch("/check-is-authenticated/", {
      method: "GET",
      credentials: "include", // This here
    })
      .then((response) => {
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    checkAuthentication(); // Check authentication status on component mount
  }, []);

  const handleLogOut = () => {
    setIsAuthenticated(false);
    checkAuthentication();
    window.location.reload(false);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={!isAuthenticated ? <LandingPage /> : <HomePage />}
          />
          <Route
            path="/signup"
            element={<SignUpForm onAuthentication={handleAuthentication} />}
          />
          <Route
            path="/login"
            element={<SignInForm onAuthentication={handleAuthentication} />}
          />
          <Route
            path="/home"
            element={<HomePage onAuthentication={handleAuthentication} />}
          />
          <Route
            path="/landing"
            element={<LandingPage onAuthentication={handleAuthentication} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

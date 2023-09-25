// import logo from "./logo.svg";
import "./App.css";
import InputForm from "./components/InputForm";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleGoToSignUp = () => {
    // go to sign-up page
    setIsSignUp(true);
  };
  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };
  const handleLogOut = () => {
    setIsAuthenticated(false);
    checkAuthentication();
    window.location.reload(false);
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

  return (
    <div className="App">
      <div className="App">
        {isAuthenticated ? (
          <InputForm onLogOut={handleLogOut} />
        ) : isSignUp ? (
          <SignUpForm onAuthentication={handleAuthentication} />
        ) : (
          <>
            <SignInForm onAuthentication={handleAuthentication} />
            <button onClick={handleGoToSignUp} className="btn" type="submit">
              {" "}
              Create Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

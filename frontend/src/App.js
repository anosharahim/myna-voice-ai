import logo from "./logo.svg";
import "./App.css";
import InputForm from "./components/InputForm";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAccountCreation = () => {
    // go to sign-up page
    setIsSignUp(true);
  };
  // Function to handle successful sign-in or sign-up
  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      <div className="App">
        {isAuthenticated ? (
          <InputForm />
        ) : isSignUp ? (
          <SignUpForm onAuthentication={handleAuthentication} />
        ) : (
          <>
            <SignInForm onAuthentication={handleAuthentication} />
            <button
              onClick={handleAccountCreation}
              className="btn"
              type="submit"
            >
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

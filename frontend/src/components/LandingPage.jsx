import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    console.log("Redirect to SignUp");
    navigate("/signup");
  };

  return (
    <div>
      <Header />
      <div className="landing-page-container">
        <div className="landing-page-tagline">
          Transform any blog into a podcast that you can talk to.
        </div>
        <button onClick={handleGetStarted}>Get Started</button>
      </div>
    </div>
  );
};

export default LandingPage;

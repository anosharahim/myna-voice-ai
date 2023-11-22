import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    console.log("Redirect to SignUp");
    navigate("/signup");
  };

  return (
    <div>
      <div>
        <p>Transform any blog into a podcast that you can talk to.</p>
        <button onClick={handleGetStarted}>Get Started</button>
      </div>
    </div>
  );
};

export default LandingPage;

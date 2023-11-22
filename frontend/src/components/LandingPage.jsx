import React from "react";

const LandingPage = () => {
  const handleGetStarted = () => {
    console.log("Redirect to SignUp");
    // You can implement the navigation logic here
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

import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({redirectToLandingPage}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (redirectToLandingPage) {
      navigate("/"); 
    } else {
      console.log("Clicked on Beak, but not redirecting to the landing page");
    }
  };

  return (
    <header className="site-header">
      <div className="site-name" style={{ cursor: "pointer" }} onClick={handleClick}>Beak</div>
    </header>
  );
};

export default Header;

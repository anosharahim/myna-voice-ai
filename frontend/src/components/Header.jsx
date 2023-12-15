import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Header = ({redirectToLandingPage, onHomePage}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (redirectToLandingPage) {
      navigate("/"); 
    } else {
      console.log("Clicked on Beak, but not redirecting to the landing page");
    }
  };
  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/logout/");
      // TODO check response status
      navigate("/landing");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="site-header">
      <div className="site-name" style={{ cursor: "pointer" }} onClick={handleClick}>Beak</div>
      {onHomePage && (
        <button onClick={handleLogOut}className="logout-button">
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;

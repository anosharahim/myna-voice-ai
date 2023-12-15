import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Header from "./Header";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/signup/", {
        name,
        password,
      });
      setResponse(`/${response.data}`);
      setSubmitted(true);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setResponse("Error occurred while creating your account.");
    }
  };

  return (
    <div>
      <Header redirectToLandingPage={true}/>
      <div className="sign-container">
        <div className="sign-form">
          <div className="sign-title">Sign Up</div>
          <form>
            {/* Labels and inputs for form data */}
            <div classname="sign-input-field">
              <label className="label">Username</label>
              <input
                onChange={handleName}
                className="sign-input"
                value={name}
                type="text"
              />
            </div>
            <div className="sign-input-field">
              <label className="label">Create Password</label>
              <input
                onChange={handlePassword}
                className="sign-input"
                value={password}
                type="password"
              />
            </div>

            <button onClick={handleSubmit} className="sign-button">
              Create Account
            </button>

            <p className="login-link-text">
              Already have an account? <a href="/login">Log in here</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

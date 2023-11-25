import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function SignInForm({ onAuthentication }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "login/",
        {
          name,
          password,
        },
        { withCredentials: true }
      );
      // TODO check response status
      onAuthentication();
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="sign-container">
      <div className="sign-form">
        <div className="sign-title">Welcome Back</div>
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
            <label className="label">Password</label>
            <input
              onChange={handlePassword}
              className="sign-input"
              value={password}
              type="password"
            />
          </div>

          <button onClick={handleSubmit} className="sign-button">
            Login
          </button>

          <p className="login-link-text">
            Don't have an account? <a href="/signup">Sign up here</a>.
          </p>
        </form>
      </div>
    </div>
  );
}

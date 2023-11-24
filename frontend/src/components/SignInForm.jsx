import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function SignUpForm({ onAuthentication }) {
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
    <div className="signup-container">
      <div className="form">
        <div className="signup-title">Welcome Back</div>
        <form>
          {/* Labels and inputs for form data */}
          <div classname="input-field">
            <label className="label">Username</label>
            <input
              onChange={handleName}
              className="input"
              value={name}
              type="text"
            />
          </div>
          <div className="input-field">
            <label className="label">Password</label>
            <input
              onChange={handlePassword}
              className="input"
              value={password}
              type="password"
            />
          </div>

          <button onClick={handleSubmit} className="signup-button">
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

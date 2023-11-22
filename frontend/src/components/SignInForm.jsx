import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function SignUpForm({ onAuthentication }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

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
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="form">
      <div>
        <h1>Welcome Back</h1>
      </div>
      <form>
        {/* Labels and inputs for form data */}
        <label className="label">Name</label>
        <input
          onChange={handleName}
          className="input"
          value={name}
          type="text"
        />

        <label className="label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
        />

        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>

        <p className="signup-link-text">
          Don't have an account? <a href="/signup">Sign up here.</a>.
        </p>
      </form>
    </div>
  );
}

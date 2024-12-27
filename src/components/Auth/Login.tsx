import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../state/slices/userSlice";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate an API call
    dispatch(login({ id: "1", name: "John Doe" })); // Replace with real user data
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <img src="media/graphics/svg/logo.svg" alt="Logo" className="nav-logo" />
        <h4>Nursing Home Management Platform</h4>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="mainButton login">
            <h4>Login</h4>
          </button>
          <p className="signupLink">
            Don't have an account? <a href="/signup">Signup</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

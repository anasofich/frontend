import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../state/slices/userSlice";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      console.log("API Response:", data); // Log entire API response
      console.log("User object in response:", data.user); // Log user object

      if (response.ok) {
        console.log("Login successful:", data);
        dispatch(login({ _id: data.user._id, fullName: data.user.fullName, username: data.user.username, email: data.user.email, role: data.user.role, photo: data.user.photo, password: data.user.password, phoneNumber: data.user.phoneNumber }));
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <img src="media/graphics/svg/logo.svg" alt="Logo" className="nav-logo" />
        <h4>Nursing Home Management Platform</h4>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input required type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
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

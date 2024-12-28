import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../state/slices/userSlice";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      console.log("API Response:", data); // Log entire API response
      console.log("Local Storage after login:", localStorage.getItem("user"));
      console.log("User object in response:", data.user); // Log user object

      if (response.ok) {
        console.log("Login successful:", data);
        dispatch(
          login({
            _id: data.user._id,
            fullName: data.user.fullName,
            username: data.user.username,
            email: data.user.email,
            role: data.user.role,
            photo: data.user.photo,
            password: data.user.password,
            phoneNumber: data.user.phoneNumber,
            activities: data.user.activities,
          })
        );
        navigate("/");
      } else {
        console.error("Login failed:", data.message);
        setError(data.message || "Invalid username or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <img src="media/graphics/svg/logo.svg" alt="Logo" className="nav-logo" />
        <h4>Nursing Home Management Platform</h4>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          {error && <div className="error-message">{error}</div>}
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

import React, { useState } from "react";
const Signup: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, email, phoneNumber, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Signup successful:", data);
      } else {
        console.error("Signup failed:", data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <img src="media/graphics/svg/logo.svg" alt="Logo" className="nav-logo" />
        <h4>Nursing Home Management Platform</h4>
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
          <div className="formGroup">
            <input required type="text" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <input required type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="formGroup">
            <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input required type="tel" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>

          <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <select required value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select role</option>
            <option value="staff">Staff</option>
            <option value="resident">Resident</option>
            <option value="family_member">Family member</option>
          </select>
          <button type="submit" className="mainButton">
            Signup
          </button>
          <p className="signupLink">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

import React from "react";
import { logout, selectUser } from "../state/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  console.log("User:", currentUser);

  const formatRole = (role: string | undefined | null): string => {
    if (!role) return "No Role Assigned";
    const formattedRole = role
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return formattedRole;
  };

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
    // Optionally navigate to the login page
    navigate("/login");
  };

  return (
    <div className="profileTabContent">
      <h1>Profile</h1>
      <div className="profileInfo">
        <div className="profilePhoto">
          <img src={currentUser.photo || ""} alt="pp" />
        </div>
        <h3>{currentUser.fullName}</h3>
        <h4>{formatRole(currentUser?.role)}</h4>
        <button className="rectangularButton logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

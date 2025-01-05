import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { openNotificationsModal, openChatModal } from "../../state/slices/modalSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { selectUser } from "../../state/slices/userSlice";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState<string>(useLocation().pathname);
  const isNotificationsOpen = useSelector((state: RootState) => state.modal.isNotificationsOpen);
  const isChatOpen = useSelector((state: RootState) => state.modal.isChatOpen);
  const user = useSelector(selectUser);

  const handleNavClick = (path: string) => {
    setActiveLink(path);
  };

  console.log("Notifications Open:", isNotificationsOpen);
  console.log("Chat Open:", isChatOpen);

  const formatRole = (role: string | undefined | null): string => {
    if (!role) return "No Role Assigned";
    const formattedRole = role
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return formattedRole;
  };

  return (
    <nav className="navbar">
      <div className="nav-items">
        <div className="left">
          <img src="media/graphics/svg/logo.svg" alt="Logo" className="nav-logo" />
          <div className="pagesButtons">
            <Link to="/" className={`nav-button overview ${activeLink === "/" ? "active" : ""}`} onClick={() => handleNavClick("/")}>
              <div className="nav-icon"></div>
              Overview
            </Link>
            <Link to="/calendar" className={`nav-button calendar ${activeLink === "/calendar" ? "active" : ""}`} onClick={() => handleNavClick("/calendar")}>
              <div className="nav-icon"></div>
              Calendar
            </Link>
            <Link to="/community" className={`nav-button community ${activeLink === "/community" ? "active" : ""}`} onClick={() => handleNavClick("/community")}>
              <div className="nav-icon"></div>
              Community
            </Link>
            <Link to="/profile" className={`nav-button profile ${activeLink === "/profile" ? "active" : ""}`} onClick={() => handleNavClick("/profile")}>
              <div className="nav-icon"></div>
              Profile
            </Link>
            <Link to="/settings" className={`nav-button settings ${activeLink === "/settings" ? "active" : ""}`} onClick={() => handleNavClick("/settings")}>
              <div className="nav-icon"></div>
              Settings
            </Link>
          </div>
        </div>
        <div className="right">
          <button
            onClick={() => {
              console.log("Opening Notifications Modal");
              dispatch(openNotificationsModal());
            }}
            className="nav-button notifications"
          >
            <div className="nav-icon"></div>
          </button>
          <button
            onClick={() => {
              console.log("Opening Chat Modal");
              dispatch(openChatModal());
            }}
            className="nav-button chat"
          >
            <div className="nav-icon"></div>
          </button>
          <Link to="/profile" className="userInfoLink" onClick={() => handleNavClick("/profile")}>
            <div className="userInfo">
              <div className="userImage">
                <img src={user.currentUser?.photo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="User"></img>
              </div>
              <div className="userDetails">
                <p className="name">{user.currentUser?.fullName}</p>
                <p className="role">{formatRole(user.currentUser?.role)}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

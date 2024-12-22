import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { openNotificationsModal, openChatModal } from "../../store";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const isNotificationsOpen = useSelector((state: RootState) => state.modal.isNotificationsOpen);
  const isChatOpen = useSelector((state: RootState) => state.modal.isChatOpen);

  console.log("Notifications Open:", isNotificationsOpen);
  console.log("Chat Open:", isChatOpen);

  return (
    <nav className="navbar">
      <div className="nav-items">
        <div className="left">
          <img src="media/graphics/svg/logo.svg" alt="Logo" className="nav-logo" />
          <div className="pagesButtons">
            <Link to="/" className="nav-button overview active">
              <div className="nav-icon"></div>
              Overview
            </Link>
            <Link to="/calendar" className="nav-button calendar">
              <div className="nav-icon"></div>
              Calendar
            </Link>
            <Link to="/community" className="nav-button community">
              <div className="nav-icon"></div>
              Community
            </Link>
            <Link to="/profile" className="nav-button profile">
              <div className="nav-icon"></div>
              Profile
            </Link>
            <Link to="/settings" className="nav-button settings">
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
          <div className="userInfo">
            <div className="userImage">
              <img src="./media/images/png/maria-pp.png" alt="User"></img>
            </div>
            <div className="userDetails">
              <p className="name">Maria Alba</p>
              <p className="role">Resident</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "../components/Navigation/NavBar";
import Overview from "../pages/Overview";
import Calendar from "../pages/Calendar";
import Community from "../pages/Community";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { closeNotificationsModal, closeChatModal } from "../state/slices/modalSlice";
import NotificationsModal from "../components/Navigation/NotificationsModal";
import ChatModal from "../components/Navigation/ChatModal";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";

const MainRoutes: React.FC = () => {
  const dispatch = useDispatch();
  const isNotificationsOpen = useSelector((state: RootState) => state.modal.isNotificationsOpen);
  const isChatOpen = useSelector((state: RootState) => state.modal.isChatOpen);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>

          {/* Render Modals conditionally based on Redux state */}
          {isNotificationsOpen && <NotificationsModal onClose={() => dispatch(closeNotificationsModal())} />}
          {isChatOpen && <ChatModal onClose={() => dispatch(closeChatModal())} />}
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default MainRoutes;

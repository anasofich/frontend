import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "../pages/Overview";
import Calendar from "../pages/Calendar";
import Community from "../pages/Community";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import NotificationsModal from "../components/Navigation/NotificationsModal";
import ChatModal from "../components/Navigation/ChatModal";

const MainRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      {/* Modals for Notifications and Chat */}
      <NotificationsModal />
      <ChatModal />
    </Router>
  );
};

export default MainRoutes;

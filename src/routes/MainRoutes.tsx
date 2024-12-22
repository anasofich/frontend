import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../components/Navigation/NavBar";
import Overview from "../pages/Overview";
import Calendar from "../pages/Calendar";
import Community from "../pages/Community";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { closeNotificationsModal, closeChatModal } from "../store";
import NotificationsModal from "../components/Navigation/NotificationsModal";
import ChatModal from "../components/Navigation/ChatModal";

const MainRoutes: React.FC = () => {
  const dispatch = useDispatch();
  const isNotificationsOpen = useSelector((state: RootState) => state.modal.isNotificationsOpen);
  const isChatOpen = useSelector((state: RootState) => state.modal.isChatOpen);

  return (
    <Router>
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
    </Router>
  );
};

export default MainRoutes;

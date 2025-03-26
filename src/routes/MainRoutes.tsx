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
import PrivateRoute from "./PrivateRoute";
import OverviewStaff from "../pages/OverviewStaff";

const MainRoutes: React.FC = () => {
  const dispatch = useDispatch();
  const isNotificationsOpen = useSelector((state: RootState) => state.modal.isNotificationsOpen);
  const isChatOpen = useSelector((state: RootState) => state.modal.isChatOpen);
  //const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const user = useSelector((state: RootState) => state.user);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              {user.role === "resident" ? (
                <>
                  <NavBar />
                  <Overview />
                </>
              ) : user.role === "staff" ? (
                <>
                  <NavBar />
                  <OverviewStaff />
                </>
              ) : user.role === "family_member" ? (
                <>
                  <NavBar />
                  <div>Family Member Interface</div> {/* Replace with your family member components */}
                </>
              ) : (
                <Navigate to="/login" />
              )}
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              {user.role === "resident" ? (
                <>
                  <NavBar />
                  <Calendar />
                </>
              ) : user.role === "staff" ? (
                <>
                  <NavBar />
                  <Calendar />
                </>
              ) : user.role === "family" ? (
                <>
                  <NavBar />
                  <div>Family Member Interface</div> {/* Replace with your family member components */}
                </>
              ) : (
                <Navigate to="/login" />
              )}
            </PrivateRoute>
          }
        />
        <Route
          path="/community"
          element={
            <PrivateRoute>
              {user.role === "resident" ? (
                <>
                  <NavBar />
                  <Community />
                </>
              ) : user.role === "staff" ? (
                <>
                  <NavBar />
                  <Community />
                </>
              ) : user.role === "family" ? (
                <>
                  <NavBar />
                  <div>Family Member Interface</div> {/* Replace with your family member components */}
                </>
              ) : (
                <Navigate to="/login" />
              )}
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              {user.role === "resident" ? (
                <>
                  <NavBar />
                  <Profile />
                </>
              ) : user.role === "staff" ? (
                <>
                  <NavBar />
                  <Profile />
                </>
              ) : user.role === "family" ? (
                <>
                  <NavBar />
                  <div>Family Member Interface</div> {/* Replace with your family member components */}
                </>
              ) : (
                <Navigate to="/login" />
              )}
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              {user.role === "resident" ? (
                <>
                  <NavBar />
                  <Settings />
                </>
              ) : user.role === "staff" ? (
                <>
                  <NavBar />
                  <Settings />
                </>
              ) : user.role === "family" ? (
                <>
                  <NavBar />
                  <div>Family Member Interface</div> {/* Replace with your family member components */}
                </>
              ) : (
                <Navigate to="/login" />
              )}
            </PrivateRoute>
          }
        />
        {/* Redirect any other route to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {/* Render Modals conditionally */}
      {isNotificationsOpen && <NotificationsModal onClose={() => dispatch(closeNotificationsModal())} />}
      {isChatOpen && <ChatModal onClose={() => dispatch(closeChatModal())} />}
    </Router>
  );
};

export default MainRoutes;

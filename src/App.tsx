import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreUser } from "./state/slices/userSlice";
import MainRoutes from "./routes/MainRoutes";
import "./styles/global.css";
import "./styles/overviewTab/navBar.css";
import "./styles/overviewTab/modal.css";
import "./styles/overviewTab/overview.css";
import "./styles/overviewTab/activitiesModal.css";
import "./styles/calendarTab/calendar.css";
import "./styles/calendarTab/addActivityModal.css";
import "./styles/auth/auth.css";
import "./styles/profileTab/profile.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Restore user from localStorage
    const storedUser = localStorage.getItem("user");
    console.log("Stored User:", storedUser);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Parsed user object:", parsedUser); // Log the parsed user
      dispatch(restoreUser(parsedUser));
    }
  }, [dispatch]);
  return <MainRoutes />;
}

export default App;

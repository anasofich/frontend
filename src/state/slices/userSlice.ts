import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
/* import { fetchUser } from "../../services/api";
 */
interface UserState {
  currentUser: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  _id: string;
  fullName: string;
  role: string;
  photo: string;
}

interface User {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  activities?: string[];
  photo: string;
  password: string;
}

const initialState: UserState = {
  currentUser: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: true, //toggle for testing
  _id: "676a5112c2fadf3c1e98793c",
  fullName: "Maria Alba", // Replace with dynamic value from your authentication logic
  role: "Resident", // Replace with dynamic value
  photo: "https://images.unsplash.com/photo-1556889882-73ea40694a98?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.isAuthenticated = true;
      state.currentUser = {
        _id: action.payload.id,
        username: action.payload.name,
        fullName: action.payload.name, // Assuming name is the full name
        email: "", // Default or fetched from API
        phoneNumber: "", // Default or fetched from API
        role: "User", // Default role
        activities: [], // Default empty array
        photo: "", // Default or fetched from API
        password: "", // Default or fetched from API
      };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

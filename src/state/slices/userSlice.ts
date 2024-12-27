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
  _id: string | null;
  fullName: string | null;
  role: string | null;
  email: string | null;
  photo: string | null;
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
  isAuthenticated: false, //toggle for testing
  _id: null,
  fullName: null,
  role: null,
  email: null,
  photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      console.log("Login successful:", action.payload); // Log login payload
      console.log("State before login:", state); // Log state before login
      state.isAuthenticated = true;
      state.currentUser = action.payload; // Update entire user object from API response
      console.log("State after login:", state); // Log state after login
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

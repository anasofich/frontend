import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PersistPartial {
  [key: string]: any;
}

interface UserState {
  currentUser: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  _id: string | null;
  username: string | null;
  fullName: string | null;
  phoneNumber: string | null;
  role: string | null;
  email: string | null;
  photo: string | null;
  activities?: string[];
  password: string | null;
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

const initialState: UserState & PersistPartial = {
  currentUser: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false, //toggle for testing
  _id: null,
  username: null,
  fullName: null,
  role: null,
  email: null,
  photo: null,
  activities: [],
  password: null,
  phoneNumber: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User & PersistPartial>) => {
      console.log("Login successful:", action.payload); // Log login payload
      console.log("State before login:", state); // Log state before login
      const { _id, username, fullName, email, phoneNumber, role, activities, photo, password } = action.payload;
      state.isAuthenticated = true;
      state.currentUser = action.payload; // Update entire user object from API response
      state._id = _id;
      state.username = username;
      state.fullName = fullName;
      state.email = email;
      state.phoneNumber = phoneNumber;
      state.role = role;
      state.photo = photo;
      state.password = password;
      state.activities = activities;
      console.log("State after login:", state); // Log state after login
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      localStorage.removeItem("user");
    },
    restoreUser: (state, action: PayloadAction<User | null>) => {
      console.log("RestoreUser payload:", action.payload);
      if (action.payload) {
        state.isAuthenticated = true;
        state.currentUser = action.payload;
        const { _id, username, fullName, email, phoneNumber, role, activities, photo, password } = action.payload;
        state._id = _id;
        state.username = username;
        state.fullName = fullName;
        state.email = email;
        state.phoneNumber = phoneNumber;
        state.role = role;
        state.photo = photo;
        state.password = password;
        state.activities = activities;
        console.log("State after restoreUser:", state);
      }
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { login, logout, restoreUser } = userSlice.actions;

export default userSlice.reducer;

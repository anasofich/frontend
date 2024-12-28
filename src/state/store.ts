import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import modalReducer from "./slices/modalSlice";
import userReducer from "./slices/userSlice";

export interface PersistPartial {
  [key: string]: any; // Generic interface to cover dynamic keys for persisted state
}

export interface UserState {
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

export interface User {
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

const persistConfig = {
  key: "root",
  storage,
};

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: persistReducer<UserState>(persistConfig, userReducer),
    // other reducers go here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

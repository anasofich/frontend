import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isNotificationsOpen: false,
    isChatOpen: false,
  },
  reducers: {
    openNotificationsModal: (state) => {
      state.isNotificationsOpen = true;
    },
    closeNotificationsModal: (state) => {
      state.isNotificationsOpen = false;
    },
    openChatModal: (state) => {
      state.isChatOpen = true;
    },
    closeChatModal: (state) => {
      state.isChatOpen = false;
    },
  },
});

export const { openNotificationsModal, closeNotificationsModal, openChatModal, closeChatModal } = modalSlice.actions;

export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    // other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

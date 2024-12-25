import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isNotificationsOpen: boolean;
  isChatOpen: boolean;
}

const initialState: ModalState = {
  isNotificationsOpen: false,
  isChatOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
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
export default modalSlice.reducer;

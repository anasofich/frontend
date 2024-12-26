import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  _id: string;
  fullName: string;
  role: string;
  photo: string;
}

const initialState: UserState = {
  _id: "676a5112c2fadf3c1e98793c",
  fullName: "Maria Alba", // Replace with dynamic value from your authentication logic
  role: "Resident", // Replace with dynamic value
  photo: "https://raw.githubusercontent.com/anasofich/frontend/refs/heads/main/public/media/images/png/maria-pp.png?token=GHSAT0AAAAAAC4G3BMT2LYQKCTOFJ4ZXHH2Z3M5V7Q",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

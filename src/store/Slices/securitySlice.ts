import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SecState {
  name: string;
  email: string;
  avatar: string;
  token: string;
  _id: string;
}

const initialState: SecState = {
  name: "",
  email: "",
  avatar: "",
  token: "",
  _id: "",
};

export const securitySlice = createSlice({
  name: "sec",
  initialState,
  reducers: {
   setSecData: (state, action: PayloadAction<SecState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.token = action.payload.token;
      state._id = action.payload._id;
   },
   resetSecData: (state) => {
      state.name = "";
      state.email = "";
      state.avatar = "";
      state.token = "";
      state._id = "";
   }
  },
});

export const { setSecData, resetSecData } = securitySlice.actions;
export const selectAuth = (state: RootState) => state.sec;
export default securitySlice.reducer;
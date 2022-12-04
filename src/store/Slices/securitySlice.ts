import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface SecState {
  name: string;
  email: string;
  avatar: string;
  token: string;
  rol: string;
  _id: string;
  _pin?: number;
  _newPassword?: string;
  oldPasswords?: string;
}

const initialState: SecState = {
  name: "",
  email: "",
  avatar: "",
  token: "",
  rol: "",
  _id: "",
  _pin: 0,
  _newPassword: "",
  oldPasswords: "",
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
      state.rol = action.payload.rol;
      state._id = action.payload._id;
      state._pin = action.payload._pin;
      state._newPassword = action.payload._newPassword;
      state.oldPasswords = action.payload.oldPasswords;
    },
    resetSecData: (state) => {
      state.name = "";
      state.email = "";
      state.avatar = "";
      state.token = "";
      state.rol = "";
      state._id = "";
      state._pin = 0;
      state._newPassword = "";
      state.oldPasswords = "";
    },
  },
});

export const { setSecData, resetSecData } = securitySlice.actions;
export const selectAuth = (state: RootState) => state.sec;
export default securitySlice.reducer;
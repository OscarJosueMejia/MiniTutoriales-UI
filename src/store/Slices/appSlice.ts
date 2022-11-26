import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AppState {
  appLoaded: boolean;
  showMenu: boolean;
}

const initialState: AppState = {
  appLoaded: false,
  showMenu: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppLoaded: (state, action: PayloadAction<boolean>) => {
      state.appLoaded = action.payload;
    },
    setShowMenu: (state, action: PayloadAction<boolean>) => {
      state.showMenu = action.payload;
    }
  }
});

export const { setAppLoaded, setShowMenu } = appSlice.actions;
export const selectAppLoaded = (state: RootState) => state.app.appLoaded;
export const selectShowMenu = (state: RootState) => state.app.showMenu;
export default appSlice.reducer;
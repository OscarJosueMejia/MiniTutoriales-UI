import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { FeedData } from './feedSlice';

interface currentUserSwitch {
  currentUser:string;
}

const initialState: FeedData & currentUserSwitch = {
  items: [],
  itemsPerPage:0,
  page:0,
  total:0,
  totalPages:0,
  currentUser:""
}

export const commUserSlice = createSlice({
  name: 'commUser',
  initialState,
  reducers: {
    setCommUserItems: (state, action: PayloadAction<FeedData & currentUserSwitch>) => {
      state.items = action.payload.items;
      state.itemsPerPage = action.payload.itemsPerPage;
      state.page = action.payload.page;
      state.total = action.payload.total;
      state.totalPages = action.payload.totalPages;
      state.currentUser = action.payload.currentUser;
    }
  }
});

export const { setCommUserItems } = commUserSlice.actions;
export const selectCommUserItems = (state: RootState) => state.commUser.items;
export const selectCommUserData = (state: RootState) => state.commUser;
export default commUserSlice.reducer;
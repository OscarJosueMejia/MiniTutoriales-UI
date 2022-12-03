import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { FeedData } from './feedSlice';

interface currentModeSwitch {
  currentMode:"LIKED"|"LIST";
}

const initialState: FeedData & currentModeSwitch = {
  items: [],
  itemsPerPage:0,
  page:0,
  total:0,
  totalPages:0,
  currentMode:"LIST"
}

export const userFeedSlice = createSlice({
  name: 'userFeed',
  initialState,
  reducers: {
    setUserFeedItems: (state, action: PayloadAction<FeedData & currentModeSwitch>) => {
      state.items = action.payload.items;
      state.itemsPerPage = action.payload.itemsPerPage;
      state.page = action.payload.page;
      state.total = action.payload.total;
      state.totalPages = action.payload.totalPages;
      state.currentMode = action.payload.currentMode;
    }
  }
});

export const { setUserFeedItems } = userFeedSlice.actions;
export const selectUserFeedItems = (state: RootState) => state.userFeed.items;
export const selectUserFeedDetails = (state: RootState) => state.userFeed;
export default userFeedSlice.reducer;
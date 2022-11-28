import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { FeedData } from './feedSlice';

const initialState: FeedData = {
  items: [],
  itemsPerPage:0,
  page:0,
  total:0,
  totalPages:0
}

export const userFeedSlice = createSlice({
  name: 'userFeed',
  initialState,
  reducers: {
    setUserFeedItems: (state, action: PayloadAction<FeedData>) => {
      state.items = action.payload.items;
      state.itemsPerPage = action.payload.itemsPerPage;
      state.page = action.payload.page;
      state.total = action.payload.total;
      state.totalPages = action.payload.totalPages;
    }
  }
});

export const { setUserFeedItems } = userFeedSlice.actions;
export const selectUserFeedItems = (state: RootState) => state.userFeed.items;
export const selectUserFeedDetails = (state: RootState) => state.userFeed;
export default userFeedSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { FeedData } from './feedSlice';

const initialState: Partial<FeedData> = {
  items: [],
  // itemsPerPage:0,
  // page:0,
  // total:0,
  // totalPages:0
}

export const searchFeedSlice = createSlice({
  name: 'searchFeed',
  initialState,
  reducers: {
    setSearchFeedItems: (state, action: PayloadAction<Partial<FeedData>>) => {
      state.items = action.payload.items;
    }
  }
});

export const { setSearchFeedItems } = searchFeedSlice.actions;
export const selectSearchFeedItems = (state: RootState) => state.searchFeed.items;
export const selectSearchFeedDetails = (state: RootState) => state.searchFeed;
export default searchFeedSlice.reducer;
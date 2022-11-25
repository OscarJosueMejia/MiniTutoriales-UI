import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FeedItem {
  authorId: unknown;
  createdAt: string;
  description:string;
  reactionsCount:unknown;
  requirements:string;
  steps:unknown;
  tags:unknown;
  title:string;
  _id:unknown;
}

interface FeedData {
    items:Array<FeedItem>;
    itemsPerPage:number;
    page:number;
    total:number;
    totalPages:number;
}

const initialState: FeedData = {
  items: [],
  itemsPerPage:0,
  page:0,
  total:0,
  totalPages:0
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeedItems: (state, action: PayloadAction<FeedData>) => {
      state.items = action.payload.items;
      state.itemsPerPage = action.payload.itemsPerPage;
      state.page = action.payload.page;
      state.total = action.payload.total;
      state.totalPages = action.payload.totalPages;
    }
  }
});

export const { setFeedItems } = feedSlice.actions;
export const selectFeedItems = (state: RootState) => state.feed.items;
export default feedSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IStep } from '@components/Steps/StepContainer';

export interface IFeedItem {
  authorId: unknown;
  createdAt: string;
  description:string;
  reactionsCount:{reaction_IsUtil:Array<string>,reaction_Dislike:Array<string>};
  requirements:string;
  steps:Array<IStep>;
  tags:unknown;
  title:string;
  userLiked?:boolean;
  userDisliked?:boolean;
  author_info:Array<{_id:unknown, name:string, username:string}>
  _id:unknown;
}

export interface FeedData {
    items:Array<IFeedItem>;
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
export const selectFeedDetails = (state: RootState) => state.feed;
export default feedSlice.reducer;
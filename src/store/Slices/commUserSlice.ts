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

export const commUserSlice = createSlice({
  name: 'commUser',
  initialState,
  reducers: {
    setCommUserItems: (state, action: PayloadAction<FeedData>) => {
      state.items = action.payload.items;
      state.itemsPerPage = action.payload.itemsPerPage;
      state.page = action.payload.page;
      state.total = action.payload.total;
      state.totalPages = action.payload.totalPages;
    }
  }
});

export const { setCommUserItems } = commUserSlice.actions;
export const selectCommUserItems = (state: RootState) => state.commUser.items;
export const selectCommUserData = (state: RootState) => state.commUser;
export default commUserSlice.reducer;
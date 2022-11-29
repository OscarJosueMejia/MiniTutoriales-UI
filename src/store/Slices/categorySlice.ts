import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ICategories{
    title: string;
    description: string;
    status: 'ACT' | 'INA';
    _id?: unknown;
}

export interface ICategoriesData{
    items: Array<ICategories>
}

const initialState: ICategoriesData = {
    items: []
}

export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
     setCategoryData: (state, action: PayloadAction<ICategoriesData>) => {
        state.items = action.payload.items;
     },
    //  resetCategoryData: (state) => {
    //     state.title = "";
    //     state.description = "";
    //     state.status = "ACT";
    //     state._id = "";
    //  }
    },
  });

  export const { setCategoryData } = categorySlice.actions;
  export const selectCategory = (state: RootState) => state.categories;
  export default categorySlice.reducer;
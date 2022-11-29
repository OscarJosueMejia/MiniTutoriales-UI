import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { appSlice } from './Slices/appSlice';
import { securitySlice } from './Slices/securitySlice';
import { feedSlice } from './Slices/feedSlice';
import { securityApi } from './Services/Security';
import { feedApi } from './Services/Feed';
import {categorySlice} from './Slices/categorySlice';
import { categoryApi } from './Services/Category';


export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    sec: securitySlice.reducer,
    categories: categorySlice.reducer,
    feed: feedSlice.reducer,
    [securityApi.reducerPath]: securityApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat([securityApi.middleware, feedApi.middleware, categoryApi.middleware])
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
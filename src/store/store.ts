import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
//Slices
import { appSlice } from './Slices/appSlice';
import { securitySlice } from './Slices/securitySlice';
import { feedSlice } from './Slices/feedSlice';
import { searchFeedSlice } from './Slices/searchFeed';
import { userFeedSlice } from './Slices/userFeedSlice';
import { commUserSlice } from './Slices/commUserSlice';
import {categorySlice} from './Slices/categorySlice';
//Services
import { securityApi } from './Services/Security';
import { feedApi } from './Services/Feed';
import { categoryApi } from './Services/Category';

import { creatorApi } from './Services/Creator';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    sec: securitySlice.reducer,
    categories: categorySlice.reducer,
    feed: feedSlice.reducer,
    userFeed: userFeedSlice.reducer,
    searchFeed: searchFeedSlice.reducer,
    commUser: commUserSlice.reducer,
    [securityApi.reducerPath]: securityApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [creatorApi.reducerPath]: creatorApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat([securityApi.middleware, feedApi.middleware, categoryApi.middleware, creatorApi.middleware])
  },
);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
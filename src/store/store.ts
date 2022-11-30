import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { appSlice } from "./Slices/appSlice";
import { securitySlice } from "./Slices/securitySlice";
import { feedSlice } from "./Slices/feedSlice";
import { securityApi } from "./Services/Security";
import { feedApi } from "./Services/Feed";

const preLoadedState = JSON.parse(localStorage.getItem("reduxState") || "{}");

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    sec: securitySlice.reducer,
    feed: feedSlice.reducer,
    [securityApi.reducerPath]: securityApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([securityApi.middleware, feedApi.middleware]),
  preloadedState: preLoadedState,
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

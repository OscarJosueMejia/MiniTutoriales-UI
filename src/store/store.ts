//Slices
import { appSlice } from "./Slices/appSlice";
import { securitySlice } from "./Slices/securitySlice";
import { feedSlice } from "./Slices/feedSlice";
import { categorySlice } from "./Slices/categorySlice";
//Services
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { securityApi } from "./Services/Security";
import { feedApi } from "./Services/Feed";
import { categoryApi } from "./Services/Category";

//Services
import CryptoJS from "crypto-js";

const getPreLoadedState = (): string => {
  try {
    return CryptoJS.AES.decrypt(localStorage.getItem("reduxState") as string, process.env.REACT_APP_API_KEY as string).toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return "{}";
  }
};

const preLoadedState = JSON.parse(getPreLoadedState());

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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([securityApi.middleware, feedApi.middleware, categoryApi.middleware]),
  preloadedState: preLoadedState,
});

store.subscribe(() => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(store.getState()), process.env.REACT_APP_API_KEY as string).toString();
  localStorage.setItem("reduxState", encryptedData);
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

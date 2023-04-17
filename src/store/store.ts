import {  configureStore } from "@reduxjs/toolkit";

import generateTableSlice from "./slices/generateTableSlice";

export const store = configureStore({
  reducer: {
    generateTableSlice
  },


})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
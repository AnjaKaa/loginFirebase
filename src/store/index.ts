import { configureStore } from "@reduxjs/toolkit";
import userReducer, { IUserState } from "./slices/userSlice";

export interface IRootState {
  user: IUserState;
}

export const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>



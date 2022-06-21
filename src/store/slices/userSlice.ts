import { getNativeSelectUtilityClasses } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

export interface IUserState {
  email: string;
  token: string;
  id: number;
  name: string;
  avatar: string;
  loading: boolean;
}

const initialState: IUserState = {
  email: null,
  token: null,
  id: null,
  name: null,
  avatar: null,
  loading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.avatar = action.payload.photoURL;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.name = null;
      state.avatar = null;
    },
    beginLoading(state) {
      state.loading = true;
    },
    endLoading(state) {
      state.loading = false;
    }
  }
});

export const { setUser, removeUser, beginLoading, endLoading } = userSlice.actions;

export default userSlice.reducer;



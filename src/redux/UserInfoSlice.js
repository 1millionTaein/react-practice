import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "userinfo",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, { payload: { user } }) => ({ ...state, user }),
    logout: (state) => ({ ...state, user: null }),
  },
});

export const { login, logout } = userInfoSlice.actions;
export const getUser = (state) => state.userInfo;
export default userInfoSlice.reducer;

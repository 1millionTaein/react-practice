import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import UserInfoSlice from "./UserInfoSlice";

const reducer = combineReducers({
  userInfo: UserInfoSlice,
});
const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: false })],
});

export default store;

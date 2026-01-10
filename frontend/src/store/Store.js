import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./Slices/videoSlice.js";
import userSlice from "./Slices/User.js";
const myStore = configureStore({
  reducer: { videos: videoSlice, user: userSlice },
});
export default myStore;

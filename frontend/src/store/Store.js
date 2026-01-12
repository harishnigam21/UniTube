import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./Slices/videoSlice.js";
import userSlice from "./Slices/userSlice.js";
import channelSlice from "./Slices/channelSlice.js";
const myStore = configureStore({
  reducer: { videos: videoSlice, user: userSlice, channels: channelSlice },
});
export default myStore;

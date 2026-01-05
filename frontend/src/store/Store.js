import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./Slices/videoSlice";
const myStore = configureStore({
  reducer: { videos: videoSlice },
});
export default myStore;

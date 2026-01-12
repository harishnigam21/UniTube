import { createSlice } from "@reduxjs/toolkit";
const channelSlice = createSlice({
  name: "channel",
  initialState: {
    items: [],
    selectedItems: {},
  },
  reducers: {
    setChannel: (state, action) => {
      state.items = action.payload.items;
    },
    addChannel: (state, action) => {
      state.items = state.items.push(action.payload.item);
    },
    deleteChannel: (state, action) => {
      state.items = state.items.filter((item) => item._id != action.payload.id);
    },
    updateChannel: (state, action) => {
      const toUpdate = action.payload.items;
      for (const key in toUpdate) {
        if (state.items[key]) {
          state.items[key] = toUpdate[key];
        }
      }
    },
  },
});
export const { setChannel, addChannel, deleteChannel, updateChannel } =
  channelSlice.actions;
export default channelSlice.reducer;

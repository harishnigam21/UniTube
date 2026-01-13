import { createSlice } from "@reduxjs/toolkit";
const channelSlice = createSlice({
  name: "channel",
  initialState: {
    items: [],
    selectedItems: null,
  },
  reducers: {
    setChannel: (state, action) => {
      state.items = action.payload.items;
    },
    setSelectedChannel: (state, action) => {
      state.selectedItems = action.payload.items;
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
    updateSelectedChannelSubscribe: (state, action) => {
      if (state.selectedItems.isSubscribed) {
        if (state.selectedItems.subscribers >= 1) {
          state.selectedItems.subscribers -= 1;
        }
      } else {
        state.selectedItems.subscribers += 1;
      }
      state.selectedItems.isSubscribed = !state.selectedItems.isSubscribed;
    },
  },
});
export const {
  setChannel,
  addChannel,
  deleteChannel,
  updateChannel,
  setSelectedChannel,
  updateSelectedChannelSubscribe,
} = channelSlice.actions;
export default channelSlice.reducer;

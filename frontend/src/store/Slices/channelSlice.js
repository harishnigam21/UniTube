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
    deleteSelectedChannelItem: (state, action) => {
      const id = action.payload.id;
      const type = action.payload.type;
      if (
        state.selectedItems[type]["posts"] &&
        state.selectedItems[type]["posts"].length > 0
      ) {
        state.selectedItems[type]["posts"] = state.selectedItems[type][
          "posts"
        ].filter((item) => item._id != id);
      } else {
        console.log(`${type} not found`);
      }
      // Also update totalPosts count if necessary
      if (state.selectedItems.totalPosts[0].count) {
        state.selectedItems.totalPosts[0].count -= 1;
      } else {
        console.log("Unable to get totalPosts");
      }
    },
    updateSelectedChannelItem: (state, action) => {
      const updatedData = action.payload.data; // Full object containing _id
      if (state.selectedItems[updatedData.type]) {
        state.selectedItems[updatedData.type]["posts"] = state.selectedItems[
          updatedData.type
        ].posts.map((item) => {
          if (item._id == updatedData._id) {
            return updatedData;
          } else {
            item;
          }
        });
      }
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
  deleteSelectedChannelItem,
  updateSelectedChannelItem,
} = channelSlice.actions;
export default channelSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "User",
  initialState: {
    userInfo: window.localStorage.getItem("userInfo")
      ? JSON.parse(window.localStorage.getItem("userInfo"))
      : {
          _id: "abcdefgh123456",
          firstname: "abcd",
          middlename: "mnop",
          lastname: "wxyz",
          gender: "other",
          dob: "18-02-2002",
          email: "abcdmnopwxyz18@gmail.com",
          subscription: [
            {
              $oid: "6960dfa452ae35444ac1e3b9",
            },
          ],
          channels: [
            {
              $oid: "6960dfa452ae35444ac1e3b9",
            },
          ],
        },
    loginStatus: window.localStorage.getItem("acTk") ? true : false,
  },
  reducers: {
    newUser: (state, action) => {
      state.userInfo = action.payload.userInfo;
    },
    updateChannel: (state, action) => {
      const currentInfo = state.userInfo;
      currentInfo?.channels.push(action.payload.id);
      window.localStorage.setItem("userInfo", JSON.stringify(currentInfo));
    },
    deleteChannelID: (state, action) => {
      state.userInfo.channels = state.userInfo.channels.filter(
        (channel) => channel != action.payload.id
      );
      window.localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    changeLoginStatus: (state, action) => {
      if (!action.payload.status) {
        window.localStorage.removeItem("acTk");
        state.loginStatus = false;
      } else {
        if (action.payload.status) {
          state.loginStatus = true;
        }
      }
    },
  },
});
export const { newUser, changeLoginStatus, updateChannel, deleteChannelID } =
  userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = {};
    },
  },
});
export const { userData, logOut } = userSlice.actions;
export default userSlice.reducer;

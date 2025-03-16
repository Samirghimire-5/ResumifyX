import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null, 
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userData: (state, action) => {
      state.user = action.payload
    },

    logOut: (state) => {
      state.user = null;
    }
  }
})
export const {userData, logOut} = authSlice.actions;
export default authSlice.reducer; 
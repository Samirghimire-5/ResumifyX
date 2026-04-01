import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  firstName: string;
  email: string;
  avatar: string;
}

interface UserType {
  userCredentials: User | {};
}

const initialState: UserType = {
  userCredentials: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.userCredentials = action.payload;
    },
    logOut: (state) => {
      state.userCredentials = {};
    },
  },
});
export const { setUserData, logOut } = userSlice.actions;
export default userSlice.reducer;

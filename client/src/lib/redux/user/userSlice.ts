import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  email: string;
  password: string;
}

interface UserType {
  user: User | {};
}

const initialState: UserType = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = {};
    },
  },
});
export const { userData, logOut } = userSlice.actions;
export default userSlice.reducer;

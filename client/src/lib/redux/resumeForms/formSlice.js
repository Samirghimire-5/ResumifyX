import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentForm : "Personal Info"
}

const formSlice = createSlice({
  name: "form",
  initialState, 
  reducers: {
    changeActiveForm: (state, action) => {
      state.currentForm = action.payload;
    }
  }
})

export const { changeActiveForm } = formSlice.actions
export default formSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  html: ''
}

const resumeHtmlSlice = createSlice({
  name: 'resumeHtml',
  initialState,
  reducers: {
    setHtml: (state, action) => {
      state.html = action.payload;
    },
  },
})


export const { setHtml } = resumeHtmlSlice.actions;
export default resumeHtmlSlice.reducer;
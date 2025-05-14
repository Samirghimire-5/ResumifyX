import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { html: string } ={
  html: ''
}

const resumeHtmlSlice = createSlice({
  name: 'resumeHtml',
  initialState,
  reducers: {
    setHtml: (state, action: PayloadAction<string>) => {
      state.html = action.payload;
    },
  },
})


export const { setHtml } = resumeHtmlSlice.actions;
export default resumeHtmlSlice.reducer;
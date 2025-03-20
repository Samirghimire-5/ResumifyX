import {createSlice} from "@reduxjs/toolkit"
const initialState = {
  personalInfo: {
    name: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  achievements: [],
}

const resumeDataSlice = createSlice({
  name: "resumeData",
  initialState,
  reducers: {
    personalInfo: (state, action) => {
      state.personalInfo = {...state.personalInfo, ...action.payload}
    }
  }
})

export const { personalInfo } = resumeDataSlice.actions;
export default resumeDataSlice.reducer
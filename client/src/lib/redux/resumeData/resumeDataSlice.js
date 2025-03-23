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
    }, 
    summary: (state, action) => {
      state.summary = action.payload;
    },
    experience: (state, action) => {
      state.experience = action.payload
    }, 
    skills: (state, action) => {
      state.skills = action.payload;
    }
  }
})

export const { personalInfo, summary, experience, skills } = resumeDataSlice.actions;
export default resumeDataSlice.reducer
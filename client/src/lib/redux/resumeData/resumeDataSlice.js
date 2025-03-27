import { createSlice } from "@reduxjs/toolkit";

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
}

const resumeDataSlice = createSlice({
  name: "resumeData",
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      state.personalInfo = {...state.personalInfo, ...action.payload}
    }, 
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    addExperience: (state, action) => {
      state.experience = [...state.experience, action.payload]
    }, 
    delExperience: (state, action) => {
      state.experience = state.experience.filter((_, index) => index !== action.payload)
    },
    updateExperience: (state, action) => {
      const {data, index} = action.payload
      state.experience[index] = {...data}
    },
    addEducation: (state, action) => {
      state.education = [...state.education, action.payload]
    }, 
    delEducation: (state, action) => {
      state.education = state.education.filter((_, index) => index !== action.payload)
    },
    updateEducation: (state, action) => {
      const {data, index} = action.payload
      state.education[index] = {...data}
    },
    setSkills: (state, action) => {
      state.skills = action.payload;
    }, 
    resetResumeData: () => initialState,
  }
})

export const { setPersonalInfo, setSummary, addExperience, setSkills, delExperience, updateExperience, addEducation, delEducation, updateEducation, resetResumeData} = resumeDataSlice.actions;
export default resumeDataSlice.reducer
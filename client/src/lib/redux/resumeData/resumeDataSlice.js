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
    addExperience: (state, action) => {
      state.experience = [...state.experience, action.payload]
    }, 
    delExperience: (state, action) => {
      state.experience.splice(action.payload, 1)
    },
    updateExperience: (state, action) => {
      const {data, index} = action.payload
// console.log(action.payload)
      state.experience[index] = {...data}
    },
    skills: (state, action) => {
      state.skills = action.payload;
    }, 
  }
})

export const { personalInfo, summary, addExperience, skills, delExperience, updateExperience} = resumeDataSlice.actions;
export default resumeDataSlice.reducer
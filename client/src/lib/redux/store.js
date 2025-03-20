import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth/authSlice"
import formReducer from "./resumeForms/formSlice"
import resumeDataReducer from "./resumeData/resumeDataSlice"

export const store = configureStore({
  reducer: {
    userData: authReducer,
    activeForm: formReducer,
    resumeData: resumeDataReducer
  },
})
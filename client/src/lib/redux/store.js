import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth/authSlice"
import formReducer from "./resumeForms/formSlice"

export const store = configureStore({
  reducer: {
    userData: authReducer,
    activeForm: formReducer,
  },
})
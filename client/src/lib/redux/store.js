import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import logger from 'redux-logger';
import userReducer from "./user/userSlice"
import resumeDataReducer from "./resumeData/resumeDataSlice"

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({ 
  userData: userReducer,
  resumeData: resumeDataReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore non-serializable Redux-Persist actions
      },
    })/*.concat(logger)*/,
})

export const persistor = persistStore(store);
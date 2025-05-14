import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/userSlice";
import resumeDataReducer from "./resumeData/resumeDataSlice";
import resumeHtmlReducer from "./aiResumeHtml/resumeHtmlSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userData: userReducer,
  resumeData: resumeDataReducer,
  htmlData: resumeHtmlReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

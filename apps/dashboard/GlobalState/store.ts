"use client";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import TabReducer from "./TabSlice";
import SupervisorReducer from "./supervisorSlice";
import ComplaintReducer from "./complatintSlice";
import SuprvsorReducer from "./Supervisor-ApiCalls/ApiCalls/supervisorSlice/AuthSlice";
import SupervisorComplaints from "./Supervisor-ApiCalls/ApiCalls/supervisorSlice/supervisorComplaintsSlice";
import StatisticReducer from "./WSSC_Slice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {  
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [
    "Tab",
    "Complaint",
    "Supervisor",
    "SupervisorReducer",
    "supervisorComplaints",
    "StatisticReducer",
  ],
};

const reducer = combineReducers({
  User: UserReducer,
  suprvisor: SuprvsorReducer,
  Tab: TabReducer,
  Complaint: ComplaintReducer,
  Supervisor: SupervisorReducer,
  supervisorComplaints: SupervisorComplaints,
  statistics: StatisticReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

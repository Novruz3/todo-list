import { createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../types/types";

const initialState: IUserState = {
  isFetched: false,
  listUuid: "",
  isFetchedTasks: true,
  isFetchedAllTasks: true,
  username: "",
  darkMode : false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsFetched(state) {
      state.isFetched = !state.isFetched;
    },
    setIsFetchedTasks(state) {
      state.isFetchedTasks = !state.isFetchedTasks;
    },
    setIsFetchedAllTasks(state) {
      state.isFetchedAllTasks = !state.isFetchedAllTasks;
    },
    setListUuid(state, action) {
      state.listUuid = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    switchMode(state){
      state.darkMode = !state.darkMode
    },
    setDarkMode(state, action){
      state.darkMode = action.payload
    }
  },
});

export const userAction = userSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../types/types";

const initialState: IUserState = {
  isUser: false,
  isFetched: false,
  listUuid: "",
  isFetchedTasks: true,
  isFetchedAllTasks: true,
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state) {
      state.isUser = true;
    },
    removeUser(state) {
      state.isUser = false;
    },
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
  },
});

export const userAction = userSlice.actions;

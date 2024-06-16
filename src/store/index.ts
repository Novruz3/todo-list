import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./UserSlice";
import { IRootState } from "../types/types";

export const store = configureStore<IRootState>({
  reducer: {
    user: userSlice.reducer,
  },
});

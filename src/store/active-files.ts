import { createSlice } from "@reduxjs/toolkit";

const initialState: any[] = [];

const acitveFilesSlice = createSlice({
  name: "activeFileSlice",
  initialState,
  reducers: {
    addFile(state, action) {
      return [...state, action.payload];
    },
    clear() {
      return [];
    },
  },
});

export const activeFileReducer = acitveFilesSlice.reducer;
export const activeFileActions = acitveFilesSlice.actions;

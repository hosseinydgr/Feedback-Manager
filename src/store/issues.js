import { createSlice } from "@reduxjs/toolkit";

const issuesSlice = createSlice({
  name: "issuesSlice",
  initialState: [],
  reducers: {
    getIssues(state, action) {
      return action.payload;
    },
  },
});

export const issuesActions = issuesSlice.actions;
export const issuesReducer = issuesSlice.reducer;

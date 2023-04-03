import { createSlice } from "@reduxjs/toolkit";

const activeIssueSlice = createSlice({
  name: "activeIssueSlice",
  initialState: {},
  reducers: {
    setActiveIssue(_, action) {
      return action.payload;
    },
  },
});

export const acitveIssueActions = activeIssueSlice.actions;
export const activeIssueReducer = activeIssueSlice.reducer;

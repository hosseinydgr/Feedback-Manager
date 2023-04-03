import { createSlice } from "@reduxjs/toolkit";

const showIssuesSlice = createSlice({
  name: "showIssuesSlice",
  initialState: {},
  reducers: {
    show(state, action) {
      return { ...state, [action.payload]: true };
    },
  },
});

export const showIssuesReducer = showIssuesSlice.reducer;
export const showIssuesActions = showIssuesSlice.actions;

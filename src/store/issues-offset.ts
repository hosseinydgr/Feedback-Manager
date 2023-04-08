import { createSlice } from "@reduxjs/toolkit";

const issuesOffsetSlice = createSlice({
  name: "issuesOffsetSlice",
  initialState: 1,
  reducers: {
    setOffset(state, action) {
      return action.payload;
    },
  },
});

export const issuesOffsetReducer = issuesOffsetSlice.reducer;
export const issuesOffsetActions = issuesOffsetSlice.actions;

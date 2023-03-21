import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "commentsSlice",
  initialState: [],
  reducers: {
    setComments(_, action) {
      return action.payload;
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
export const commentsActions = commentsSlice.actions;

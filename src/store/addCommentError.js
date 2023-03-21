import { createSlice } from "@reduxjs/toolkit";

const addCommentErrorSlice = createSlice({
  name: "addCommentErrorSlice",
  initialState: "",
  reducers: {
    setaddCommentError(_, action) {
      return action.payload;
    },
  },
});

export const addCommentErrorReducer = addCommentErrorSlice.reducer;
export const addCommentErrorActions = addCommentErrorSlice.actions;

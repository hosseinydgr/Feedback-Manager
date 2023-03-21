import { createSlice } from "@reduxjs/toolkit";

const commentsLoadErrorSlice = createSlice({
  name: "commentsLoadErrorSlice",
  initialState: "",
  reducers: {
    setCommentsLoadError(_, action) {
      return action.payload;
    },
  },
});

export const commentsLoadErrorReducer = commentsLoadErrorSlice.reducer;
export const commentsLoadErrorActions = commentsLoadErrorSlice.actions;

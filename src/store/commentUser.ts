import { createSlice } from "@reduxjs/toolkit";

const commentUserSlice = createSlice({
  name: "commentUserSlice",
  initialState: {},
  reducers: {
    setcommentUser(state, action) {
      return { ...state, [action.payload.id]: action.payload.info };
    },
  },
});

export const commentUserReducer = commentUserSlice.reducer;
export const commentUserActions = commentUserSlice.actions;

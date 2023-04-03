import { createSlice } from "@reduxjs/toolkit";

const uploadProgressSlice = createSlice({
  name: "uploadProgressSlice",
  initialState: {},
  reducers: {
    changeProgress: function (state, action) {
      return { ...state, [action.payload.index]: action.payload.value };
    },
    resetUpload: function () {
      return {};
    },
  },
});

export const uploadProgressReducer = uploadProgressSlice.reducer;
export const uploadProgressActions = uploadProgressSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const uploadedFilesSlice = createSlice({
  name: "uploadedFilesSlice",
  initialState: [],
  reducers: {
    setFiles: function (_, action) {
      const arr = [];
      for (let i = 0; i < action.payload.length; i++) {
        arr.push(action.payload[i]);
      }
      //   console.log(arr);
      return arr;
    },
  },
});

export const uploadedFilesReducer = uploadedFilesSlice.reducer;
export const uploadedFilesActions = uploadedFilesSlice.actions;

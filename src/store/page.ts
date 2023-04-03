import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "pageSlice",
  initialState: { nextPage: "/issues" },
  reducers: {
    setNextPage(_, action) {
      return { nextPage: action.payload };
    },
  },
});

export const pageReducer = pageSlice.reducer;
export const pageActions = pageSlice.actions;

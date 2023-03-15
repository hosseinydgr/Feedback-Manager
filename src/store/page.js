import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "pageSlice",
  initialState: { currentPage: 1, nextPage: 1 },
  reducers: {
    changePage(state, action) {
      return { ...state, currentPage: action.payload };
    },

    setNextPage(state, action) {
      return { ...state, nextPage: action.payload };
    },
  },
});

export const pageReducer = pageSlice.reducer;
export const pageActions = pageSlice.actions;

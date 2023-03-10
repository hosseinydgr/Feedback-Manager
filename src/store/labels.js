import { createSlice } from "@reduxjs/toolkit";

const labelsSlice = createSlice({
  name: "labelsSlice",
  initialState: { allLabels: [], activeLabel: "" },
  reducers: {
    setLabels(state, action) {
      return { ...state, allLabels: action.payload };
    },
    setActiveLabel(state, action) {
      return { ...state, activeLabel: action.payload };
    },
  },
});

export const labelsReducer = labelsSlice.reducer;
export const labelsActions = labelsSlice.actions;

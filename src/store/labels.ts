import { createSlice } from "@reduxjs/toolkit";

const allLabels: any[] = [];

const labelsSlice = createSlice({
  name: "labelsSlice",
  initialState: { allLabels, activeLabel: "" },
  reducers: {
    setLabels(state, action) {
      return { ...state, allLabels: action.payload };
    },
    setActiveLabel(state, action) {
      return { ...state, activeLabel: action.payload };
    },
    addLabel(state, action) {
      return { ...state, allLabels: [...state.allLabels, action.payload] };
    },
  },
});

export const labelsReducer = labelsSlice.reducer;
export const labelsActions = labelsSlice.actions;

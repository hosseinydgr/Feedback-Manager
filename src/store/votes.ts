import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {};

const votesSlice = createSlice({
  name: "votesSlice",
  initialState,
  reducers: {
    setLoading(state, action) {
      state[action.payload.id].loading = action.payload.value;
    },
    setError(state, action) {
      state[action.payload.id].error = action.payload.value;
    },
    setUp(state, action) {
      state[action.payload.id].up = action.payload.value;
    },
    setDown(state, action) {
      state[action.payload.id].down = action.payload.value;
    },
  },
});

export const votesReducer = votesSlice.reducer;
export const votesActions = votesSlice.actions;

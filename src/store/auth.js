import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: { isIn: false, user: {} },
  reducers: {
    login(state, action) {
      state.isIn = true;
      state.user = action.payload;
    },
    signOut(state) {
      state.isIn = false;
      state.user = {};
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

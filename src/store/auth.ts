import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: { isIn: false, user: {}, isAdmin: false },
  reducers: {
    login(state, action) {
      state.isIn = true;
      state.user = action.payload;
      state.isAdmin = true;
    },
    signOut(state) {
      state.isIn = false;
      state.user = {};
      state.isAdmin = false;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

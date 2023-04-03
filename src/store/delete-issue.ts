import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const deleteIssueSlice = createSlice({
  name: "deleteIssueSlice",
  initialState: { error: "", ok: false, loading: false },
  reducers: {
    setError(state, action: PayloadAction<string>) {
      return { ...state, error: action.payload };
    },
    setOk(state, action: PayloadAction<boolean>) {
      return { ...state, ok: action.payload };
    },
    setLoading(state, action: PayloadAction<boolean>) {
      return { ...state, loading: action.payload };
    },
  },
});

export const deleteIssueReducer = deleteIssueSlice.reducer;
export const deleteIssueActions = deleteIssueSlice.actions;

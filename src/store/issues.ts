import { createSlice } from "@reduxjs/toolkit";

const initialState: any = { issues: [], loading: "true" };

const issuesSlice = createSlice({
  name: "issuesSlice",
  initialState,
  reducers: {
    getIssues(state, action) {
      // console.log(action.payload);
      return { ...state, issues: action.payload };
    },

    updateIssues(state, action) {
      return { ...state, issues: [...state.issues, ...action.payload] };
    },

    changeProperty(state, action) {
      const arr = [];
      for (let i = 0; i < state.length; i++) {
        if (state[i].id !== action.payload.id) {
          console.log(action);
          arr.push(state[i]);
        } else {
          arr.push({
            ...state[i],
            [action.payload.property]: action.payload.value,
          });
        }
      }
      return { ...state, issues: arr };
    },

    setLoading(state, action) {
      return { ...state, loading: action.payload };
    },
  },
});
export const issuesActions = issuesSlice.actions;
export const issuesReducer = issuesSlice.reducer;

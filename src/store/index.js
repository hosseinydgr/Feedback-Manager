import { configureStore } from "@reduxjs/toolkit";
import { activeIssueReducer } from "./active-issue";
import { authReducer } from "./auth";
import { issuesReducer } from "./issues";
import { labelsReducer } from "./labels";
import { pageReducer } from "./page";

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    page: pageReducer,
    auth: authReducer,
    labels: labelsReducer,
    activeIssue: activeIssueReducer,
  },
});

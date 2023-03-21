import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "../epic/rootEpic";
import { activeIssueReducer } from "./active-issue";
import { addCommentErrorReducer } from "./addCommentError";
import { authReducer } from "./auth";
import { commentsReducer } from "./comments";
import { commentsLoadErrorReducer } from "./commentsLoadError";
import { commentUserReducer } from "./commentUser";
import { issuesReducer } from "./issues";
import { labelsReducer } from "./labels";
import { pageReducer } from "./page";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    page: pageReducer,
    auth: authReducer,
    labels: labelsReducer,
    activeIssue: activeIssueReducer,
    comments: commentsReducer,
    commentsLoadError: commentsLoadErrorReducer,
    addCommentError: addCommentErrorReducer,
    commentUser: commentUserReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   // Ignore these field paths in all actions
      //   ignoredActionPaths: [
      //     "payload.0.$$typeof",
      //     "payload.0.type",
      //     "payload.1.$$typeof",
      //     "payload.1.type",
      //   ],
      //   ignoredPaths: ["comments.0.$$typeof", "comments.0.type"],
      // },
    }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

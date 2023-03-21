import { combineEpics } from "redux-observable";
import { sIssueCommentsContEpic } from "./sIssueCommentsContEpic";
import { sIsuueAddCommentEpic } from "./sIssueAddCommentEpic";
import { sIssueCommentUser } from "./sIssueCommentUser";

export const rootEpic = combineEpics(
  sIssueCommentsContEpic,
  sIsuueAddCommentEpic,
  sIssueCommentUser
);

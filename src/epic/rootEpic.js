import { combineEpics } from "redux-observable";
import { sIssueCommentsContEpic } from "./sIssueCommentsContEpic";
import { sIsuueAddCommentEpic } from "./sIssueAddCommentEpic";
import { sIssueCommentUser } from "./sIssueCommentUser";
import { newIssueUploadFilesEpic } from "./newIssueUploadFilesEpic";

export const rootEpic = combineEpics(
  sIssueCommentsContEpic,
  sIsuueAddCommentEpic,
  sIssueCommentUser,
  newIssueUploadFilesEpic
);

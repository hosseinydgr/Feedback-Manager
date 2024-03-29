import { combineEpics } from "redux-observable";
import { sIssueCommentsContEpic } from "./sIssueCommentsContEpic";
import { sIsuueAddCommentEpic } from "./sIssueAddCommentEpic";
import { sIssueCommentUser } from "./sIssueCommentUser";
import { newIssueUploadFilesEpic } from "./newIssueUploadFilesEpic";
import appLoginByLocalStorage from "./appLoginByLocalStorage";
import appGetIssues from "./appGetIssues";
import appGetLabels from "./appGetLabels";
import sIssueDeleteIssue from "./sIssueDeleteIssue";
import getSpecificIssue from "./getSpecificIssue";

export const rootEpic = combineEpics(
  sIssueCommentsContEpic,
  sIsuueAddCommentEpic,
  sIssueCommentUser,
  newIssueUploadFilesEpic,
  appLoginByLocalStorage,
  appGetIssues,
  appGetLabels,
  sIssueDeleteIssue,
  getSpecificIssue
);

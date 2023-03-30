import { combineEpics } from "redux-observable";
import { sIssueCommentsContEpic } from "./sIssueCommentsContEpic";
import { sIsuueAddCommentEpic } from "./sIssueAddCommentEpic";
import { sIssueCommentUser } from "./sIssueCommentUser";
import { newIssueUploadFilesEpic } from "./newIssueUploadFilesEpic";
import appLoginByLocalStorage from "./appLoginByLocalStorage";
import appGetIssues from "./appGetIssues";
import appGetLabels from "./appGetLabels";

export const rootEpic = combineEpics(
  sIssueCommentsContEpic,
  sIsuueAddCommentEpic,
  sIssueCommentUser,
  newIssueUploadFilesEpic,
  appLoginByLocalStorage,
  appGetIssues,
  appGetLabels
);

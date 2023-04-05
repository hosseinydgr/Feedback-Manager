import { ofType } from "redux-observable";
import { concatMap, map } from "rxjs";
import { ajax } from "rxjs/ajax";
import { acitveIssueActions } from "../store/active-issue";

const getSpecificIssue = function (action$: any) {
  return action$.pipe(
    ofType("getSpecificIssue"),
    concatMap(function (action: any) {
      return ajax(`http://localhost:3000/issues/${action.payload.id}`).pipe(
        map((value) => acitveIssueActions.setActiveIssue(value.response))
      );
    })
  );
};

export default getSpecificIssue;

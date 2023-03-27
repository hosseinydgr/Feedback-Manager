import { ofType } from "redux-observable";
import { concatMap, map } from "rxjs";
import { ajax } from "rxjs/ajax";
import { issuesActions } from "../store/issues";

const appGetIssues = function (action$: any, state$: any) {
  return action$.pipe(
    ofType("getIssues"),
    concatMap(function (action: any) {
      return ajax("http://localhost:3000/issues").pipe(
        map((value) => issuesActions.getIssues(value.response))
      );
    })
  );
};

export default appGetIssues;

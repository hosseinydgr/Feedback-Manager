import { Epic, ofType } from "redux-observable";
import {
  Observable,
  catchError,
  concatMap,
  map,
  of,
  startWith,
  switchMap,
  throwError,
  timer,
} from "rxjs";
import { ajax } from "rxjs/ajax";
import { issuesActions } from "../store/issues";

const appGetIssues: Epic = function (action$) {
  return action$.pipe(
    ofType("getIssues", "updateIssues"),
    concatMap((action) =>
      ajax(
        `http://localhost:3000/issues?offset=${action.payload.offset}&sortBy=${action.payload.sortBy}&sortType=${action.payload.sortType}`
      ).pipe(
        concatMap((value) =>
          of(
            action.type === "getIssues"
              ? issuesActions.getIssues(value.response)
              : issuesActions.updateIssues(value.response),
            issuesActions.setLoading("false")
          )
        ),
        catchError((err: ErrorEvent) =>
          timer(3000).pipe(
            map(() => issuesActions.setError("")),
            startWith(issuesActions.setError(err.message))
          )
        )
      )
    )
  );
};

export default appGetIssues;

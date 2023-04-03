import { ofType } from "redux-observable";
import { Observable, catchError, concatMap, map, of, tap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { deleteIssueActions } from "../store/delete-issue";

function sIssueDeleteIssue(action$: any, state$: any) {
  return action$.pipe(
    ofType("deleteIssue"),
    tap((value) => console.log(value)),
    concatMap(function (action: any) {
      return ajax({
        url: `http://localhost:3000/issues/${action.payload.id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }).pipe(
        catchError(function (error) {
          return new Observable((subscriber) => {
            subscriber.next(deleteIssueActions.setError(error.message));
            setTimeout(() => {
              subscriber.next(deleteIssueActions.setError(""));
              subscriber.complete();
            }, 3000);
          });
        })
      );
    })
  );
}

export default sIssueDeleteIssue;

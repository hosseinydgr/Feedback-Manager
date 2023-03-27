import { ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { catchError, concatMap, map, tap } from "rxjs/operators";
import SIssueComment from "../components/specific-issue/SIssueComment";
import { commentsActions } from "../store/comments";
import { Observable, of } from "rxjs";
import { commentsLoadErrorActions } from "../store/commentsLoadError";

export const sIssueCommentsContEpic = function (acton$, _) {
  return acton$.pipe(
    ofType("getComments"),
    concatMap((action) =>
      ajax(`http://localhost:3000/issues/${action.payload}/comments`).pipe(
        map((value) => value.response),
        map((data) => {
          //   console.log(data);
          const arr = [];
          for (let i = data.length - 1; i >= 0; i--) {
            arr.push(
              <SIssueComment
                des={data[i].text}
                userId={String(data[i].userId)}
                key={data[i].id}
              />
            );
          }
          return arr;
        }),
        // tap((value) => console.log(value)),
        map((value) => {
          //   console.log(value);
          return commentsActions.setComments(value);
        }),
        catchError((error) => {
          return of(
            commentsLoadErrorActions.setCommentsLoadError(error.message)
          );
        })
      )
    )
  );
};

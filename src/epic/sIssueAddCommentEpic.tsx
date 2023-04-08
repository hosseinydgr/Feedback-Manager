import { Epic, ofType } from "redux-observable";
import {
  catchError,
  concatMap,
  EMPTY,
  map,
  Observable,
  of,
  startWith,
  timer,
} from "rxjs";
import { commentsActions } from "../store/comments";
import SIssueComment from "../components/specific-issue/SIssueComment";
import { addCommentErrorActions } from "../store/addCommentError";
import { ajax } from "rxjs/ajax";

export const sIsuueAddCommentEpic: Epic = function (action$, state$) {
  return action$.pipe(
    ofType("addNewComment"),
    concatMap(function (action) {
      if (action.text !== "") {
        return ajax({
          url: `http://localhost:3000/issues/${action.id}/comments`,
          method: "POST",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ text: action.text }),
        }).pipe(
          map(() =>
            commentsActions.setComments([
              <SIssueComment
                des={action.text}
                userId={state$.value.auth.user.id}
              />,
              ...state$.value.comments,
            ])
          ),
          catchError((err: ErrorEvent) =>
            timer(3000).pipe(
              map(() => addCommentErrorActions.setaddCommentError("")),
              startWith(addCommentErrorActions.setaddCommentError(err.message))
            )
          )
        );
      } else {
        return timer(3000).pipe(
          map(() => addCommentErrorActions.setaddCommentError("")),
          startWith(
            addCommentErrorActions.setaddCommentError("Comment can't be empty.")
          )
        );
      }
    })
  );
};

// return new Observable((subscriber) => {
//   if (action.text !== "") {
//     (async function postData() {
//       try {
//         const res = await fetch(
//           `http://localhost:3000/issues/${action.id}/comments`,
//           {
//             method: "POST",
//             credentials: "include",
//             headers: {
//               "Content-Type": "application/json;charset=utf-8",
//             },
//             body: JSON.stringify({ text: action.text }),
//           }
//         );
//         const data = await res.json();
//         console.log(data, res);
//         if (res.ok) {
//           subscriber.next(
//             commentsActions.setComments([
//               <SIssueComment
//                 des={action.text}
//                 userId={state$.value.auth.user.id}
//               />,
//               ...state$.value.comments,
//             ])
//           );
//           subscriber.complete();
//         } else {
//           throw new Error(data.message);
//         }
//         // console.log(data, res);
//       } catch (err: any) {
//         subscriber.next(addCommentErrorActions.setaddCommentError(err.message));
//         setTimeout(() => {
//           subscriber.next(addCommentErrorActions.setaddCommentError(""));
//           subscriber.complete();
//         }, 3000);
//       }
//     })();
//   } else {
//     subscriber.next(
//       addCommentErrorActions.setaddCommentError("Comment can't be empty.")
//     );
//     setTimeout(() => {
//       subscriber.next(addCommentErrorActions.setaddCommentError(""));
//       subscriber.complete();
//     }, 3000);
//   }
// });

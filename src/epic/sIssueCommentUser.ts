import { ofType } from "redux-observable";
import { concatMap, map } from "rxjs";
import { ajax } from "rxjs/ajax";
import { commentUserActions } from "../store/commentUser";

export const sIssueCommentUser = function (action$: any, state$: any) {
  return action$.pipe(
    ofType("commentUser"),
    concatMap((action: any) => {
      return ajax(`http://localhost:3000/users/${action.payload}`).pipe(
        map((value: any) =>
          commentUserActions.setcommentUser({
            info: value.response,
            id: action.payload,
          })
        )
      );
    })
  );
};

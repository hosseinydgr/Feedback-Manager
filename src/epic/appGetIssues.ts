import { ofType } from "redux-observable";
import { Observable, concatMap, map, switchMap, throwError } from "rxjs";
import { ajax } from "rxjs/ajax";
import { issuesActions } from "../store/issues";
// import { scrollHandler } from "../components/issues/IssuesMain";

const appGetIssues = function (action$: any, state$: any) {
  return action$.pipe(
    ofType("getIssues", "updateIssues"),
    concatMap(function (action: any) {
      // console.log(action);
      return ajax(
        `http://localhost:3000/issues?offset=${action.payload.offset}&sortBy=${action.payload.sortBy}&sortType=${action.payload.sortType}`
      ).pipe(
        concatMap(
          (value: any) =>
            new Observable((subscriber) => {
              // console.log(value);
              if (value.status === 200) {
                subscriber.next(
                  action.type === "getIssues"
                    ? issuesActions.getIssues(value.response)
                    : issuesActions.updateIssues(value.response)
                );
                // if (
                //   action.type === "updateIssues" &&
                //   value.response.length === 0
                // ) {
                //   window.removeEventListener("scroll", scrollHandler);
                // }
                subscriber.next(issuesActions.setLoading("false"));
                subscriber.complete();
              }
            })
        )
      );
    })
  );
};

export default appGetIssues;

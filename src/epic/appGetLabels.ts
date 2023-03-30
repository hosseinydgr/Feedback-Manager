import { ofType } from "redux-observable";
import { concatMap, map } from "rxjs";
import { ajax } from "rxjs/ajax";
import { labelsActions } from "../store/labels";

const appGetLabels = function (action$: any) {
  return action$.pipe(
    ofType("getLabels"),
    concatMap(() =>
      ajax("http://localhost:3000/labels").pipe(
        map((value) => labelsActions.setLabels(value.response))
      )
    )
  );
};

export default appGetLabels;

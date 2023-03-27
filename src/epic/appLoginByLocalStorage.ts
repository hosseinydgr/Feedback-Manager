import { ofType } from "redux-observable";
import { catchError, concatMap, map, Observable, tap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { authActions } from "../store/auth";

const appLoginByLocalStorage = function (action$: any, state$: any) {
  return action$.pipe(
    ofType("loginByLocalStorage"),
    concatMap(function (action: any) {
      return ajax({
        url: "http://localhost:3000/auth/login",
        method: "POST",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          email: action.payload.email,
          password: action.payload.password,
        }),
      }).pipe(
        // tap((value: any) => console.log(value)),
        map((value) => authActions.login(value.response)),
        catchError((error) => {
          return new Observable(() => console.log(error, "Me"));
        })
      );
    })
  );
};

export default appLoginByLocalStorage;

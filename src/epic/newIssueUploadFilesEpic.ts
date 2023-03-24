import { ofType } from "redux-observable";
import { catchError, concatMap, Observable, of } from "rxjs";
import { uploadProgressActions } from "../store/upload-progress";

export const newIssueUploadFilesEpic = function (action$: any, state$: any) {
  return action$.pipe(
    ofType("uploadFiles"),
    concatMap(function (action: any) {
      return new Observable(function (subscriber) {
        for (let i = 0; i < action.files.length; i++) {
          const xhr: any = new XMLHttpRequest();

          xhr.upload.onprogress = function (event: any) {
            subscriber.next(
              uploadProgressActions.changeProgress({
                index: i,
                value: (event.loaded / event.total) * 100,
              })
            );

            console.log(`Uploaded ${event.loaded} of ${event.total}`);
          };

          xhr.onloadend = function () {
            if (xhr.status === 200 || xhr.status === 201) {
              console.log("success", i);
              subscriber.next(
                uploadProgressActions.changeProgress({
                  index: i,
                  value: "true",
                })
              );
              if (i === action.files.length - 1) subscriber.complete();
            } else {
              console.log("error " + this.responseText);
              subscriber.next(
                uploadProgressActions.changeProgress({
                  index: i,
                  value: "false",
                })
              );
              if (i === action.files.length - 1) subscriber.complete();
            }
          };

          const myForm = new FormData();
          myForm.append("file", action.files[i]);

          xhr.open("POST", "http://localhost:3000/files/upload/");
          xhr.withCredentials = true;
          xhr.send(myForm);
        }
      }).pipe(
        catchError((error) => {
          return new Observable(() => console.log(error.message, "Me"));
        })
      );
    })
  );
};

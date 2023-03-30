import { ofType } from "redux-observable";
import { catchError, concatMap, Observable, of } from "rxjs";
import { activeFileActions } from "../store/active-files";
import { uploadProgressActions } from "../store/upload-progress";

export const newIssueUploadFilesEpic = function (action$: any, state$: any) {
  return action$.pipe(
    ofType("uploadFiles"),
    concatMap(function (action: any) {
      return new Observable(function (subscriber) {
        for (let i = 0; i < action.files.length; i++) {
          subscriber.next({ index: i, file: action.files[i] });
        }
        subscriber.complete();
      }).pipe(
        concatMap(function (obj: any) {
          return new Observable(function (subscriber) {
            const xhr: any = new XMLHttpRequest();

            xhr.upload.onprogress = function (event: any) {
              subscriber.next(
                uploadProgressActions.changeProgress({
                  index: obj.index,
                  value: (event.loaded / event.total) * 100,
                })
              );

              console.log(`Uploaded ${event.loaded} of ${event.total}`);
            };

            xhr.onloadend = function () {
              if (xhr.status === 200 || xhr.status === 201) {
                console.log("success", obj.index);
                console.log(JSON.parse(xhr.response).id);
                subscriber.next(
                  uploadProgressActions.changeProgress({
                    index: obj.index,
                    value: "true",
                  })
                );
                subscriber.next(
                  activeFileActions.addFile(String(JSON.parse(xhr.response).id))
                );
              } else {
                console.log("error " + this.responseText);
                subscriber.next(
                  uploadProgressActions.changeProgress({
                    index: obj.index,
                    value: "false",
                  })
                );
              }
              subscriber.complete();
            };

            const myForm = new FormData();
            myForm.append("file", obj.file);

            xhr.open("POST", "http://localhost:3000/files/upload");
            xhr.withCredentials = true;
            xhr.send(myForm);
          });
        }),
        catchError((error) => {
          return new Observable(() => console.log(error.message, "Me"));
        })
      );
    }),
    catchError((error) => {
      return new Observable(() => console.log(error.message, "Me"));
    })
  );
};

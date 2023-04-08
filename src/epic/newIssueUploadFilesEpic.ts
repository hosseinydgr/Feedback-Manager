import { Epic, ofType } from "redux-observable";
import { catchError, concatMap, EMPTY, from, map, Observable, tap } from "rxjs";
import { activeFileActions } from "../store/active-files";
import { uploadProgressActions } from "../store/upload-progress";

export const newIssueUploadFilesEpic: Epic = function (action$) {
  return action$.pipe(
    ofType("uploadFiles"),
    concatMap((action) =>
      from(Array.from({ length: action.files.length }, (_, i) => i)).pipe(
        map((i) => ({ index: i, file: action.files[i] })),
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
          console.log(error.message, "Me");
          return EMPTY;
        })
      )
    )
  );
};

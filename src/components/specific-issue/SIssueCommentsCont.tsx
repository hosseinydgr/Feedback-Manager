import SIssueComment from "./SIssueComment";
import styles from "./SIssueCommentsCont.module.scss";
import { useEffect, useState } from "react";
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

const SIssueCommentsCont: React.FC<{
  id: string;
  comments: any;
  setComments: any;
}> = (props) => {
  const [error, setError] = useState("");

  useEffect(function () {
    ajax(`http://localhost:3000/issues/${props.id}/comments`)
      .pipe(map((value) => value.response))
      .subscribe({
        next: function (data: any) {
          // console.log(data);
          const arr = [];
          for (let i = data.length - 1; i >= 0; i--) {
            arr.push(
              <SIssueComment
                des={data[i].text}
                userId={String(data[i].userId)}
              />
            );
          }
          props.setComments(arr);
        },
        error: (value: any) => setError(value.message),
      });
  }, []);

  return (
    <div className={styles["main-cont"]}>
      {error === "" ? props.comments : <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default SIssueCommentsCont;

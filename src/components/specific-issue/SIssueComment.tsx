import styles from "./SIssueComment.module.scss";
import { useEffect, useState } from "react";
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

const SIssueComment: React.FC<{ des: string; userId: string }> = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(function () {
    ajax(`http://localhost:3000/users/${props.userId}`)
      .pipe(map((value) => value.response))
      .subscribe((value: any) => {
        setName(value.name);
        setEmail(value.email);
      });
  }, []);

  return (
    <div className={styles["main-cont"]}>
      <div className={styles["flex-cont"]}>
        <div className={styles["flex-cont"]}>
          <img src="./Assets/pic.jpg" className={styles.avatar} />

          <div>
            <p className={styles.username}>{name}</p>
            <p className={styles.userid}>{email}</p>
          </div>
        </div>

        <p className={styles.reply}>Reply</p>
      </div>

      <p className={styles.des}>{props.des}</p>
    </div>
  );
};

export default SIssueComment;

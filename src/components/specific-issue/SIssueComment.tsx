import styles from "./SIssueComment.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SIssueComment: React.FC<{ des: string; userId: string }> = (props) => {
  const user = useSelector((state: any) => state.commentUser[props.userId]);
  const dispatch = useDispatch();

  useEffect(function () {
    dispatch({ type: "commentUser", payload: props.userId });
  }, []);

  return (
    <div className={styles["main-cont"]}>
      <div className={styles["flex-cont"]}>
        <div className={styles["flex-cont"]}>
          <img src="../Assets/pic.jpg" className={styles.avatar} />

          <div>
            <p className={styles.username}>
              {user === undefined ? "" : user.name}
            </p>
            <p className={styles.userid}>
              {user === undefined ? "" : user.email}
            </p>
          </div>
        </div>

        <p className={styles.reply}>Reply</p>
      </div>

      <p className={styles.des}>{props.des}</p>
    </div>
  );
};

export default SIssueComment;

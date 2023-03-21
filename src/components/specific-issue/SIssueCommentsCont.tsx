import SIssueComment from "./SIssueComment";
import styles from "./SIssueCommentsCont.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SIssueCommentsCont: React.FC<{ id: string }> = (props) => {
  const error = useSelector((state: any) => state.commentsLoadError);
  const comments = useSelector((state: any) => state.comments);
  const dispatch = useDispatch();

  useEffect(function () {
    dispatch({
      type: "getComments",
      payload: props.id,
    });
  }, []);

  return (
    <div className={styles["main-cont"]}>
      {error === "" ? comments : <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default SIssueCommentsCont;

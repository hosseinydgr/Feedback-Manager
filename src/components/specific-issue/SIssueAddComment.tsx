import styles from "./SIssueAddComment.module.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { issuesActions } from "../../store/issues";

const SIssueAddComment: React.FC<{
  id: string;
  commentsCount: number;
}> = (props) => {
  const [text, setText] = useState("");
  const [leftChars, setLeftChars] = useState(250);
  const error = useSelector((state: any) => state.addCommentError);
  const dispatch = useDispatch();

  function inputHandler(e: any) {
    setText(e.target.value);
  }

  function leftCharsHandler(e: any) {
    setLeftChars(250 - e.target.value.length);
  }

  function postComment() {
    dispatch({ type: "addNewComment", text, id: props.id });
    dispatch(
      issuesActions.changeProperty({
        id: props.id,
        property: "commentsCount",
        value: props.commentsCount + 1,
      })
    );
  }

  return (
    <div className={styles["main-cont"]}>
      <h3>Add Comment</h3>
      <textarea
        className={styles.textarea}
        placeholder="Type your comment here"
        value={text}
        maxLength={250}
        onChange={inputHandler}
        onInput={leftCharsHandler}
      />
      {error !== "" && <p className={styles.error}>{error}</p>}
      <div className={styles["flex-cont"]}>
        <p className={styles.char}>
          <span>{leftChars} </span>Characters left
        </p>
        <button className={styles["post-btn"]} onClick={postComment}>
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default SIssueAddComment;

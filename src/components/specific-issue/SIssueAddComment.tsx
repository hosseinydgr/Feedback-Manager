import styles from "./SIssueAddComment.module.scss";
import { useState } from "react";
import SIssueComment from "./SIssueComment";
import { useSelector } from "react-redux";

const SIssueAddComment: React.FC<{
  id: string;
  comments: any;
  setComments: any;
}> = (props) => {
  const [text, setText] = useState("");
  const [leftChars, setLeftChars] = useState(250);
  const [error, setError] = useState("");
  const userId = useSelector((state: any) => state.auth.user.id);

  function inputHandler(e: any) {
    setText(e.target.value);
  }

  function leftCharsHandler(e: any) {
    setLeftChars(250 - e.target.value.length);
  }

  function postComment() {
    if (text !== "") {
      (async function postData() {
        try {
          const res = await fetch(
            `http://localhost:3000/issues/${props.id}/comments`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify({ text: text }),
            }
          );
          const data = await res.json();
          if (res.ok) {
            props.setComments([
              <SIssueComment des={text} userId={userId} />,
              ...props.comments,
            ]);
          } else {
            throw new Error(data.message);
          }
          // console.log(data, res);
        } catch (err: any) {
          setError(err.message);
        }
      })();
    } else {
      setError("Comment can't be empty.");
      setTimeout(() => setError(""), 3000);
    }
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

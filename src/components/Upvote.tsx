import styles from "./Upvote.module.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../store/page";

const Upvote: React.FC<{ children: string; id: string }> = (props) => {
  const [votes, setVotes] = useState(props.children);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const userIsIn = useSelector((state: any) => state.auth.isIn);
  const dispatch = useDispatch();

  function upVote() {
    if (userIsIn) {
      if (!loading) {
        setLoading(true);
        setTimeout(
          () =>
            (async function postData() {
              try {
                const res = await fetch(
                  `http://localhost:3000/issues/${props.id}/votes`,
                  {
                    method: "POST",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({
                      type: "Up",
                    }),
                  }
                );
                // console.log(res);
                if (res.ok) {
                  setVotes(String(Number(votes) + 1));
                } else {
                  const data = await res.json();
                  throw new Error(data.message);
                }
              } catch (err: any) {
                // console.log(err.message);
                setError(err.message);
                setTimeout(() => setError(""), 3000);
              }
              setLoading(false);
            })(),
          1
        );
      }
    } else {
      dispatch(pageActions.changePage(2));
      dispatch(pageActions.setNextPage(1));
    }
  }

  function downVote() {
    if (userIsIn) {
      if (!loading) {
        setLoading(true);
        setTimeout(
          () =>
            (async function postData() {
              try {
                const res = await fetch(
                  `http://localhost:3000/issues/${props.id}/votes`,
                  {
                    method: "POST",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({
                      type: "Down",
                    }),
                  }
                );
                // console.log(res);
                if (res.ok) {
                  setVotes(String(Number(votes) - 1));
                } else {
                  const data = await res.json();
                  throw new Error(data.message);
                }
              } catch (err: any) {
                // console.log(err.message);
                setError(err.message);
                setTimeout(() => setError(""), 3000);
              }
              setLoading(false);
            })(),
          1
        );
      }
    } else {
      dispatch(pageActions.changePage(2));
      dispatch(pageActions.setNextPage(1));
    }
  }

  return (
    <div className={styles.cont}>
      <div className={styles["main-cont"]}>
        <p className={styles.arrow} onClick={upVote}>
          &#x5E;
        </p>
        <p className={styles.number}>
          {loading ? <div className={styles.loading}></div> : votes}
        </p>
        <p className={styles.arrow} onClick={downVote}>
          &#x2304;
        </p>
      </div>

      {error !== "" && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Upvote;

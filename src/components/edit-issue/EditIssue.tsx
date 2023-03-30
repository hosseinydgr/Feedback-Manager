import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./EditIssue.module.scss";
import { Link, useNavigate } from "react-router-dom";

const EditIssue: React.FC = (props) => {
  const dispatch = useDispatch();
  const activeIssue = useSelector((state: any) => state.activeIssue);
  const userId = useSelector((state: any) => state.auth.user.id);
  const navigate = useNavigate();

  const [title, setTitle] = useState(activeIssue.title);
  const [des, setDes] = useState(activeIssue.des);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function titleChangeHandler(e: any) {
    setTitle(e.target.value);
  }

  function desChangeHandler(e: any) {
    setDes(e.target.value);
  }

  function typeChangeHandler(e: any) {
    // console.log(e.target.value);
    setType(e.target.value);
  }

  function statusChangeHandler(e: any) {
    setStatus(e.target.value);
  }

  function submitHandler(e: any) {
    e.preventDefault();
    console.log(activeIssue.userId, userId);
    if (!loading) {
      if (activeIssue.userId != userId) {
        setError("You are not allowed to edit this issue.");
        return;
      } else {
        setLoading(true);
        setTimeout(
          () =>
            (async function patchData() {
              try {
                const res = await fetch(
                  `http://localhost:3000/issues/${activeIssue.id}`,
                  {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({
                      title: title,
                      description: des,
                      type: type,
                      status: status,
                    }),
                  }
                );
                const data = await res.json();
                console.log(data, res);
                if (res.ok) {
                  navigate("/issues");
                  window.location.reload();
                } else throw new Error(data.message);
              } catch (err: any) {
                setError(err.message);
                setTimeout(() => setError(""), 3000);
              }
              setLoading(false);
            })(),
          1
        );
      }
    }
  }

  return (
    <div className={styles["main-cont"]}>
      <form onSubmit={submitHandler}>
        {error !== "" ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <div className={styles.placeholder}></div>
        )}
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={titleChangeHandler}
          required
        />
        <label htmlFor="des" className={styles["margin-top"]}>
          Description
        </label>
        <textarea id="des" value={des} onChange={desChangeHandler} required />

        <label htmlFor="type" className={styles["margin-top"]}>
          Type
        </label>
        <select onInput={typeChangeHandler} required value={type}>
          <option disabled hidden value="">
            -- select an option --
          </option>
          <option>Bug</option>
          <option>Suggestion</option>
        </select>

        <label htmlFor="status" className={styles["margin-top"]}>
          Status
        </label>
        <select onInput={statusChangeHandler} required value={status}>
          <option disabled hidden value="">
            -- select an option --
          </option>
          <option>Pending</option>
          <option>InProgress</option>
          <option>Done</option>
        </select>

        <button
          type="submit"
          className={`${styles["submit-btn"]} ${
            loading ? styles.inactive : ""
          }`}
        >
          {loading ? <div className={styles.loading}></div> : "Edit Issue"}
        </button>
      </form>

      <Link to={`/issues/${activeIssue.id}`}>
        <p className={styles["go-to-issues"]}>Get back to issue page</p>
      </Link>
    </div>
  );
};

export default EditIssue;

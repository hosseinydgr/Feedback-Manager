import { useDispatch, useSelector } from "react-redux/es/exports";
import { pageActions } from "../../store/page";
import { useState } from "react";
import styles from "./IssuesHeader.module.scss";
import { useNavigate } from "react-router-dom";

const IssuesHeader: React.FC<{ setSortType: any; count: number }> = (props) => {
  const dispatch = useDispatch();
  const isIn = useSelector((state: any) => state.auth.isIn);
  // const issues = useSelector((state: any) => state.issues);
  const [sort, setSort] = useState("most-votes");
  const navigate = useNavigate();

  function addFeedbackHandler() {
    if (!isIn) {
      navigate("/login");
      dispatch(pageActions.setNextPage("/issues/new"));
    } else navigate("/issues/new");
  }

  function addLabelHandler() {
    if (!isIn) {
      navigate("/login");
      dispatch(pageActions.setNextPage("/newLabel"));
    } else navigate("/newLabel");
  }

  function sortChangeHandler(e: any) {
    setSort(e.target.value);
    props.setSortType(e.target.value);
  }

  return (
    <div className={styles["main-cont"]} style={{ color: "white" }}>
      <h3 className={styles["suggestions-count"]}>
        <span>{props.count}</span> Suggestions
      </h3>

      <div>
        <label htmlFor="type" className={styles["sort-label"]}>
          Sort by:
        </label>
        <br className={styles.br} />
        <select
          onInput={sortChangeHandler}
          value={sort}
          className={styles["select-sort"]}
        >
          <option value="most-votes">Most Votes</option>
          <option value="most-comments">Most Comments</option>
          <option value="date">Date</option>
        </select>
      </div>

      <div className={styles["btns-cont"]}>
        <button onClick={addFeedbackHandler} className={styles.btn}>
          + Add Feedback
        </button>

        <button onClick={addLabelHandler} className={styles.btn}>
          + Add Label
        </button>
      </div>
    </div>
  );
};

export default IssuesHeader;

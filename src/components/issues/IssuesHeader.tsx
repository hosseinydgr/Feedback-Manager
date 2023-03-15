import { useDispatch, useSelector } from "react-redux/es/exports";
import { pageActions } from "../../store/page";
import { useState } from "react";
import styles from "./IssuesHeader.module.scss";

const IssuesHeader: React.FC<{ setSortType: any; count: number }> = (props) => {
  const dispatch = useDispatch();
  const isIn = useSelector((state: any) => state.auth.isIn);
  // const issues = useSelector((state: any) => state.issues);
  const [sort, setSort] = useState("most-votes");

  function addFeedbackHandler() {
    if (!isIn) {
      dispatch(pageActions.changePage(2));
      dispatch(pageActions.setNextPage(5));
    } else dispatch(pageActions.changePage(5));
  }

  function addLabelHandler() {
    if (!isIn) {
      dispatch(pageActions.changePage(2));
      dispatch(pageActions.setNextPage(4));
    } else dispatch(pageActions.changePage(4));
  }

  function sortChangeHandler(e: any) {
    setSort(e.target.value);
    props.setSortType(e.target.value);
  }

  return (
    <div className={styles["main-cont"]} style={{ color: "white" }}>
      <h3>
        <span>{props.count}</span> Suggestions
      </h3>

      <div>
        <label htmlFor="type" className={styles["sort-label"]}>
          Sort by:
        </label>
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

      <button onClick={addFeedbackHandler} className={styles.btn}>
        + Add Feedback
      </button>

      <button onClick={addLabelHandler} className={styles.btn}>
        + Add Label
      </button>
    </div>
  );
};

export default IssuesHeader;

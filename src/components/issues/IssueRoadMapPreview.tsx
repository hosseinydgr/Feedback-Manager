import styles from "./IssueRoadMapPreview.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const IssueRoadMapPreview: React.FC = function () {
  const issues = useSelector((state: any) => state.issues.issues);

  let inProgressCount = 0;
  let doneCount = 0;
  let pendingCount = 0;

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].status === "Pending") pendingCount++;
    else if (issues[i].status === "InProgress") inProgressCount++;
    else if (issues[i].status === "Done") doneCount++;
  }

  return (
    <div className={styles["main-cont"]}>
      <div className={`${styles["flex-cont"]} ${styles.header}`}>
        <h2>RoadMap</h2>
        <Link to="/board">
          <p className={styles.view}>view</p>
        </Link>
      </div>

      <div className={styles["flex-cont"]}>
        <div className={styles["flex-cont"]}>
          <div className={`${styles.bullet} ${styles.orange}`}></div>
          <p>Pending</p>
        </div>
        <p>{pendingCount}</p>
      </div>

      <div className={`${styles["flex-cont"]} ${styles.margin}`}>
        <div className={styles["flex-cont"]}>
          <div className={`${styles.bullet} ${styles.purple}`}></div>
          <p>In-Progress</p>
        </div>
        <p>{inProgressCount}</p>
      </div>

      <div className={styles["flex-cont"]}>
        <div className={styles["flex-cont"]}>
          <div className={`${styles.bullet} ${styles.blue}`}></div>
          <p>Done</p>
        </div>
        <p>{doneCount}</p>
      </div>
    </div>
  );
};

export default IssueRoadMapPreview;

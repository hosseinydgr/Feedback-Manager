import styles from "./IssueRoadMapPreviewMobile.module.scss";
import { Link } from "react-router-dom";

const IssueRoadMapPreviewMobile: React.FC = function () {
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
        <p>5</p>
      </div>

      <div className={`${styles["flex-cont"]} ${styles.margin}`}>
        <div className={styles["flex-cont"]}>
          <div className={`${styles.bullet} ${styles.purple}`}></div>
          <p>In-Progress</p>
        </div>
        <p>2</p>
      </div>

      <div className={styles["flex-cont"]}>
        <div className={styles["flex-cont"]}>
          <div className={`${styles.bullet} ${styles.blue}`}></div>
          <p>Done</p>
        </div>
        <p>4</p>
      </div>
    </div>
  );
};

export default IssueRoadMapPreviewMobile;

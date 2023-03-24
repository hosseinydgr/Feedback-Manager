import IssueRoadMapPreview from "./IssueRoadMapPreview";
import IssuesLabelsCont from "./IssuesLabelsCont";
import styles from "./IssuesSideBar.module.scss";

const IssuesSideBar: React.FC = (props) => {
  return (
    <div className={styles["main-cont"]}>
      <div className={styles.banner}>
        <h2>Bale Messenger</h2>
        <p>Feedback Manager</p>
      </div>
      <IssuesLabelsCont />
      <IssueRoadMapPreview />
    </div>
  );
};

export default IssuesSideBar;

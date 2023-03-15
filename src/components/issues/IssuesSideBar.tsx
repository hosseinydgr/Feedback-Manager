import IssuesLabelsCont from "./IssuesLabelsCont";
import styles from "./IssuesSideBar.module.scss";

const IssuesSideBar: React.FC = (props) => {
  return (
    <div className={styles["main-cont"]}>
      <IssuesLabelsCont />
    </div>
  );
};

export default IssuesSideBar;

import IssuesMain from "./IssuesMain";
import IssuesSideBar from "./IssuesSideBar";
import styles from "./IssuesPage.module.scss";
import Header from "../Header";

const IssuesPage: React.FC = (props) => {
  return (
    <>
      <Header />
      <div className={styles["main-cont"]}>
        <IssuesSideBar />
        <IssuesMain />
      </div>
    </>
  );
};

export default IssuesPage;

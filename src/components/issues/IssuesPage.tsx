import IssuesMain from "./IssuesMain";
import IssuesSideBar from "./IssuesSideBar";
import styles from "./IssuesPage.module.scss";
import Header from "../Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const IssuesPage: React.FC = (props) => {
  const dispatch = useDispatch();
  const issues = useSelector((state: any) => state.issues);

  useEffect(function () {
    if (issues.length === 0) dispatch({ type: "getIssues" });
    dispatch({ type: "getLabels" });
  }, []);

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

import IssueRoadMapPreview from "./IssueRoadMapPreview";
import IssueRoadMapPreviewMobile from "./IssueRoadMapPreviewMobile";
import IssuesLabelsCont from "./IssuesLabelsCont";
import IssuesLabelsContMobile from "./IssuesLabelsContMobile";
import styles from "./IssuesSideBar.module.scss";
import { useState } from "react";

const IssuesSideBar: React.FC = (props) => {
  const [showSideBar, setShowSideBar] = useState(false);

  function openSideBar() {
    setShowSideBar(true);
    document.body.style.overflowY = "hidden";
  }

  function closeSideBar() {
    setShowSideBar(false);
    document.body.style.overflowY = "unset";
  }

  return (
    <div className={styles["main-cont"]}>
      <div className={styles.banner}>
        <div>
          <h2>Bale Messenger</h2>
          <p>Feedback Manager</p>
        </div>
        <img
          src="../Assets/menu-icon.png"
          className={styles["menu-icon"]}
          onClick={openSideBar}
        />
      </div>
      <IssuesLabelsCont />
      <IssueRoadMapPreview />

      <div className={styles[`mobile-side-bar${showSideBar ? "-show" : ""}`]}>
        <img
          src="../Assets/multiply-icon.png"
          className={styles["multiply-icon"]}
          onClick={closeSideBar}
        />
        <IssuesLabelsContMobile />
        <IssueRoadMapPreviewMobile />
      </div>
    </div>
  );
};

export default IssuesSideBar;

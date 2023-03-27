import { useEffect, useState } from "react";
import IssuesIssue from "./IssuesIssue";
import styles from "./IssuesMain.module.scss";
import { useDispatch, useSelector } from "react-redux/es/exports";
import IssuesHeader from "./IssuesHeader";

const IssuesMain: React.FC = (props) => {
  const dispatch = useDispatch();
  let issues: any = useSelector((state: any) => state.issues);
  const [sortType, setSortType] = useState("most-votes");
  const activeLabel = useSelector((state: any) => state.labels.activeLabel);

  let arr = [];
  let sortedIssues: any = [...issues];

  if (sortType === "") sortedIssues = [];
  else if (sortType === "most-votes") {
    sortedIssues.sort(function (a: any, b: any) {
      return (
        b.upVoteCount - b.downVoteCount - (a.upVoteCount - a.downVoteCount)
      );
    });
  } else if (sortType === "most-comments") {
    sortedIssues.sort(function (a: any, b: any) {
      return b.commentsCount - a.commentsCount;
    });
  } else if (sortType === "date") {
    sortedIssues.sort(function (a: any, b: any) {
      return a.date - b.date;
    });
  }

  for (let i = 0; i < sortedIssues.length; i++) {
    if (sortedIssues[i].labels.includes(activeLabel) || activeLabel === "")
      arr.push(
        <IssuesIssue
          id={sortedIssues[i].id}
          userId={sortedIssues[i].userId}
          title={sortedIssues[i].title}
          des={sortedIssues[i].description}
          commentsCount={sortedIssues[i].commentsCount}
          labels={sortedIssues[i].labels}
          upVoteCount={sortedIssues[i].upVoteCount}
          downVoteCount={sortedIssues[i].downVoteCount}
          date={sortedIssues[i].date}
          key={sortedIssues[i].id}
        />
      );
  }

  return (
    <div className={styles["main-cont"]}>
      <IssuesHeader setSortType={setSortType} count={arr.length} />
      {arr}
    </div>
  );
};

export default IssuesMain;

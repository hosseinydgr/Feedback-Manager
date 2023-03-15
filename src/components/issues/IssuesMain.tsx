import { useEffect, useState } from "react";
import IssuesIssue from "./IssuesIssue";
import styles from "./IssuesMain.module.scss";
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { issuesActions } from "../../store/issues";
import IssuesHeader from "./IssuesHeader";

const IssuesMain: React.FC = (props) => {
  // const dispatch = useDispatch();
  // const issues = useSelector((state: any) => state.issues);
  const [sortType, setSortType] = useState("");
  const activeLabel = useSelector((state: any) => state.labels.activeLabel);

  let issues: any;
  if (sortType === "") issues = [];
  else if (sortType === "most-votes") issues = [...mostVotes];
  else if (sortType === "most-comments") issues = [...mostComments];
  else if (sortType === "date") issues = [...date];

  // console.log(issues);

  const arr = [];

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].labels.includes(activeLabel) || activeLabel === "")
      arr.push(
        <IssuesIssue
          id={issues[i].id}
          userId={issues[i].userId}
          title={issues[i].title}
          des={issues[i].description}
          commentsCount={issues[i].commentsCount}
          labels={issues[i].labels}
          upVoteCount={issues[i].upVoteCount}
          downVoteCount={issues[i].downVoteCount}
          date={issues[i].date}
          key={issues[i].id}
        />
      );
  }

  useEffect(function () {
    // (async function getData() {
    //   const res = await fetch("http://localhost:3000/issues", {
    //     method: "GET",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json;charset=utf-8",
    //     },
    //   });
    //   const data = await res.json();
    //   console.log(data);
    // })();

    ajax("http://localhost:3000/issues")
      .pipe(map((value) => value.response))
      .subscribe((value: any) => {
        // console.log(value);
        // dispatch(issuesActions.getIssues(value));
        mostVotes = [...value];
        mostComments = [...value];
        date = [...value];

        mostVotes.sort(function (a: any, b: any) {
          return (
            b.upVoteCount - b.downVoteCount - (a.upVoteCount - a.downVoteCount)
          );
        });

        mostComments.sort(function (a: any, b: any) {
          return b.commentsCount - a.commentsCount;
        });

        date.sort(function (a: any, b: any) {
          return a.date - b.date;
        });

        setSortType("most-votes");
      });
  }, []);

  return (
    <div className={styles["main-cont"]}>
      <IssuesHeader setSortType={setSortType} count={arr.length} />
      {arr}
    </div>
  );
};

let mostVotes: any[], mostComments: any[], date: any[];
export default IssuesMain;

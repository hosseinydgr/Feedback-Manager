import { lazy, Suspense, useEffect, useRef, useState } from "react";
import IssuesIssue from "./IssuesIssue";
import styles from "./IssuesMain.module.scss";
import { useDispatch, useSelector } from "react-redux/es/exports";
import IssuesHeader from "./IssuesHeader";

const IssuesMain: React.FC = (props) => {
  const dispatch = useDispatch();
  const issues: any = useSelector((state: any) => state.issues);
  const [sortType, setSortType] = useState("most-votes");
  const activeLabel = useSelector((state: any) => state.labels.activeLabel);
  const [issuesToShow, setIssuesToShow] = useState([]);

  useEffect(
    function () {
      let arr: any = [...issuesToShow];
      if (sortType === "") arr = [];
      else if (sortType === "most-votes") {
        arr.sort(function (a: any, b: any) {
          return (
            b.props.upVoteCount -
            b.props.downVoteCount -
            (a.props.upVoteCount - a.props.downVoteCount)
          );
        });
      } else if (sortType === "most-comments") {
        arr.sort(function (a: any, b: any) {
          return b.props.commentsCount - a.props.commentsCount;
        });
      } else if (sortType === "date") {
        arr.sort(function (a: any, b: any) {
          return (
            new Date(b.props.date).getTime() - new Date(a.props.date).getTime()
          );
        });
      }
      setIssuesToShow(arr);
    },
    [sortType]
  );

  useEffect(
    function () {
      const arr: any = [];
      // console.log(issues);
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

      if (sortType === "most-votes") {
        arr.sort(function (a: any, b: any) {
          return (
            b.props.upVoteCount -
            b.props.downVoteCount -
            (a.props.upVoteCount - a.props.downVoteCount)
          );
        });
      } else if (sortType === "most-comments") {
        arr.sort(function (a: any, b: any) {
          return b.props.commentsCount - a.props.commentsCount;
        });
      } else if (sortType === "date") {
        arr.sort(function (a: any, b: any) {
          return (
            new Date(b.props.date).getTime() - new Date(a.props.date).getTime()
          );
        });
      }

      // console.log(arr);
      setIssuesToShow(arr);
    },
    [issues, activeLabel]
  );

  return (
    <div className={styles["main-cont"]}>
      <IssuesHeader setSortType={setSortType} count={issuesToShow.length} />
      {issuesToShow.length === 0 ? <h2>Loading ...</h2> : issuesToShow}
    </div>
  );
};

export default IssuesMain;

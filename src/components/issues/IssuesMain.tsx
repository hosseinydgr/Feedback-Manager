import { lazy, Suspense, useEffect, useRef, useState } from "react";
import IssuesIssue from "./IssuesIssue";
import styles from "./IssuesMain.module.scss";
import { useDispatch, useSelector } from "react-redux/es/exports";
import IssuesHeader from "./IssuesHeader";
import { issuesActions } from "../../store/issues";

const IssuesMain: React.FC = (props) => {
  const dispatch = useDispatch();
  const issues: any = useSelector((state: any) => state.issues.issues);
  const loading = useSelector((state: any) => state.issues.loading);
  const activeLabel = useSelector((state: any) => state.labels.activeLabel);
  const [sortType, setSortType] = useState("Date-ASC");
  const [issuesToShow, setIssuesToShow] = useState([]);
  const time = useRef(1);
  const sortQuery = useRef("Date-ASC");

  // console.log(issues);
  useEffect(function () {
    if (issues.length === 0)
      dispatch({
        type: "getIssues",
        payload: { offset: 0, sortBy: "Date", sortType: "ASC" },
      });
    window.addEventListener("scroll", scrollHandler);
  }, []);

  function scrollHandler() {
    if (time.current <= 1) {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1
      ) {
        console.log(sortQuery.current);
        dispatch(issuesActions.setLoading("loadMore"));
        dispatch({
          type: "updateIssues",
          payload: {
            offset: time.current * 20,
            sortBy: sortQuery.current.split("-")[0],
            sortType: sortQuery.current.split("-")[1],
          },
        });
        console.log(time.current);
        time.current++;
      }
    }
  }

  useEffect(
    function () {
      dispatch(issuesActions.setLoading("true"));
      dispatch({
        type: "getIssues",
        payload: {
          offset: 0,
          sortBy: sortType.split("-")[0],
          sortType: sortType.split("-")[1],
        },
      });
      time.current = 1;
      sortQuery.current = sortType;
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

      // console.log(arr);
      setIssuesToShow(arr);
    },
    [issues, activeLabel]
  );

  return (
    <div className={styles["main-cont"]}>
      <IssuesHeader setSortType={setSortType} count={issuesToShow.length} />
      {loading === "true" ? (
        <div className={styles.loading}></div>
      ) : (
        <>
          {issuesToShow}
          {loading === "loadMore" && <div className={styles.loading}></div>}
        </>
      )}
    </div>
  );
};

export default IssuesMain;

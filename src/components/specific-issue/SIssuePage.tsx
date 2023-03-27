import { useSelector } from "react-redux";
import IssuesIssue from "../issues/IssuesIssue";
import SIssueAddComment from "./SIssueAddComment";
import SIssueCommentsCont from "./SIssueCommentsCont";
import SIssueHeader from "./SIssueHeader";
import styles from "./SIssuePage.module.scss";
import Header from "../Header";

const SIssuePage: React.FC = (props) => {
  const issue = useSelector((state: any) => state.activeIssue);

  return (
    <>
      <Header />
      <div className={styles["main-cont"]}>
        <SIssueHeader id={issue.id} />
        <IssuesIssue
          id={issue.id}
          userId={issue.userId}
          title={issue.title}
          des={issue.des}
          commentsCount={issue.commentsCount}
          labels={issue.labels}
          upVoteCount={issue.upVoteCount}
          downVoteCount={issue.downVoteCount}
          date={issue.date}
        />
        <SIssueCommentsCont id={issue.id} />
        <SIssueAddComment id={issue.id} />
      </div>
    </>
  );
};

export default SIssuePage;

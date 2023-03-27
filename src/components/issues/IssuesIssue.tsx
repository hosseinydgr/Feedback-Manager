import { useDispatch, useSelector } from "react-redux";
import { acitveIssueActions } from "../../store/active-issue";
import Label from "../Label";
import Upvote from "../Upvote";
import styles from "./IssuesIssue.module.scss";
import { useNavigate } from "react-router-dom";

const IssuesIssue: React.FC<{
  id: string;
  userId?: string;
  title: string;
  des: string;
  commentsCount: number;
  labels: string[];
  upVoteCount: number;
  downVoteCount: number;
  date: number;
}> = (props) => {
  const allLabelss = useSelector((state: any) => state.labels.allLabels);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const arr = [];

  for (let i = 0; i < props.labels.length; i++) {
    for (let j = 0; j < allLabelss.length; j++) {
      if (props.labels[i] === allLabelss[j].id) {
        arr.push(
          <Label
            id={allLabelss[j].id}
            color={allLabelss[j].color}
            key={allLabelss[j].id}
          >
            {allLabelss[j].name}
          </Label>
        );
        break;
      }
    }
  }

  function goToIssuePage() {
    dispatch(
      acitveIssueActions.setActiveIssue({
        id: props.id,
        userId: props.userId,
        title: props.title,
        des: props.des,
        commentsCount: props.commentsCount,
        labels: props.labels,
        upVoteCount: props.upVoteCount,
        downVoteCount: props.downVoteCount,
        date: props.date,
      })
    );
    navigate(`/issues/${props.id}`);
  }

  return (
    <>
      <div className={styles["main-cont"]}>
        <div className={styles["flex-cont-content"]}>
          <Upvote id={props.id}>
            {String(props.upVoteCount - props.downVoteCount)}
          </Upvote>

          <div className={styles.content}>
            <h3 onClick={goToIssuePage} className={styles.title}>
              {props.title}
            </h3>
            <p className={styles.description}>{props.des}</p>
            {arr}
          </div>
        </div>

        <div className={styles["flex-cont"]}>
          <img
            src="../Assets/comment-icon.png"
            className={styles["comment-icon"]}
          />
          <p>{props.commentsCount}</p>
        </div>
      </div>

      <div className={styles["mobile-main-cont"]}>
        <h3 onClick={goToIssuePage} className={styles.title}>
          {props.title}
        </h3>
        <p className={styles.description}>{props.des}</p>
        <div className={styles["mobile-labels-cont"]}>{arr}</div>

        <div className={styles["mobile-flex-cont"]}>
          <Upvote id={props.id}>
            {String(props.upVoteCount - props.downVoteCount)}
          </Upvote>

          <div className={styles["flex-cont"]}>
            <img
              src="../Assets/comment-icon.png"
              className={styles["comment-icon"]}
            />
            <p>{props.commentsCount}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssuesIssue;

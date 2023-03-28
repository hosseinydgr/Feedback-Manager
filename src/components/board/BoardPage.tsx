import { useState } from "react";
import { useSelector } from "react-redux";
import BoardHeader from "./BoardHeader";
import BoardIssue from "./BoardIssue";
import styles from "./BoardPage.module.scss";

const BoardPage: React.FC = function () {
  const issues = useSelector((state: any) => state.issues);
  const [activeCategory, setActiveCategory] = useState("1");
  console.log(issues);

  const arr1: any[] = [];
  const arr2: any[] = [];
  const arr3: any[] = [];

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].status === "Pending") {
      arr1.push(
        <BoardIssue
          id={issues[i].id}
          userId={issues[i].userId}
          title={issues[i].title}
          des={issues[i].description}
          commentsCount={issues[i].commentsCount}
          labels={issues[i].labels}
          upVoteCount={issues[i].upVoteCount}
          downVoteCount={issues[i].downVoteCount}
          date={issues[i].date}
          color="orange"
          status="Pending"
          key={issues[i].id}
        />
      );
    } else if (issues[i].status === "InProgress") {
      arr2.push(
        <BoardIssue
          id={issues[i].id}
          userId={issues[i].userId}
          title={issues[i].title}
          des={issues[i].description}
          commentsCount={issues[i].commentsCount}
          labels={issues[i].labels}
          upVoteCount={issues[i].upVoteCount}
          downVoteCount={issues[i].downVoteCount}
          date={issues[i].date}
          color="purple"
          status="In-Progress"
          key={issues[i].id}
        />
      );
    } else {
      arr3.push(
        <BoardIssue
          id={issues[i].id}
          userId={issues[i].userId}
          title={issues[i].title}
          des={issues[i].description}
          commentsCount={issues[i].commentsCount}
          labels={issues[i].labels}
          upVoteCount={issues[i].upVoteCount}
          downVoteCount={issues[i].downVoteCount}
          date={issues[i].date}
          color="blue"
          status="Done"
          key={issues[i].id}
        />
      );
    }
  }

  function changeCategoryHandler(e: any) {
    if (e.target.id) {
      setActiveCategory(e.target.id);
    }
  }

  return (
    <div className={styles["main-cont"]}>
      <BoardHeader />
      <div className={styles["content-cont"]}>
        <div className={styles.category}>
          <h3>{`Pending(${arr1.length})`}</h3>
          <div>{arr1}</div>
        </div>

        <div className={styles.category}>
          <h3>{`In-Progress(${arr2.length})`}</h3>
          <div>{arr2}</div>
        </div>

        <div className={styles.category}>
          <h3>{`Done(${arr3.length})`}</h3>
          <div>{arr3}</div>
        </div>
      </div>

      <div className={styles["content-cont-mobile"]}>
        <div
          className={styles["categories-mobile"]}
          onClick={changeCategoryHandler}
        >
          <p
            id="1"
            className={`${styles["pending-mobile"]} ${
              activeCategory === "1" ? styles.active : ""
            }`}
          >{`Pending(${arr1.length})`}</p>
          <p
            id="2"
            className={`${styles["in-progress-mobile"]} ${
              activeCategory === "2" ? styles.active : ""
            }`}
          >{`In-Progress(${arr2.length})`}</p>
          <p
            id="3"
            className={`${styles["done-mobile"]} ${
              activeCategory === "3" ? styles.active : ""
            }`}
          >{`Done(${arr3.length})`}</p>
        </div>

        <div className={styles["issues-cont-mobile"]}>
          {activeCategory === "1" ? arr1 : activeCategory === "2" ? arr2 : arr3}
        </div>
      </div>
    </div>
  );
};

export default BoardPage;

import { useSelector } from "react-redux";
import IssuesIssue from "../issues/IssuesIssue";
import SIssueAddComment from "./SIssueAddComment";
import SIssueCommentsCont from "./SIssueCommentsCont";
import SIssueHeader from "./SIssueHeader";
import styles from "./SIssuePage.module.scss";
import Header from "../Header";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const SIssuePage: React.FC = (props) => {
  let issueId = useSelector((state: any) => state.activeIssue.id);
  const allIssues = useSelector((state: any) => state.issues);
  const params = useParams();
  let files: any;
  let setFiles: any;
  [files, setFiles] = useState([]);
  const [modal, setModal] = useState({ src: "", show: false });

  useEffect(function () {
    (async function getFiles() {
      const res = await fetch(`http://localhost:3000/issues/${issueId}/files`, {
        credentials: "include",
      });
      const data = await res.json();
      setFiles(data);
      // console.log(res);
      console.log(data);
    })();
  }, []);

  async function downloader(e: any) {
    const url =
      e.target.src === undefined ? e.target.dataset.src : e.target.src;
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.blob();
    let blobUrl = window.URL.createObjectURL(data);
    let a = document.createElement("a");
    a.download = e.target.dataset.name;
    a.href = blobUrl;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function openImgModal(e: any) {
    setModal({ src: e.target.dataset.src, show: true });
  }

  function closeImgModal() {
    setModal({ ...modal, show: false });
  }

  const arr = [];

  for (let file of files) {
    if (file.mimeType.split("/")[0] === "image") {
      arr.push(
        <div key={file.id} className={styles["file-div"]}>
          <img
            src={file.path}
            data-name={file.name}
            className={styles["image-file"]}
            onClick={downloader}
          />
          <p>{file.name}</p>
          <p>{`${file.size} KB`}</p>
          <button
            className={styles["view-img-btn"]}
            onClick={openImgModal}
            data-src={file.path}
          >
            View
          </button>
        </div>
      );
    } else if (file.mimeType.split("/")[0] === "text") {
      arr.push(
        <div key={file.id} className={styles["file-div"]}>
          <p
            data-src={file.path}
            data-name={file.name}
            className={styles["other-files"]}
            onClick={downloader}
          >
            Text File
          </p>
          <p>{file.name}</p>
          <p>{`${file.size} KB`}</p>
        </div>
      );
    } else if (file.mimeType.split("/")[0] === "application") {
      arr.push(
        <div key={file.id} className={styles["file-div"]}>
          <a href={file.path} target="_blank" className={styles["other-files"]}>
            Zip File
          </a>
          <p>{file.name}</p>
          <p>{`${file.size} KB`}</p>
        </div>
      );
    }
  }

  if (issueId === undefined) issueId = params.issueId;
  // console.log(allIssues);
  // console.log(issueId);

  let issue;
  if (allIssues.length !== 0)
    issue = allIssues.filter((item: any) => item.id == issueId)[0];
  // console.log(issue);

  return (
    <>
      {issue === undefined ? (
        <div className={styles.loading}></div>
      ) : (
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
            {arr.length === 0 || (
              <div className={styles["files-cont"]}>{arr}</div>
            )}
            <SIssueCommentsCont id={issue.id} />
            <SIssueAddComment
              id={issue.id}
              commentsCount={issue.commentsCount}
            />
          </div>
        </>
      )}
      <div
        className={styles.overlay}
        style={{ display: !modal.show ? "none" : "" }}
      >
        <img
          src="../Assets/multiply-icon.png"
          className={styles["multiply-icon"]}
          onClick={closeImgModal}
        />
        <img src={modal.src} className={styles["img-view"]} />
      </div>
    </>
  );
};

export default SIssuePage;

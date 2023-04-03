import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadProgressActions } from "../../store/upload-progress";
import { uploadedFilesActions } from "../../store/uploaded-files";
import styles from "./NewIssue.module.scss";
import NewIssuesLabelsCont from "./NewIssueLabelsCont";
import UploadProgressCont from "./UploadProgressCont";
import { Link, useNavigate } from "react-router-dom";
import { issuesActions } from "../../store/issues";
import { activeFileActions } from "../../store/active-files";

const NewIssue: React.FC = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [type, setType] = useState("");
  const [activeLabels, setActiveLabels] = useState<any>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const myRef: any = useRef();
  const upload = useSelector((state: any) => state.uploadProgress);
  const files = useSelector((state: any) => state.uploadFiles);
  const uploadedFiles = useSelector((state: any) => state.activeFiles);
  const navigate = useNavigate();

  useEffect(function () {
    dispatch(activeFileActions.clear());
  }, []);

  function titleChangeHandler(e: any) {
    setTitle(e.target.value);
  }

  function desChangeHandler(e: any) {
    setDes(e.target.value);
  }

  function typeChangeHandler(e: any) {
    // console.log(e.target.value);
    setType(e.target.value);
  }

  function submitHandler(e: any) {
    e.preventDefault();
    if (!loading) {
      // console.log(activeLabels);
      setLoading(true);
      setTimeout(
        () =>
          (async function postData() {
            try {
              const res = await fetch("http://localhost:3000/issues", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                  title: title,
                  description: des,
                  type: type,
                  labelIds: [...activeLabels],
                  fileIds: [...uploadedFiles],
                }),
              });
              const data = await res.json();
              // console.log(data, res);
              if (res.ok) {
                navigate("/issues");
                window.location.reload();
              } else throw new Error(data.message);
            } catch (err: any) {
              setError(err.message);
              setTimeout(() => setError(""), 3000);
            }
            setLoading(false);
          })(),
        1
      );
    }
  }

  function fileUploadHandler(e: any) {
    // console.log(e.target.files);
    dispatch(uploadedFilesActions.setFiles(e.target.files));
    dispatch({ type: "uploadFiles", files: e.target.files });
  }

  function addFiles() {
    dispatch(uploadedFilesActions.setFiles([]));
    dispatch(uploadProgressActions.resetUpload());
    dispatch(activeFileActions.clear());
    myRef.current.click();
  }

  return (
    <div className={styles["main-cont"]}>
      <form onSubmit={submitHandler}>
        {error !== "" ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <div className={styles.placeholder}></div>
        )}
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={titleChangeHandler}
          required
        />
        <label htmlFor="des" className={styles["margin-top"]}>
          Description
        </label>
        <textarea id="des" value={des} onChange={desChangeHandler} required />

        <label htmlFor="type" className={styles["margin-top"]}>
          Type
        </label>
        <select onInput={typeChangeHandler} required value={type}>
          <option disabled hidden value="">
            -- select an option --
          </option>
          <option>Bug</option>
          <option>Suggestion</option>
        </select>
        <NewIssuesLabelsCont
          activeLabels={activeLabels}
          setActiveLabels={setActiveLabels}
        />

        <div className={styles["files-cont"]}>
          <input
            type="file"
            multiple
            onChange={fileUploadHandler}
            ref={myRef}
            style={{ display: "none" }}
          />
          <div onClick={addFiles} className={styles["add-files"]}>
            Click here to add files
          </div>

          <UploadProgressCont files={files} upload={upload} />
        </div>

        <button
          type="submit"
          className={`${styles["submit-btn"]} ${
            loading ? styles.inactive : ""
          }`}
        >
          {loading ? <div className={styles.loading}></div> : "Add Issue"}
        </button>
      </form>

      <Link to="/issues">
        <p className={styles["go-to-issues"]}>Get back to issues page</p>
      </Link>
    </div>
  );
};
export default NewIssue;

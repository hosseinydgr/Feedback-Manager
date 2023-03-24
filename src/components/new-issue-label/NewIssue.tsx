import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../../store/page";
import { uploadProgressActions } from "../../store/upload-progress";
import { uploadedFilesActions } from "../../store/uploaded-files";
import styles from "./NewIssue.module.scss";
import NewIssuesLabelsCont from "./NewIssueLabelsCont";
import UploadProgressCont from "./UploadProgressCont";

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
                  // fieldIds: [],
                }),
              });
              const data = await res.json();
              // console.log(data, res);
              if (res.ok) {
                dispatch(pageActions.changePage(1));
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

  function goToIssues() {
    dispatch(pageActions.changePage(1));
  }

  async function fileHandler(e: any) {
    e.preventDefault();
    // console.log(files);
    dispatch({ type: "uploadFiles", files: files });
  }

  function fileUploadHandler(e: any) {
    // console.log(e.target.files);
    dispatch(uploadedFilesActions.setFiles(e.target.files));
  }

  function addFiles() {
    dispatch(uploadedFilesActions.setFiles([]));
    dispatch(uploadProgressActions.resetUpload());
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

          <button onClick={fileHandler} className={styles["send-files-btn"]}>
            Send Files
          </button>
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

      <p className={styles["go-to-issues"]} onClick={goToIssues}>
        Get back to issues page
      </p>
    </div>
  );
};
export default NewIssue;

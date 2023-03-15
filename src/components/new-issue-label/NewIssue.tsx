import { useState } from "react";
import { useDispatch } from "react-redux";
import { pageActions } from "../../store/page";
import styles from "./NewIssue.module.scss";
import NewIssuesLabelsCont from "./NewIssueLabelsCont";

const NewIssue: React.FC = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [type, setType] = useState("");
  const [activeLabels, setActiveLabels] = useState<any>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState(0);

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
    console.log(e.target.files[0]);
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = function (event) {
      setUpload((event.loaded / event.total) * 100);
      console.log(`Uploaded ${event.loaded} of ${event.total}`);
    };

    // track completion: both successful or not
    xhr.onloadend = function () {
      if (xhr.status == 200) {
        console.log("success");
      } else {
        console.log("error " + this.status);
      }
    };

    xhr.open("POST", "http://localhost:3000/files/upload");
    xhr.send(e.target.files[0]);

    // const res = await fetch("http://localhost:3000/files/upload", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json;charset=utf-8",
    //   },
    //   body: `key=${e.target.files[0]}`,
    // });
    // const data = await res.json();
    // console.log(res, data);
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
        <input type="file" multiple onChange={fileHandler} />
        <div
          className={styles.upload}
          style={{
            background: `linear-gradient(90deg, red 0 ${upload}%, white ${upload}% 100%)`,
          }}
        ></div>

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

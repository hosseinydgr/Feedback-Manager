import styles from "./UploadProgress.module.scss";

const UploadProgress: React.FC<{ name: string; type: string; upload: any }> =
  function (props) {
    let content;
    if (props.upload === undefined) {
      content = (
        <div
          className={styles.upload}
          style={{
            background: "white",
          }}
        ></div>
      );
    } else if (props.upload !== "true" && props.upload !== "false") {
      content = (
        <div
          className={styles.upload}
          style={{
            background: `linear-gradient(90deg, #00dd00 0 ${props.upload}%, white ${props.upload}% 100%)`,
          }}
        ></div>
      );
    } else if (props.upload === "true") {
      content = <p className={styles.success}>Successfully Sent</p>;
    } else {
      content = <p className={styles.error}>an Error Occurred</p>;
    }

    return (
      <div className={styles["main-cont"]}>
        <p>
          {props.name} ({props.type})
        </p>
        {content}
      </div>
    );
  };

export default UploadProgress;

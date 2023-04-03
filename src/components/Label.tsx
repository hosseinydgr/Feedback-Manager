import { useSelector } from "react-redux";
import styles from "./Label.module.scss";

const Label: React.FC<{
  children: string;
  id: string;
  color: number;
  issueId: string;
}> = (props) => {
  const isAdmin = useSelector((state: any) => state.auth.isAdmin);

  function deleteHandler() {
    (async function postData() {
      const res = await fetch(
        `http://localhost:3000/issues/${props.issueId}/labels`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ labelIds: [String(props.id)] }),
        }
      );
      console.log({ labelIds: [String(props.id)] });
      const data = await res.json();
      console.log(data);
    })();
  }

  return (
    <div
      id={props.id}
      className={styles["main-cont"]}
      style={{ color: `#${props.color}` }}
    >
      {props.children}
      {isAdmin && (
        <div className={styles.delete} onClick={deleteHandler}>
          <img src="../Assets/multiply-icon.png" />
        </div>
      )}
    </div>
  );
};

export default Label;

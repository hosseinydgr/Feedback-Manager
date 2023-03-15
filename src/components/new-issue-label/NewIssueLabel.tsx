import styles from "./NewIssueLabel.module.scss";

const NewIssueLabel: React.FC<{
  children: string;
  id: string;
  color: number;
  active: boolean;
  removeLabel: any;
  addLabel: any;
}> = (props) => {
  function clickHandler() {
    if (props.active) props.removeLabel(props.id);
    else props.addLabel(props.id);
  }

  return (
    <div
      id={props.id}
      className={`${styles["main-cont"]} ${props.active ? styles.active : ""}`}
      style={{ color: `#${props.color}` }}
      onClick={clickHandler}
    >
      {props.children}
    </div>
  );
};

export default NewIssueLabel;

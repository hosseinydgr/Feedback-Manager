import { useDispatch, useSelector } from "react-redux";
import { labelsActions } from "../../store/labels";
import styles from "./IssuesLabel.module.scss";

const IssuesLabel: React.FC<{ children: string; id: string; color: number }> = (
  props
) => {
  const dispatch = useDispatch();
  const activeLabel = useSelector((state: any) => state.labels.activeLabel);

  function clickHandler() {
    dispatch(labelsActions.setActiveLabel(props.id));
  }

  return (
    <div
      id={props.id}
      className={`${styles["main-cont"]} ${
        props.id === activeLabel ? styles.active : ""
      }`}
      style={{ color: `#${props.color}` }}
      onClick={clickHandler}
    >
      {props.children}
    </div>
  );
};

export default IssuesLabel;

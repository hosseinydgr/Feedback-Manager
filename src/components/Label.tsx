import styles from "./Label.module.scss";

const Label: React.FC<{ children: string; id: string; color: number }> = (
  props
) => {
  return (
    <div
      id={props.id}
      className={styles["main-cont"]}
      style={{ color: `#${props.color}` }}
    >
      {props.children}
    </div>
  );
};

export default Label;

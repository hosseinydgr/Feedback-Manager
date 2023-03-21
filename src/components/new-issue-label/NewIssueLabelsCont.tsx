import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import NewIssueLabel from "./NewIssueLabel";
import styles from "./NewIssuesLabelsCont.module.scss";

const NewIssuesLabelsCont: React.FC<{
  activeLabels: any;
  setActiveLabels: any;
}> = (props) => {
  const labels = useSelector((state: any) => state.labels.allLabels);
  // console.log(labels);

  function removeLabel(id: string) {
    const newState = [...props.activeLabels];
    newState.splice(newState.indexOf(id), 1);
    props.setActiveLabels(newState);
  }

  function addLabel(id: string) {
    const newState = [...props.activeLabels];
    newState.push(id);
    props.setActiveLabels(newState);
  }

  const labelsToShow = labels.map((item: any) => (
    <NewIssueLabel
      id={item.id}
      color={item.color}
      active={props.activeLabels.includes(item.id)}
      key={item.id}
      removeLabel={removeLabel}
      addLabel={addLabel}
    >
      {item.name}
    </NewIssueLabel>
  ));

  return <div className={styles["main-cont"]}>{labelsToShow}</div>;
};

export default NewIssuesLabelsCont;

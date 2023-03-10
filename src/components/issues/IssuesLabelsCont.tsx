import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";
import { labelsActions } from "../../store/labels";
import IssuesLabel from "./IssuesLabel";
import styles from "./IssuesLabelsCont.module.scss";

const IssuesLabelsCont: React.FC = (props) => {
  const dispatch = useDispatch();
  const labels = useSelector((state: any) => state.labels.allLabels);

  const labelsToShow = labels.map((item: any) => (
    <IssuesLabel id={item.id} color={item.color} key={item.id}>
      {item.name}
    </IssuesLabel>
  ));
  labelsToShow.unshift(
    <IssuesLabel id="" color={0} key={0}>
      All
    </IssuesLabel>
  );
  // console.log(labels);

  useEffect(function () {
    ajax("http://localhost:3000/labels")
      .pipe(map((value) => value.response))
      .subscribe((value: any) => {
        dispatch(labelsActions.setLabels(value));
      });
  }, []);

  return <div className={styles["main-cont"]}>{labelsToShow}</div>;
};

export default IssuesLabelsCont;

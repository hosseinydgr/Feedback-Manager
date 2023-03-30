import { useSelector } from "react-redux";
import IssuesLabel from "./IssuesLabel";
import styles from "./IssuesLabelsCont.module.scss";

const IssuesLabelsCont: React.FC = (props) => {
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

  return (
    <div className={styles["main-cont"]}>
      {labelsToShow.length <= 1 ? (
        <div className={styles.loading}></div>
      ) : (
        labelsToShow
      )}
    </div>
  );
};

export default IssuesLabelsCont;

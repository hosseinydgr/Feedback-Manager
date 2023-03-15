import { useDispatch } from "react-redux";
import { pageActions } from "../../store/page";
import styles from "./SIssueHeader.module.scss";

const SIssueHeader: React.FC = (props) => {
  const dispatch = useDispatch();

  function goBack() {
    dispatch(pageActions.changePage(1));
  }

  return (
    <div className={styles["main-cont"]}>
      <p onClick={goBack}> &lt; Go Back</p>
      <button>Edit Feedback</button>
    </div>
  );
};

export default SIssueHeader;

import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../../store/page";
import styles from "./SIssueHeader.module.scss";

const SIssueHeader: React.FC = (props) => {
  const dispatch = useDispatch();
  const isIn = useSelector((state: any) => state.auth.isIn);

  function goBack() {
    dispatch(pageActions.changePage(1));
  }

  function goToEditPage() {
    if (isIn) {
      dispatch(pageActions.changePage(7));
    } else {
      dispatch(pageActions.changePage(2));
      dispatch(pageActions.setNextPage(7));
    }
  }

  return (
    <div className={styles["main-cont"]}>
      <p onClick={goBack}> &lt; Go Back</p>
      <button onClick={goToEditPage}>Edit Feedback</button>
    </div>
  );
};

export default SIssueHeader;

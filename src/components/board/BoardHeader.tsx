import styles from "./BoardHeader.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../../store/page";

const BoardHeader: React.FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isIn = useSelector((state: any) => state.auth.isIn);

  function addFeedbackHandler() {
    if (!isIn) {
      navigate("/login");
      dispatch(pageActions.setNextPage("/issues/new"));
    } else navigate("/issues/new");
  }

  return (
    <div className={styles["main-cont"]}>
      <div>
        <Link to="/issues">
          <p className={styles["go-back"]}> &lt; Go Back</p>
        </Link>
        <h2>Roadmap</h2>
      </div>
      <button className={styles.btn} onClick={addFeedbackHandler}>
        + Add Feedback
      </button>
    </div>
  );
};

export default BoardHeader;

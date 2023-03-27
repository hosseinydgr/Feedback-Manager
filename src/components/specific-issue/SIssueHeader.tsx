import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../../store/page";
import styles from "./SIssueHeader.module.scss";
import { Link, useNavigate } from "react-router-dom";

const SIssueHeader: React.FC<{ id: string }> = (props) => {
  const dispatch = useDispatch();
  const isIn = useSelector((state: any) => state.auth.isIn);
  const navigate = useNavigate();

  function goToEditPage() {
    if (isIn) {
      navigate("edit");
    } else {
      navigate("/login");
      dispatch(pageActions.setNextPage(`/issues/${props.id}/edit`));
    }
  }

  return (
    <div className={styles["main-cont"]}>
      <Link to="/issues">
        <p> &lt; Go Back</p>
      </Link>
      <button onClick={goToEditPage}>Edit Feedback</button>
    </div>
  );
};

export default SIssueHeader;

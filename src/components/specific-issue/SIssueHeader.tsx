import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../../store/page";
import styles from "./SIssueHeader.module.scss";
import { Link, useNavigate } from "react-router-dom";

const SIssueHeader: React.FC<{ id: string }> = (props) => {
  const dispatch = useDispatch();
  const isIn = useSelector((state: any) => state.auth.isIn);
  const isAdmin = useSelector((state: any) => state.auth.isAdmin);
  const deleteState = useSelector((state: any) => state.deleteIssue);

  const navigate = useNavigate();

  function goToEditPage() {
    if (isIn) {
      navigate("edit");
    } else {
      navigate("/login");
      dispatch(pageActions.setNextPage(`/issues/${props.id}/edit`));
    }
  }

  async function deleteHandler() {
    dispatch({ type: "deleteIssue", payload: { id: props.id } });
  }

  return (
    <div className={styles["main-cont"]}>
      <Link to="/issues">
        <p> &lt; Go Back</p>
      </Link>
      <div className={styles["btns-cont"]}>
        <button onClick={goToEditPage}>Edit Feedback</button>
        {isAdmin && (
          <>
            <button className={styles["delete-btn"]} onClick={deleteHandler}>
              Delete
            </button>
            {deleteState.error !== "" ? (
              <p className={styles.error}>{deleteState.error}</p>
            ) : (
              <div className={styles.placeholder}></div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SIssueHeader;

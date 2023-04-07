import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import styles from "./UserControls.module.scss";

const UserControls: React.FC<{ closeFunction: any; openModal: any }> =
  function (props) {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.user);

    function signOutHandler() {
      dispatch(authActions.signOut());
      localStorage.setItem("user", "");
    }

    function closeControls() {
      props.closeFunction(false);
      document.body.style.overflowY = "unset";
    }

    function openModal() {
      props.closeFunction(false);
      props.openModal(true);
    }

    return (
      <>
        <div className={styles["main-cont"]}>
          <div className={styles.info}>
            <div>
              <h3>{user.name}</h3>
            </div>
            <img
              src="../Assets/multiply-icon-white.png"
              onClick={closeControls}
            />
          </div>

          <div className={styles.tabs}>
            <div className={styles["flex-cont"]} onClick={openModal}>
              <p>Change My Info</p>
              <img src="../Assets/info-icon.png" />
            </div>

            <p className={styles["sign-out"]} onClick={signOutHandler}>
              Sign Out
            </p>
          </div>
        </div>

        <div className={styles.overlay} onClick={closeControls}></div>
      </>
    );
  };

export default UserControls;

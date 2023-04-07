import { useDispatch, useSelector } from "react-redux";
import styles from "./ChangeUserInfo.module.scss";
import { useState } from "react";
import { authActions } from "../store/auth";

const ChangeUserInfo: React.FC<{ closeFunction: any }> = function (props) {
  const user = useSelector((state: any) => state.auth.user);
  const [name, setName] = useState(user.name);
  const [email, setemail] = useState(user.email);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function nameChangeHandler(e: any) {
    setName(e.target.value);
  }

  function emailChangeHandler(e: any) {
    setemail(e.target.value);
    console.log(+`0x${e.target.value.substring(1)}`);
  }

  function closeModal() {
    props.closeFunction(false);
    document.body.style.overflowY = "unset";
  }

  function submitHandler(e: any) {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      setTimeout(
        () =>
          (async function postData() {
            try {
              const res = await fetch(
                `http://localhost:3000/users/${user.id}`,
                {
                  method: "PATCH",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json;charset=utf-8",
                  },
                  body: JSON.stringify({
                    name: name,
                    email: email,
                  }),
                }
              );
              const data = await res.json();
              console.log(data);
              if (res.ok) {
                dispatch(authActions.updateInfo({ name: name, email: email }));
                closeModal();
              } else throw new Error(data.message);
            } catch (err: any) {
              setError(err.message);
              setTimeout(() => setError(""), 3000);
            }
            setLoading(false);
          })(),
        1
      );
    }
  }

  return (
    <>
      <div className={styles["main-cont"]}>
        <img
          src="../Assets/multiply-icon.png"
          className={styles["multiply-icon"]}
          onClick={closeModal}
        />

        <form onSubmit={submitHandler}>
          {error !== "" ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <div className={styles.placeholder}></div>
          )}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={nameChangeHandler}
            required
          />
          <label htmlFor="email" className={styles["margin-top"]}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
            required
          />
          <button
            type="submit"
            className={`${styles["submit-btn"]} ${
              loading ? styles.inactive : ""
            }`}
          >
            {loading ? <div className={styles.loading}></div> : "Change Info"}
          </button>
        </form>
      </div>
      <div className={styles.overlay} onClick={closeModal}></div>
    </>
  );
};

export default ChangeUserInfo;

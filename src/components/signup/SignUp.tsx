import { useDispatch } from "react-redux";
import { pageActions } from "../../store/page";
import styles from "./SignUp.module.scss";
import { useState } from "react";
import { authActions } from "../../store/auth";

const SignUp: React.FC = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function nameChangeHandler(e: any) {
    setName(e.target.value);
  }

  function emailChangeHandler(e: any) {
    setEmail(e.target.value);
  }

  function passwordChangeHandler(e: any) {
    setPassword(e.target.value);
  }

  function submitHandler(e: any) {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      setTimeout(
        () =>
          (async function postData() {
            try {
              const res = await fetch("http://localhost:3000/auth/signup", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                  name: name,
                  email: email,
                  password: password,
                }),
              });
              const data = await res.json();
              if (res.ok) {
                dispatch(pageActions.changePage(1));
                dispatch(
                  authActions.login({
                    id: data.userId,
                    name: name,
                    email: email,
                    verified: false,
                  })
                );
              } else {
                // console.log("hello");
                throw new Error(data.message);
              }
              console.log(data);
            } catch (err: any) {
              setError(err.message);
            }
            setLoading(false);
          })(),
        1
      );
    }
  }

  function switchPage() {
    dispatch(pageActions.changePage(2));
  }

  function goToIssues() {
    dispatch(pageActions.changePage(1));
  }

  function cancelError() {
    if (error !== "") {
      setError("");
    }
  }

  return (
    <div className={styles["main-cont"]}>
      <form onSubmit={submitHandler}>
        {error !== "" ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <div className={styles.placeholder}></div>
        )}
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameChangeHandler}
          onInput={cancelError}
          required
        />
        <label className={styles["margin-top"]} htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={emailChangeHandler}
          onInput={cancelError}
          required
        />
        <label className={styles["margin-top"]} htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={passwordChangeHandler}
          onInput={cancelError}
          required
        />
        <button
          className={`${styles["submit-btn"]} ${
            loading ? styles.inactive : ""
          }`}
          type="submit"
        >
          {loading ? <div className={styles.loading}></div> : "Sign Up"}
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <span className={styles["switch-page"]} onClick={switchPage}>
          Sign In
        </span>
      </p>
      <p className={styles["go-to-issues"]} onClick={goToIssues}>
        Get back to issues page
      </p>
    </div>
  );
};

export default SignUp;

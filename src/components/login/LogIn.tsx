import { useDispatch, useSelector } from "react-redux";
import styles from "./LogIn.module.scss";
import { pageActions } from "../../store/page";
// import { authActions } from "../../store/auth";
import { useState } from "react";
import { authActions } from "../../store/auth";
import { Link, useNavigate } from "react-router-dom";

const LogIn: React.FC = (props) => {
  const dispatch = useDispatch();
  const nextPage = useSelector((state: any) => state.page.nextPage);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function emailChangeHandler(e: any) {
    setEmail(e.target.value);
  }

  function passwordChangeHandler(e: any) {
    setPassword(e.target.value);
  }

  function cancelError() {
    if (error !== "") {
      setError("");
    }
  }

  async function submitHandler(e: any) {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      setTimeout(
        () =>
          (async function postData() {
            try {
              const res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ email: email, password: password }),
              });
              const data = await res.json();
              if (res.ok) {
                navigate(nextPage);
                dispatch(authActions.login(data));
                localStorage.setItem(
                  "user",
                  JSON.stringify({
                    id: data.id,
                    password: password,
                    email: email,
                  })
                );
              } else {
                throw new Error(data.message);
              }
              // console.log(res);
              console.log(data);
            } catch (err: any) {
              // console.log(err.message);
              setError(err.message);
            }
            setLoading(false);
          })(),
        1
      );
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className={styles.email}
          id="email"
          value={email}
          onChange={emailChangeHandler}
          onInput={cancelError}
          required
        />
        <label htmlFor="password" className={styles["margin-top"]}>
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
          type="submit"
          className={`${styles["submit-btn"]} ${
            loading ? styles.inactive : ""
          }`}
        >
          {loading ? <div className={styles.loading}></div> : "Sign In"}
        </button>
      </form>
      <p>
        Haven't an account?{" "}
        <Link to="/signup">
          <span className={styles["switch-page"]}>Sign Up</span>
        </Link>
      </p>
      <Link to="/issues">
        <p className={styles["go-to-order"]}>Get back to issues page</p>
      </Link>
    </div>
  );
};

export default LogIn;

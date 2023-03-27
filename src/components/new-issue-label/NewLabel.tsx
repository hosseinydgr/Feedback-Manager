import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./NewLabel.module.scss";
import { Link, useNavigate } from "react-router-dom";

const NewLabel: React.FC = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function nameChangeHandler(e: any) {
    setName(e.target.value);
  }

  function colorChangeHandler(e: any) {
    setColor(e.target.value);
  }

  function submitHandler(e: any) {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      setTimeout(
        () =>
          (async function postData() {
            try {
              const res = await fetch("http://localhost:3000/labels", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ name: name, color: Number(color) }),
              });
              const data = await res.json();
              if (res.ok) {
                navigate("/issues");
              } else throw new Error(data.message);
              // console.log(data);
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
    <div className={styles["main-cont"]}>
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
        <label htmlFor="color" className={styles["margin-top"]}>
          Color
        </label>
        <input
          type="text"
          id="color"
          value={color}
          onChange={colorChangeHandler}
          required
        />
        <button
          type="submit"
          className={`${styles["submit-btn"]} ${
            loading ? styles.inactive : ""
          }`}
        >
          {loading ? <div className={styles.loading}></div> : "Add Label"}
        </button>
      </form>

      <Link to="/issues">
        <p className={styles["go-to-issues"]}>Get back to issues page</p>
      </Link>
    </div>
  );
};

export default NewLabel;

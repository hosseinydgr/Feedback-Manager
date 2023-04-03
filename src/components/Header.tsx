import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { pageActions } from "../store/page";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

const Header: React.FC = (props) => {
  const isIn = useSelector((state: any) => state.auth.isIn);
  const isAdmin = useSelector((state: any) => state.auth.isAdmin);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let content;
  if (isIn) {
    content = (
      <button className={styles["action-btn"]} onClick={signOutHandler}>
        {user.name}
        {isAdmin && <p className={styles["admin-label"]}>&#9733;</p>}
      </button>
    );
  } else {
    content = (
      <button className={styles["action-btn"]} onClick={authPageOpener}>
        Sign In / Sign Up
      </button>
    );
  }

  function authPageOpener() {
    dispatch(pageActions.setNextPage("/issues"));
    navigate("/login");
  }

  function signOutHandler() {
    dispatch(authActions.signOut());
    localStorage.setItem("user", "");
  }

  return (
    <div className={styles["main-cont"]}>
      {content}
      <img
        src="../Assets/bale-logo.png"
        alt="bale-logo"
        className={styles["bale-logo"]}
      />
    </div>
  );
};

export default Header;

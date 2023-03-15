import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { pageActions } from "../store/page";
import styles from "./Header.module.scss";

const Header: React.FC = (props) => {
  const isIn = useSelector((state: any) => state.auth.isIn);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();

  let content;
  if (isIn) {
    content = (
      <button className={styles["action-btn"]} onClick={signOutHandler}>
        {user.name}
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
    dispatch(pageActions.setNextPage(1));
    dispatch(pageActions.changePage(2));
  }

  function signOutHandler() {
    dispatch(authActions.signOut());
    localStorage.setItem("user", "");
  }

  return <div className={styles["main-cont"]}>{content}</div>;
};

export default Header;

import "./App.css";
import { useDispatch, useSelector } from "react-redux/es/exports";
import IssuesPage from "./components/issues/IssuesPage";
import LogIn from "./components/login/LogIn";
import SignUp from "./components/signup/SignUp";
import NewLabel from "./components/new-issue-label/NewLabel";
import NewIssue from "./components/new-issue-label/NewIssue";
import SIssuePage from "./components/specific-issue/SIssuePage";
import { useEffect } from "react";
import { authActions } from "./store/auth";

function App() {
  const currentPage = useSelector((state: any) => state.page.currentPage);
  const dispatch = useDispatch();

  useEffect(function () {
    let user: any = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      (async function postData() {
        try {
          const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
              email: user.email,
              password: user.password,
            }),
          });
          const data = await res.json();
          if (res.ok) {
            dispatch(authActions.login(data));
          } else {
            throw new Error(data.message);
          }
          // console.log(res);
          // console.log(data);
        } catch (err: any) {
          console.log("Couldn't login by localStorage", err.message);
        }
      })();
    }
  }, []);

  let content;
  switch (currentPage) {
    case 1:
      content = <IssuesPage />;
      break;
    case 2:
      content = <LogIn />;
      break;
    case 3:
      content = <SignUp />;
      break;
    case 4:
      content = <NewLabel />;
      break;
    case 5:
      content = <NewIssue />;
      break;
    case 6:
      content = <SIssuePage />;
      break;
    default:
      content = "Something Went Wrong..!";
  }

  return <div>{content}</div>;
}

export default App;

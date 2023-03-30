import "./App.css";
import { useDispatch, useSelector } from "react-redux/es/exports";
import IssuesPage from "./components/issues/IssuesPage";
import LogIn from "./components/login/LogIn";
import SignUp from "./components/signup/SignUp";
import NewLabel from "./components/new-issue-label/NewLabel";
import NewIssue from "./components/new-issue-label/NewIssue";
import SIssuePage from "./components/specific-issue/SIssuePage";
import { useEffect } from "react";
import EditIssue from "./components/edit-issue/EditIssue";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import BoardPage from "./components/board/BoardPage";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/issues" /> },
  { path: "/issues", element: <IssuesPage /> },
  { path: "/login", element: <LogIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/newLabel", element: <NewLabel /> },
  { path: "/board", element: <BoardPage /> },
  { path: "/issues/:issueId", element: <SIssuePage /> },
  { path: "/issues/new", element: <NewIssue /> },
  { path: "/issues/:issueId/edit", element: <EditIssue /> },
]);

function App() {
  const currentPage = useSelector((state: any) => state.page.currentPage);
  const dispatch = useDispatch();

  useEffect(function () {
    let user: any = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      dispatch({
        type: "loginByLocalStorage",
        payload: {
          email: user.email,
          password: user.password,
        },
      });
    }

    dispatch({ type: "getIssues" });
    dispatch({ type: "getLabels" });
  }, []);

  return <RouterProvider router={router} />;
}

export default App;

import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import InProgress from "../components/InProgress";
import InQueue from "../components/InQueue";
import Completed from "../components/Completed";
import Login from "../pages/Login";
import SubTasks from "../components/SubTasks";
import SignUp from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/in_progress",
    element: <InProgress />,
  },
  {
    path: "/dashboard/queue",
    element: <InQueue />,
  },
  {
    path: "/dashboard/completed",
    element: <Completed />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/dashboard/task/:id",
    element: <SubTasks />,
  },
]);

export default router;

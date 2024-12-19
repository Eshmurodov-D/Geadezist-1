import Quiz from "../pages/Test/quiz";
import ResultPage from "../pages/Test/result";
import Results from "../pages/Test/Results";
import Dashboard from "../pages/Dashboard/Dashboard";
import Categories from "../pages/Categories/Categories";
import Test from "../pages/Test/Test";
import Users from "../pages/Users/Users";
import Employees from "../pages/Employees/Employees";
import Addresses from "../pages/Addresses/Addresses";
import Login from "../auth/LoginForm/login";
import Register from "../auth/RegisterForm/register";
import ForgotPassword from "../auth/PasswordPage/ForgetPassword/forget";
import ResetPassword from "../auth/PasswordPage/ResetPassword/reset";
import VerifyCode from "@/auth/VerifyCode/VerifyfCode";
import UserResults from "@/pages/User-results/UserResults";

export const publicRoutes = [
  { path: "/tests/:id", element: <Quiz /> },
  { path: "/result", element: <ResultPage /> },
];

export const authRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/changepass", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/verify-code", element: <VerifyCode /> },
];

export const adminRoutes = [
  { path: "dashboard", element: <Dashboard />, roles: ["ROLE_SUPER_ADMIN"] },
  { path: "users", element: <Users />, roles: ["ROLE_SUPER_ADMIN"] },
  {
    path: "categories",
    element: <Categories />,
    roles: ["ROLE_TESTER", "ROLE_SUPER_ADMIN"],
  },
  {
    path: "test",
    element: <Test />,
    roles: ["ROLE_TESTER", "ROLE_SUPER_ADMIN", "ROLE_USER", "ROLE_CLIENT"],
  },
  {
    path: "user-results",
    element: <UserResults />,
    roles: ["ROLE_SUPER_ADMIN", "ROLE_ADMIN"],
  },
  { path: "employees", element: <Employees />, roles: ["ROLE_SUPER_ADMIN"] },
  { path: "results", element: <Results />, roles: ["ROLE_CLIENT"] },
  { path: "addresses", element: <Addresses />, roles: ["ROLE_SUPER_ADMIN"] },
];


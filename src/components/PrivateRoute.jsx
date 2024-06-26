import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children, redirectTo = "../pages/Login.jsx" }) => {
  const { isLoggedIn, isRefreshing } = useAuth();

  return !isLoggedIn && !isRefreshing ? (
    <Navigate to={redirectTo} replace />
  ) : (
    children
  );
};
export default PrivateRoute;
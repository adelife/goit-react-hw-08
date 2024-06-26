import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RestrictedRoute = ({ children, redirectTo = "../pages/Contacts.jsx" }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to={redirectTo} replace /> : children;
};

export default RestrictedRoute;
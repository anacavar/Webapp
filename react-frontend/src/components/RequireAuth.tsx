import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import Cookies from "universal-cookie";

// For subsequent requests that require authentication, the frontend includes the JWT token in the request header.
// Commonly, this is done using the Authorization header with a value like Bearer <token>.
const RequireAuth = () => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;

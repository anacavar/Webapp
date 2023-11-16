import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import Cookies from "universal-cookie";

// For subsequent requests that require authentication, the frontend includes the JWT token in the request header.
// Commonly, this is done using the Authorization header with a value like Bearer <token>.
const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const cookie = new Cookies();
  // const token = cookie.get("accessToken"); // ovo ne može zbog httpOnlyja
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;

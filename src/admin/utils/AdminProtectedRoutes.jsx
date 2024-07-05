import { Outlet, Navigate } from "react-router-dom";

const AdminProtectedRoutes = ({ allowedRole }) => {
  const role = localStorage.getItem("Role");
  if (allowedRole == role) {
    var user = localStorage.getItem("Token");
  } else {
    var user = null;
  }

  return user ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default AdminProtectedRoutes;

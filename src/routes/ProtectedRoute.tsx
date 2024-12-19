import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactElement;
  roles: string[];
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles,
  redirectTo,
}) => {
  const role = localStorage.getItem("role");
  const hasAccess = role && roles.includes(role);

  return hasAccess ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;


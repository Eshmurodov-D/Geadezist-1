import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import { authRoutes, adminRoutes, publicRoutes } from "./routeConfig";
import useAuthStore from "@/store/useAuthStore";

const AppRoutes: React.FC = () => {
  const { user, getMe } = useAuthStore();

  useEffect(() => {
    getMe();
  }, [getMe]);

  const role = localStorage.getItem("role");

  const getDefaultRedirectPath = () => {
    const rolePaths = {
      ROLE_TESTER: "/categories",
      ROLE_ADMIN: "/user-results",
      ROLE_SUPER_ADMIN: "/dashboard",
      ROLE_USER: "/test",
      ROLE_CLIENT: "/test",
    };
    return rolePaths[role as keyof typeof rolePaths] || "/login";
  };

  return (
    <Routes>
      {/* Public routes */}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Auth routes */}
      {authRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={user ? <Navigate to={getDefaultRedirectPath()} /> : element}
        />
      ))}

      {/* Admin layout */}
      <Route
        path="/"
        element={user ? <AdminLayout /> : <Navigate to="/login" />}
      >
        {/* Admin routes */}
        {adminRoutes.map(({ path, element, roles }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute roles={roles} redirectTo="/login">
                {element}
              </ProtectedRoute>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;


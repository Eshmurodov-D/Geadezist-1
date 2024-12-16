// import Quiz from '@/pages/Test/quiz'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from '../Layout/AdminLayout'
import Addresses from '../pages/Addresses/Addresses'
import Categories from '../pages/Categories/Categories'
import Dashboard from '../pages/Dashboard/Dashboard'
import Employees from '../pages/Employees/Employees'
import Login from '../pages/Login'
import Test from '../pages/Test/Test'
import UserResults from '../pages/User-results/UserResults'
import Users from '../pages/Users/Users'
import useAuthStore from '../store/useAuthStore'
import Quiz from '../pages/Test/quiz'
import Results from '@/pages/Test/Results'

const AppRoutes: React.FC = () => {
  const { user } = useAuthStore(); // Foydalanuvchi holatini olish
  // Default redirect sahifa
  const getDefaultRedirectPath = () => {
    switch (user?.role) {
      case "testadmin":
        return "/categories";
      case "admin":
        return "/user-results";
      case "superadmin":
        return "/dashboard";
      case "client":
        return "/test";
      default:
        return "/login";
    }
  };
  // Rolni tekshirish uchun yordamchi funksiya
  const protectedRoute = (role: string | string[], component: JSX.Element) => {
    const hasAccess = Array.isArray(role)
      ? role.includes(user?.role || "")
      : user?.role === role;

		return hasAccess ? component : <Navigate to='/login' />
	}
	return (
		<Routes>
			<Route path='/tests' element={<Quiz	 />} />
			{/* Login sahifasi */}
			<Route
				path='/login'
				element={user ? <Navigate to={getDefaultRedirectPath()} /> : <Login />}
			/>

      {/* Admin layout */}
      <Route
        path="/"
        element={user ? <AdminLayout /> : <Navigate to="/login" />}
      >
        {/* Sahifalar */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={protectedRoute("superadmin", <Users />)} />
        <Route
          path="categories"
          element={protectedRoute(["testadmin", "superadmin"], <Categories />)}
        />
        <Route
          path="test"
          element={protectedRoute(
            ["testadmin", "superadmin", "client"],
            <Test />
          )}
        />
        <Route
          path="user-results"
          element={protectedRoute(["superadmin", "admin"], <UserResults />)}
        />
        <Route
          path="employees"
          element={protectedRoute("superadmin", <Employees />)}
        />
        <Route path="results" element={protectedRoute("client", <Results />)} />
        <Route
          path="addresses"
          element={protectedRoute("superadmin", <Addresses />)}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

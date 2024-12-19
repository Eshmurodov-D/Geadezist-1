import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../Layout/AdminLayout';
import Addresses from '../pages/Addresses/Addresses';
import Categories from '../pages/Categories/Categories';
import Dashboard from '../pages/Dashboard/Dashboard';
import Employees from '../pages/Employees/Employees';
import Test from '../pages/Test/Test';
import UserResults from '../pages/User-results/UserResults';
import Users from '../pages/Users/Users';
import Quiz from '../pages/Test/quiz';
import Login from '@/auth/LoginForm/login';
import Register from '@/auth/RegisterForm/register';
import ForgotPassword from '@/auth/PasswordPage/ForgetPassword/forget';
import ResetPassword from '@/auth/PasswordPage/ResetPassword/reset';
import VerifyCode from '@/auth/VerifyCode/VerifyfCode';

const AppRoutes: React.FC = () => {
	//  beddn role ni olb pasda tekshrlgn role lani
  const role = sessionStorage.getItem('role');

  const getDefaultRedirectPath = () => {
    switch (role) {
      case 'ROLE_TESTER':
        return '/categories';
      case 'ROLE_ADMIN':
        return '/user-results';
      case 'ROLE_SUPER_ADMIN':
        return '/dashboard';
      case 'ROLE_CLIENT':
        return '/test';
      default:
        return '/login';
    }
  };

  const protectedRoute = (roles: string | string[], component: JSX.Element) => {
    const hasAccess = Array.isArray(roles)
      ? roles.includes(role || '')
      : role === roles;

    return hasAccess ? component : <Navigate to='/login' />;
  };

  return (
    <Routes>
      <Route path='/ROLE_TESTER' element={<Quiz />} />
      <Route path='/register' element={<Register />} />
      <Route path='/changepass' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/verfy-code' element={<VerifyCode />} />

      <Route
        path='/login'
        element={role ? <Navigate to={getDefaultRedirectPath()} /> : <Login />}
      />

      <Route path='/' element={role ? <AdminLayout /> : <Navigate to='/login' />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='users' element={protectedRoute('ROLE_SUPER_ADMIN', <Users />)} />
        <Route path='categories' element={protectedRoute(['ROLE_TESTER', 'ROLE_SUPER_ADMIN'], <Categories />)} />
        <Route path='test' element={protectedRoute(['ROLE_TESTER', 'ROLE_SUPER_ADMIN', 'ROLE_CLIENT'], <Test />)} />
        <Route path='user-results' element={protectedRoute(['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'], <UserResults />)} />
        <Route path='employees' element={protectedRoute('ROLE_SUPER_ADMIN', <Employees />)} />
        <Route path='result' element={protectedRoute('ROLE_CLIENT', <Employees />)} />
        <Route path='addresses' element={protectedRoute('ROLE_SUPER_ADMIN', <Addresses />)} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

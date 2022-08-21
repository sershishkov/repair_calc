import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export interface ProtectedRouteProps {
  role: string;
  roles: string[];
}

const PrivateRoute = ({ role, roles }: ProtectedRouteProps) => {
  if (role && roles.includes(role)) {
    return <Outlet />;
  } else {
    return <Navigate to='/' />;
  }
};

export default PrivateRoute;

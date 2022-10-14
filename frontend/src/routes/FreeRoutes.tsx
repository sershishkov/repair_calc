import React from 'react';

import StartPage from '../pages/StartPage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

export const FreeRoutes = [
  { path: '/', component: <StartPage /> },
  { path: '/login', component: <Login /> },
  { path: '/register', component: <Register /> },
];

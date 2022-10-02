import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { RootState } from './app/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';

import theme_dark from './mui_theme/theme_dark';
import theme_light from './mui_theme/theme_light';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import StartPage from './pages/StartPage';
import InfoUserPage from './pages/InfoUserPage';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivateRoute from './components/layout/PrivateRoute';

import { getMe } from './features/auth/authSlice';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const UserEditDetails = React.lazy(
  () => import('./pages/auth/UserEditDetails')
);

const AddUser = React.lazy(() => import('./pages/user/AddUser'));

const EditUser = React.lazy(() => import('./pages/user/EditUser'));

const ListUser = React.lazy(() => import('./pages/user/ListUser'));

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.token) {
      dispatch(getMe());
    }
  }, [dispatch]);

  const theme_state = useAppSelector(
    (state: RootState) => state.theme_state.is_dark_mode
  );
  const { user } = useAppSelector((state: RootState) => state.auth_state);
  // console.log(user);
  return (
    <ThemeProvider theme={theme_state ? theme_dark : theme_light}>
      <Router>
        <CssBaseline />
        <Header />
        <Container
          sx={{
            mt: '68px',
            minWidth: '360px',
            maxWidth: '900px',
            // border: '1px solid red',
          }}
        >
          <Suspense fallback={<CircularProgress color='secondary' />}>
            <Routes>
              <Route path='/' element={<StartPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              {user && (
                <>
                  <Route path='/user-details' element={<UserEditDetails />} />

                  <Route element={<PrivateRoute roles={['admin']} />}>
                    <Route path='/user-admin/add' element={<AddUser />} />
                  </Route>

                  <Route element={<PrivateRoute roles={['admin']} />}>
                    <Route path='/user-admin/:id' element={<EditUser />} />
                  </Route>

                  <Route element={<PrivateRoute roles={['admin']} />}>
                    <Route path='/user-admin' element={<ListUser />} />
                  </Route>

                  <Route
                    element={
                      <PrivateRoute
                        roles={[
                          'user',
                          'seller',
                          'engineer',
                          'accountant',
                          'manager',
                          'boss',
                          'admin',
                        ]}
                      />
                    }
                  >
                    <Route path='/dashboard' element={<Dashboard />} />
                  </Route>

                  <Route
                    element={
                      <PrivateRoute
                        roles={[
                          'user',
                          'worker',
                          'client',
                          'partner',
                          'seller',
                          'engineer',
                          'accountant',
                          'manager',
                          'boss',
                          'admin',
                        ]}
                      />
                    }
                  >
                    <Route path='/infouser' element={<InfoUserPage />} />
                  </Route>
                </>
              )}

              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </Container>
      </Router>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;

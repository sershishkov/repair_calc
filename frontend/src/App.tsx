import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './app/hooks';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StartPage from './components/layout/StartPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';

import theme_dark from './mui_theme/theme_dark';
import theme_light from './mui_theme/theme_light';

import { getMe } from './features/auth/authSlice';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.token) {
      dispatch(getMe());
    }
  }, [dispatch]);
  const theme_state = useAppSelector(
    (state: any) => state.theme_state.is_dark_mode
  );
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

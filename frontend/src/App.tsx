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
import { seller_role, all_roles } from './constants/constants';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const UserEditDetails = React.lazy(
  () => import('./pages/auth/UserEditDetails')
);

const AddUser = React.lazy(() => import('./pages/user/AddUser'));
const EditUser = React.lazy(() => import('./pages/user/EditUser'));
const ListUser = React.lazy(() => import('./pages/user/ListUser'));

const AddUnit = React.lazy(
  () => import('./pages/accounting/refData/unit/AddUnit')
);
const EditUnit = React.lazy(
  () => import('./pages/accounting/refData/unit/EditUnit')
);
const ListUnit = React.lazy(
  () => import('./pages/accounting/refData/unit/ListUnit')
);

const AddFirmType = React.lazy(
  () => import('./pages/accounting/refData/firmtype/AddFirmType')
);
const EditFirmType = React.lazy(
  () => import('./pages/accounting/refData/firmtype/EditFirmType')
);
const ListFirmType = React.lazy(
  () => import('./pages/accounting/refData/firmtype/ListFirmType')
);

const AddClientType = React.lazy(
  () => import('./pages/accounting/refData/clienttype/AddClientType')
);
const EditClientType = React.lazy(
  () => import('./pages/accounting/refData/clienttype/EditClientType')
);
const ListClientType = React.lazy(
  () => import('./pages/accounting/refData/clienttype/ListClientType')
);

const AddContractType = React.lazy(
  () => import('./pages/accounting/refData/contracttype/AddContractType')
);
const EditContractType = React.lazy(
  () => import('./pages/accounting/refData/contracttype/EditContractType')
);
const ListContractType = React.lazy(
  () => import('./pages/accounting/refData/contracttype/ListContractType')
);

const AddGroupExpense = React.lazy(
  () => import('./pages/accounting/refData/groupexpense/AddGroupExpense')
);
const EditGroupExpense = React.lazy(
  () => import('./pages/accounting/refData/groupexpense/EditGroupExpense')
);
const ListGroupExpense = React.lazy(
  () => import('./pages/accounting/refData/groupexpense/ListGroupExpense')
);

const AddGroupProduct = React.lazy(
  () => import('./pages/accounting/refData/groupproduct/AddGroupProduct')
);
const EditGroupProduct = React.lazy(
  () => import('./pages/accounting/refData/groupproduct/EditGroupProduct')
);
const ListGroupProduct = React.lazy(
  () => import('./pages/accounting/refData/groupproduct/ListGroupProduct')
);

const AddGroupWork = React.lazy(
  () => import('./pages/accounting/refData/groupwork/AddGroupWork')
);
const EditGroupWork = React.lazy(
  () => import('./pages/accounting/refData/groupwork/EditGroupWork')
);
const ListGroupWork = React.lazy(
  () => import('./pages/accounting/refData/groupwork/ListGroupWork')
);

const AddPaymentSource = React.lazy(
  () => import('./pages/accounting/refData/paymentsource/AddPaymentSource')
);
const EditPaymentSource = React.lazy(
  () => import('./pages/accounting/refData/paymentsource/EditPaymentSource')
);
const ListPaymentSource = React.lazy(
  () => import('./pages/accounting/refData/paymentsource/ListPaymentSource')
);

const AddProductType = React.lazy(
  () => import('./pages/accounting/refData/producttype/AddProductType')
);
const EditProductType = React.lazy(
  () => import('./pages/accounting/refData/producttype/EditProductType')
);
const ListProductType = React.lazy(
  () => import('./pages/accounting/refData/producttype/ListProductType')
);

const AddTaxationType = React.lazy(
  () => import('./pages/accounting/refData/taxationtype/AddTaxationType')
);
const EditTaxationType = React.lazy(
  () => import('./pages/accounting/refData/taxationtype/EditTaxationType')
);
const ListTaxationType = React.lazy(
  () => import('./pages/accounting/refData/taxationtype/ListTaxationType')
);

const AddWorkerRole = React.lazy(
  () => import('./pages/accounting/refData/workerrole/AddWorkerRole')
);
const EditWorkerRole = React.lazy(
  () => import('./pages/accounting/refData/workerrole/EditWorkerRole')
);
const ListWorkerRole = React.lazy(
  () => import('./pages/accounting/refData/workerrole/ListWorkerRole')
);

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

                  <Route element={<PrivateRoute roles={all_roles} />}>
                    <Route path='/infouser' element={<InfoUserPage />} />
                  </Route>

                  <Route element={<PrivateRoute roles={seller_role} />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/refdata/unit' element={<ListUnit />} />
                    <Route path='/refdata/unit/add' element={<AddUnit />} />
                    <Route path='/refdata/unit/:id' element={<EditUnit />} />
                    <Route
                      path='/refdata/firmtype/:id'
                      element={<EditFirmType />}
                    />
                    <Route
                      path='/refdata/firmtype/add'
                      element={<AddFirmType />}
                    />
                    <Route
                      path='/refdata/firmtype'
                      element={<ListFirmType />}
                    />
                    <Route
                      path='/refdata/clienttype/add'
                      element={<AddClientType />}
                    />
                    <Route
                      path='/refdata/clienttype/:id'
                      element={<EditClientType />}
                    />
                    <Route
                      path='/refdata/clienttype'
                      element={<ListClientType />}
                    />
                    <Route
                      path='/refdata/contracttype/add'
                      element={<AddContractType />}
                    />
                    <Route
                      path='/refdata/contracttype/:id'
                      element={<EditContractType />}
                    />
                    <Route
                      path='/refdata/contracttype'
                      element={<ListContractType />}
                    />
                    <Route
                      path='/refdata/groupexpense/add'
                      element={<AddGroupExpense />}
                    />
                    <Route
                      path='/refdata/groupexpense/:id'
                      element={<EditGroupExpense />}
                    />
                    <Route
                      path='/refdata/groupexpense'
                      element={<ListGroupExpense />}
                    />
                    <Route
                      path='/refdata/groupproduct/add'
                      element={<AddGroupProduct />}
                    />
                    <Route
                      path='/refdata/groupproduct/:id'
                      element={<EditGroupProduct />}
                    />
                    <Route
                      path='/refdata/groupproduct'
                      element={<ListGroupProduct />}
                    />
                    <Route
                      path='/refdata/groupwork/add'
                      element={<AddGroupWork />}
                    />
                    <Route
                      path='/refdata/groupwork/:id'
                      element={<EditGroupWork />}
                    />
                    <Route
                      path='/refdata/groupwork'
                      element={<ListGroupWork />}
                    />
                    <Route
                      path='/refdata/paymentsource/add'
                      element={<AddPaymentSource />}
                    />
                    <Route
                      path='/refdata/paymentsource/:id'
                      element={<EditPaymentSource />}
                    />
                    <Route
                      path='/refdata/paymentsource'
                      element={<ListPaymentSource />}
                    />
                    <Route
                      path='/refdata/producttype/add'
                      element={<AddProductType />}
                    />
                    <Route
                      path='/refdata/producttype/:id'
                      element={<EditProductType />}
                    />
                    <Route
                      path='/refdata/producttype'
                      element={<ListProductType />}
                    />
                    <Route
                      path='/refdata/taxationtype/add'
                      element={<AddTaxationType />}
                    />
                    <Route
                      path='/refdata/taxationtype/:id'
                      element={<EditTaxationType />}
                    />
                    <Route
                      path='/refdata/taxationtype'
                      element={<ListTaxationType />}
                    />
                    <Route
                      path='/refdata/workerrole/add'
                      element={<AddWorkerRole />}
                    />
                    <Route
                      path='/refdata/workerrole/:id'
                      element={<EditWorkerRole />}
                    />
                    <Route
                      path='/refdata/workerrole'
                      element={<ListWorkerRole />}
                    />
                  </Route>
                </>
              )}

              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </Container>
      </Router>
      <ToastContainer
        autoClose={1000}
        // position='top-left'
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
      />
    </ThemeProvider>
  );
}

export default App;

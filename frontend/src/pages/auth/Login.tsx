import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';

import { login, reset } from '../../features/auth/authSlice';

const Login = () => {
  const [formData, setFormdata] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const { user, isLoading, isError, isSucces, message } = useAppSelector(
  //   (state: any) => state.auth
  // );

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }

  //   if (isSucces || user) {
  //     navigate('/');
  //   }

  //   dispatch(reset());
  // }, [user, isError, isSucces, message, navigate, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  // if (isLoading) {
  //   return <CircularProgress />;
  // }
  return (
    <Grid
      component='form'
      onSubmit={onSubmit}
      container
      className='root'
      direction='column'
    >
      <Grid item className='item item-heading'>
        <Typography variant='h3' align='center'>
          <FaUser /> Вход
        </Typography>
      </Grid>

      <Grid item className='item item-email'>
        <TextField
          margin='normal'
          required
          fullWidth
          name='email'
          label='email'
          type='email'
          id='email'
          value={email}
          onChange={onChange}
        />
      </Grid>
      <Grid item className='item item-password'>
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Пароль'
          type='password'
          id='password'
          value={password}
          onChange={onChange}
        />
      </Grid>

      <Grid item className='item item-sibmit'>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Вход
        </Button>
      </Grid>
      <Grid item className='item item-auth'>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item>
            <Link href='/register' variant='body2'>
              {'Еще не зарегестрирован? Регистрация'}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;

import { useState, useEffect } from 'react';
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

import { register, reset } from '../../features/auth/authSlice';

const Register = () => {
  const [formData, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;
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

    if (password !== password2) {
      toast.error('Password do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
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
          <FaUser /> Register
        </Typography>
      </Grid>
      <Grid item className='item item-name'>
        <TextField
          margin='normal'
          required
          fullWidth
          name='name'
          label='Name'
          type='text'
          id='name'
          value={name}
          onChange={onChange}
        />
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
          label='Password'
          type='password'
          id='password'
          value={password}
          onChange={onChange}
        />
      </Grid>
      <Grid item className='item item-password'>
        <TextField
          margin='normal'
          required
          fullWidth
          name='password2'
          label='Confirm password'
          type='password'
          id='password2'
          value={password2}
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
          Sign Up
        </Button>
      </Grid>
      <Grid item className='item item-auth'>
        <Link href='/login' variant='body2'>
          {'Already have an account? Sign In'}
        </Link>
      </Grid>
    </Grid>
  );
};

export default Register;

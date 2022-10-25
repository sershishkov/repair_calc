import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { login, reset } from '../../features/auth/authSlice';

const Login = () => {
  const [formData, setFormdata] = useState({
    email: '',
    password: '',
  });
  const [showPassword, set__showPassword] = useState<boolean>(false);

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isLoading, isError, isSucces, message } = useAppSelector(
    (state: RootState) => state.auth_state
  );

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

    if (isError) {
      toast.error(message);
    }

    if (isSucces && user) {
      toast.success('Вход успешен');
      dispatch(reset());
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };
  const handleClickShowPassword = () => {
    set__showPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  if (isLoading) {
    return <CircularProgress />;
  }
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
        <FormControl variant='outlined' fullWidth margin='normal'>
          <InputLabel htmlFor='password'>Пароль</InputLabel>
          <OutlinedInput
            id='password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={onChange}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Пароль'
          />
        </FormControl>
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

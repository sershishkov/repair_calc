import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import {
  updateDetails,
  updatePassword,
  logout,
} from '../../features/auth/authSlice';

const UserEditDetails = () => {
  const [formData, setFormdata] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });
  const [showCurrentPassword, set__showCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, set__showNewPassword] = useState<boolean>(false);
  const { name, email, currentPassword, newPassword } = formData;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading, isError, message } = useAppSelector(
    (state: RootState) => state.auth_state
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  useLayoutEffect(() => {
    if (user) {
      setFormdata((prevState) => ({
        ...prevState,
        name: user.name ? user.name : '',
        email: user.email ? user.email : '',
      }));
    }
  }, [user]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitDetail = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const userData = {
      name,
      email,
    };

    dispatch(updateDetails(userData));
    dispatch(logout());
    navigate('/');
  };

  const onSubmitPassword = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const userData = {
      currentPassword,
      newPassword,
    };

    dispatch(updatePassword(userData));
    dispatch(logout());
    navigate('/');
  };
  const handleClickShowCurrentPassword = () => {
    set__showCurrentPassword(!showCurrentPassword);
  };
  const handleClickShowNewPassword = () => {
    set__showNewPassword(!showNewPassword);
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
    <Grid container direction='column'>
      <Grid item sx={{ mb: 5 }}>
        <Typography variant='h3' align='center'>
          Моя страница
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant='h3' align='center'>
          Изменить почту и имя
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='name'
          label='Имя'
          type='text'
          id='name'
          value={name}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
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
      <Grid item>
        <Button
          type='button'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          onClick={onSubmitDetail}
        >
          Сохранить
        </Button>
      </Grid>
      <Grid item sx={{ mt: 5 }}>
        <Typography variant='h3' align='center'>
          Изменить пароль
        </Typography>
      </Grid>
      <Grid item>
        {' '}
        <FormControl variant='outlined' fullWidth margin='normal'>
          <InputLabel htmlFor='currentPassword'>Текущий пароль</InputLabel>
          <OutlinedInput
            id='currentPassword'
            name='currentPassword'
            type={showCurrentPassword ? 'text' : 'password'}
            value={currentPassword}
            onChange={onChange}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowCurrentPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Текущий пароль'
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl variant='outlined' fullWidth margin='normal'>
          <InputLabel htmlFor='currentPassword'>Новый пароль</InputLabel>
          <OutlinedInput
            id='newPassword'
            name='newPassword'
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={onChange}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Новый пароль'
          />
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          type='button'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          onClick={onSubmitPassword}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserEditDetails;

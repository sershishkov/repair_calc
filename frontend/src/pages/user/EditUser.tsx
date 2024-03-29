import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useNavigate, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { user__get_one, user__update } from '../../features/users/user__Slice';

import { roles } from '../../constants/constants';

function EditUser() {
  const [formData, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, set__showPassword] = useState<boolean>(false);
  const [role, set__role] = useState<string>('');

  const { name, email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const { item, isLoading } = useAppSelector(
    (state: RootState) => state.user__state
  );

  useEffect(() => {
    if (id) {
      dispatch(user__get_one({ _id: id }));
    }
  }, [id, dispatch]);

  useLayoutEffect(() => {
    if (item) {
      set__role(item.role);

      setFormdata({
        name: item.name,
        email: item.email,
        password: '',
      });
    }
  }, [item]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeRoles = (event: SelectChangeEvent) => {
    set__role(event.target.value as string);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user__Data = {
      _id: id,
      name,
      email,
      password,
      role,
      navigate,
    };

    dispatch(user__update(user__Data));
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
    <Grid component='form' onSubmit={onSubmit} container direction='column'>
      <Grid item className='item item-heading'>
        <Typography variant='h3' align='center'>
          Редактировать пользователя
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='name'
          label='name'
          type='name'
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
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id='role-label'>Роль</InputLabel>
          <Select
            labelId='role-label'
            id='role'
            name='role'
            value={role}
            label='Роль'
            onChange={handleChangeRoles}
          >
            {roles.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.caption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Редактировать
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditUser;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import { storehouse__add } from '../../../../features/accounting/refData/storehouse/storehouse__Slice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

function AddStoreHouse() {
  const { isLoading } = useAppSelector(
    (state: RootState) => state.storehouse__state
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormdata] = useState({
    storeHouseName: '',
    address: '',
  });

  const { storeHouseName, address } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('storeHouseName');
    inputFocus?.focus();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      storeHouseName,
      address,
      navigate,
    };

    dispatch(storehouse__add(created__Data));
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid component='form' onSubmit={onSubmit} container direction='column'>
      <Grid item className='item item-heading'>
        <Typography variant='h3' align='center'>
          Добавить
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='storeHouseName'
          label='storeHouseName'
          type='text'
          id='storeHouseName'
          value={storeHouseName}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='address'
          label='address'
          type='text'
          id='address'
          value={address}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={storeHouseName.length === 0 || address.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddStoreHouse;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import {
  firmtype__add,
  reset,
} from '../../../../features/accounting/refData/firmtype/firmtype__Slice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

function AddUnit() {
  const { isLoading, isError, isSucces, message } = useAppSelector(
    (state: RootState) => state.firmtype__state
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormdata] = useState({
    nameTypeLong: '',
    nameTypeShort: '',
  });

  const { nameTypeLong, nameTypeShort } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('nameTypeLong');
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
      nameTypeLong,
      nameTypeShort,
    };

    dispatch(firmtype__add(created__Data));

    if (isError) {
      toast.error(message);
    }

    if (isSucces) {
      toast.success('Добавлено успешно');
      dispatch(reset());
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
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
          name='nameTypeLong'
          label='nameTypeLong'
          type='text'
          id='nameTypeLong'
          value={nameTypeLong}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='nameTypeShort'
          label='nameTypeShort'
          type='text'
          id='nameTypeShort'
          value={nameTypeShort}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={nameTypeLong.length === 0 || nameTypeShort.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddUnit;

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  firmtype__update,
  firmtype__get_one,
} from '../../../../features/accounting/refData/firmtype/firmtype__Slice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

function EditFirmType() {
  const { item, isLoading, isError, isSucces, message } = useAppSelector(
    (state: RootState) => state.firmtype__state
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const [formData, setFormdata] = useState({
    nameTypeLong: '',
    nameTypeShort: '',
  });

  const { nameTypeLong, nameTypeShort } = formData;

  useEffect(() => {
    if (id) {
      dispatch(firmtype__get_one({ _id: id }));
    }
  }, [id, dispatch]);

  useLayoutEffect(() => {
    if (item) {
      setFormdata({
        nameTypeLong: item.nameTypeLong!,
        nameTypeShort: item.nameTypeShort!,
      });
      const inputFocus = document.getElementById('nameTypeLong');
      inputFocus?.focus();
    }
  }, [item]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const update__Data = {
      _id: id,
      nameTypeLong,
      nameTypeShort,
    };

    dispatch(firmtype__update(update__Data));

    if (isError) {
      toast.error(message);
    }

    if (isSucces) {
      toast.success('Изменено успешно');
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
          Редактировать
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

export default EditFirmType;

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  clienttype__update,
  clienttype__get_one,
} from '../../../../features/accounting/refData/clienttype/clienttype__Slice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

function EditClient() {
  const { item, isLoading, isError, isSucces, message } = useAppSelector(
    (state: RootState) => state.clienttype__state
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const [clientTypeName, set__clientTypeName] = useState<string>('');

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (id) {
      dispatch(clienttype__get_one({ _id: id }));
    }
  }, [id, isError, message, dispatch]);

  useLayoutEffect(() => {
    if (item) {
      set__clientTypeName(item.clientTypeName!);
      const inputFocus = document.getElementById('clientTypeName');
      inputFocus?.focus();
    }
  }, [item]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set__clientTypeName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const update__Data = {
      _id: id,
      clientTypeName,
    };

    dispatch(clienttype__update(update__Data));
    if (isSucces) {
      navigate(-1);
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
          name='clientTypeName'
          label='clientTypeName'
          type='text'
          id='clientTypeName'
          value={clientTypeName}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={clientTypeName.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditClient;

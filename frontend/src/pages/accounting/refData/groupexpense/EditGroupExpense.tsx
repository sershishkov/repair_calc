import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  groupexpense__update,
  groupexpense__get_one,
} from '../../../../features/accounting/refData/groupexpense/groupexpense__Slice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

function EditGroupExpense() {
  const { item, isLoading, isError, isSucces, message } = useAppSelector(
    (state: RootState) => state.groupexpense__state
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const [groupExpenseName, set__groupExpenseName] = useState<string>('');

  useEffect(() => {
    if (id) {
      dispatch(groupexpense__get_one({ _id: id }));
    }
  }, [id, dispatch]);

  useLayoutEffect(() => {
    if (item) {
      set__groupExpenseName(item.groupExpenseName!);
      const inputFocus = document.getElementById('groupExpenseName');
      inputFocus?.focus();
    }
  }, [item]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set__groupExpenseName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const update__Data = {
      _id: id,
      groupExpenseName,
    };

    dispatch(groupexpense__update(update__Data));

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
          name='groupExpenseName'
          label='groupExpenseName'
          type='text'
          id='groupExpenseName'
          value={groupExpenseName}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={groupExpenseName.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditGroupExpense;

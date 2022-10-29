import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import { groupexpense__add } from '../../../../features/accounting/refData/groupexpense/groupexpense__Slice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

function AddGroupExpense() {
  const { isLoading } = useAppSelector(
    (state: RootState) => state.groupexpense__state
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [groupExpenseName, set__groupExpenseName] = useState<string>('');

  useEffect(() => {
    const inputFocus = document.getElementById('groupExpenseName');
    inputFocus?.focus();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set__groupExpenseName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      groupExpenseName,
      navigate,
    };

    dispatch(groupexpense__add(created__Data));
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

export default AddGroupExpense;

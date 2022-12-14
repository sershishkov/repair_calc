import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import { useNavigate, useParams } from 'react-router-dom';

import {
  groupwork__update,
  groupwork__get_one,
} from '../../../../features/accounting/refData/groupwork/groupwork__Slice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

function EditGroupWork() {
  const { item, isLoading } = useAppSelector(
    (state: RootState) => state.groupwork__state
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const [groupWorkName, set__groupWorkName] = useState<string>('');

  useEffect(() => {
    if (id) {
      dispatch(groupwork__get_one({ _id: id }));
    }
  }, [id, dispatch]);

  useLayoutEffect(() => {
    if (item) {
      set__groupWorkName(item.groupWorkName!);
      const inputFocus = document.getElementById('groupWorkName');
      inputFocus?.focus();
    }
  }, [item]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set__groupWorkName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const update__Data = {
      _id: id,
      groupWorkName,
      navigate,
    };

    dispatch(groupwork__update(update__Data));
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
          name='groupWorkName'
          label='groupWorkName'
          type='text'
          id='groupWorkName'
          value={groupWorkName}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={groupWorkName.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditGroupWork;

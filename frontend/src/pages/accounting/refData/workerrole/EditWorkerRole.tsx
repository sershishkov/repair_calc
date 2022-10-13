import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  workerrole__update,
  workerrole__get_one,
} from '../../../../features/accounting/refData/workerrole/workerrole__Slice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

function EditWorkerRole() {
  const { item, isLoading, isError, isSucces, message } = useAppSelector(
    (state: RootState) => state.workerrole__state
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const [workerRoleName, set__workerRoleName] = useState<string>('');

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (id) {
      dispatch(workerrole__get_one({ _id: id }));
    }
  }, [id, isError, message, dispatch]);

  useLayoutEffect(() => {
    if (item) {
      set__workerRoleName(item.workerRoleName!);
    }
  }, [item]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set__workerRoleName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const update__Data = {
      _id: id,
      workerRoleName,
    };

    dispatch(workerrole__update(update__Data));
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
          name='workerRoleName'
          label='workerRoleName'
          type='text'
          id='workerRoleName'
          value={workerRoleName}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={workerRoleName.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditWorkerRole;

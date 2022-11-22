import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import { useNavigate, useParams } from 'react-router-dom';

import {
  grThirdPartyService__update,
  grThirdPartyService__get_one,
} from '../../../../features/accounting/refData/group-thirdparty-service/grThirdpartyService__Slice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

function EditGrThPartyServ() {
  const { item, isLoading } = useAppSelector(
    (state: RootState) => state.grThirdpartyService__state
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const [groupThirdPartyServiceName, set__groupThirdPartyServiceName] =
    useState<string>('');

  useEffect(() => {
    if (id) {
      dispatch(grThirdPartyService__get_one({ _id: id }));
    }
  }, [id, dispatch]);

  useLayoutEffect(() => {
    if (item) {
      set__groupThirdPartyServiceName(item.groupThirdPartyServiceName!);
      const inputFocus = document.getElementById('groupThirdPartyServiceName');
      inputFocus?.focus();
    }
  }, [item]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set__groupThirdPartyServiceName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const update__Data = {
      _id: id,
      groupThirdPartyServiceName,
      navigate,
    };

    dispatch(grThirdPartyService__update(update__Data));
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
          name='groupThirdPartyServiceName'
          label='groupThirdPartyServiceName'
          type='text'
          id='groupThirdPartyServiceName'
          value={groupThirdPartyServiceName}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={groupThirdPartyServiceName.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditGrThPartyServ;

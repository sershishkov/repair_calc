import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import { taxationtype__add } from '../../../../features/accounting/refData/taxationtype/taxationtype__Slice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

function AddTaxationType() {
  const { isLoading } = useAppSelector(
    (state: RootState) => state.taxationtype__state
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [taxationTypeName, set__taxationTypeName] = useState<string>('');

  useEffect(() => {
    const inputFocus = document.getElementById('taxationTypeName');
    inputFocus?.focus();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set__taxationTypeName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      taxationTypeName,
      navigate,
    };

    dispatch(taxationtype__add(created__Data));
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
          name='taxationTypeName'
          label='taxationTypeName'
          type='text'
          id='taxationTypeName'
          value={taxationTypeName}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={taxationTypeName.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddTaxationType;

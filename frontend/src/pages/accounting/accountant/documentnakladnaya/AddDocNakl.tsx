import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import { salarypayment__add } from '../../../../features/accounting/accountant/salarypayment/salarypayment__Slice';

import { worker__get_all } from '../../../../features/accounting/refData/worker/worker__Slice';
import { contract__get_all } from '../../../../features/accounting/refData/contract/contract__Slice';

import {
  I_Worker,
  I_Contract,
} from '../../../../interfaces/AccountingInterfaces';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const initState = {
  worker: '',
  paymentSum: '',
  contract: '',
};

const AddDocNakl = () => {
  const { isLoading } = useAppSelector(
    (state: RootState) => state.salarypayment__state
  );

  const arr__Workers = useAppSelector(
    (state: RootState) => state.worker__state.items
  );
  const arr__Contracts = useAppSelector(
    (state: RootState) => state.contract__state.items
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormdata] = useState(initState);
  const [paymentDate, set_paymentDate] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );

  const { worker, paymentSum, contract } = formData;

  useEffect(() => {
    dispatch(worker__get_all({ page: `0`, limit: `0` }));
    dispatch(contract__get_all({ page: `0`, limit: `0` }));
  }, [dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      worker,
      paymentSum: paymentSum ? Number(paymentSum) : 0,
      contract,
      navigate,
    };

    dispatch(salarypayment__add(created__Data));
  };

  useEffect(() => {
    const inputFocus = document.getElementById('paymentSum');
    inputFocus?.focus();
  }, []);

  const handleChangeSelects = (event: SelectChangeEvent) => {
    setFormdata((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value as string,
    }));
  };

  const handleChangeDate = (newValue: Dayjs | null) => {
    set_paymentDate(newValue);
  };

  const onClickAddItem = (link: string) => {
    navigate(`/refdata/${link}/add`);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid
      component='form'
      onSubmit={onSubmit}
      container
      direction='column'
      autoComplete='off'
    >
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
          name='paymentSum'
          label='paymentSum'
          type='number'
          id='paymentSum'
          value={paymentSum}
          onChange={onChange}
        />
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <DesktopDatePicker
          label='Календарь'
          inputFormat='DD-MM-YYYY'
          value={paymentDate}
          onChange={handleChangeDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <FormControl fullWidth>
            <InputLabel id='worker-label'>worker</InputLabel>
            <Select
              labelId='worker-label'
              id='worker'
              name='worker'
              value={worker}
              label='worker'
              onChange={handleChangeSelects}
            >
              {arr__Workers?.map((item: I_Worker) => (
                <MenuItem key={item._id} value={item._id}>
                  {`${item.lastName} ${item.firstName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={() => onClickAddItem('worker')}>
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <FormControl fullWidth>
            <InputLabel id='contract-label'>contract</InputLabel>
            <Select
              labelId='contract-label'
              id='contract'
              name='contract'
              value={contract}
              label='contract'
              onChange={handleChangeSelects}
            >
              {arr__Contracts?.map((item: I_Contract) => (
                <MenuItem key={item._id} value={item._id}>
                  {`${
                    typeof item.client !== 'string'
                      ? item.client?.nameClientShort!
                      : item.client
                  }, ${item.contractDescription}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={() => onClickAddItem('contract')}>
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={!worker || !paymentSum || !paymentDate || !contract}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddDocNakl;

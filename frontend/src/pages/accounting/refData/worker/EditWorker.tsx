import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';

import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import {
  worker__update,
  worker__get_one,
} from '../../../../features/accounting/refData/worker/worker__Slice';

import { workerrole__get_all } from '../../../../features/accounting/refData/workerrole/workerrole__Slice';

import { I_WorkerRole } from '../../../../interfaces/AccountingInterfaces';

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
  firstName: '',
  patronymic: '',
  lastName: '',
  workerRole: '',
  passportSeries: '',
  passportNumber: '',
  representedBy: '',
  inn: '',
  email: '',
};

function EditWorker() {
  const { item, isLoading } = useAppSelector(
    (state: RootState) => state.worker__state
  );

  const workerRoles = useAppSelector(
    (state: RootState) => state.workerrole__state.items
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const [formData, setFormdata] = useState(initState);
  const [telNumber, setTelNumber] = useState<string>();
  const [whenIssued, set_whenIssued] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [birthDay, set_birthDay] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );

  const {
    firstName,
    patronymic,
    lastName,
    workerRole,
    passportSeries,
    passportNumber,
    representedBy,
    inn,
    email,
  } = formData;

  useEffect(() => {
    if (id) {
      dispatch(worker__get_one({ _id: id }));
    }
    dispatch(workerrole__get_all({ page: `0`, limit: `0` }));
  }, [id, dispatch]);

  useEffect(() => {
    const inputFocus = document.getElementById('firstName');
    inputFocus?.focus();
  }, []);

  useLayoutEffect(() => {
    if (item) {
      setFormdata({
        firstName: item.firstName!,
        patronymic: item.patronymic!,
        lastName: item.lastName!,
        workerRole:
          typeof item.workerRole! === 'string'
            ? item.workerRole
            : item.workerRole?._id!,

        passportSeries: item.passportSeries!,
        passportNumber: item.passportNumber!,
        representedBy: item.representedBy!,
        inn: item.inn!,
        email: item.email!,
      });
      set_whenIssued(item.whenIssued!);
      set_birthDay(item.birthDay!);
      setTelNumber(item.telNumber!);
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

    const created__Data = {
      _id: id,
      firstName,
      patronymic,
      lastName,
      workerRole,
      passportSeries,
      passportNumber,
      representedBy,
      whenIssued,
      inn,
      birthDay,
      email,
      navigate,
    };

    dispatch(worker__update(created__Data));
  };

  const handleChangeSelects = (event: SelectChangeEvent) => {
    setFormdata((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value as string,
    }));
  };

  const handleChangeWhenIssued = (newValue: Dayjs | null) => {
    set_whenIssued(newValue);
  };
  const handleChangeBirthDay = (newValue: Dayjs | null) => {
    set_birthDay(newValue);
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
          name='firstName'
          label='firstName'
          type='text'
          id='firstName'
          value={firstName}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='patronymic'
          label='patronymic'
          type='text'
          id='patronymic'
          value={patronymic}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='lastName'
          label='lastName'
          type='text'
          id='lastName'
          value={lastName}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <FormControl fullWidth>
            <InputLabel id='workerRole-label'>workerRole</InputLabel>
            <Select
              labelId='workerRole-label'
              id='workerRole'
              name='workerRole'
              value={workerRole}
              label='Роль'
              onChange={handleChangeSelects}
            >
              {workerRoles?.map((item: I_WorkerRole) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.workerRoleName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={() => onClickAddItem('workerrole')}>
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='passportSeries'
          label='passportSeries'
          type='text'
          id='passportSeries'
          value={passportSeries}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='passportNumber'
          label='passportNumber'
          type='text'
          id='passportNumber'
          value={passportNumber}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='representedBy'
          label='representedBy'
          type='text'
          id='representedBy'
          value={representedBy}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <DesktopDatePicker
          label='Когда выдан?'
          inputFormat='DD-MM-YYYY'
          value={whenIssued}
          onChange={handleChangeWhenIssued}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='inn'
          label='inn'
          type='text'
          id='inn'
          value={inn}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <DesktopDatePicker
          label='Дата рожения'
          inputFormat='DD-MM-YYYY'
          value={birthDay}
          onChange={handleChangeBirthDay}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>

      <Grid item>
        <PhoneInput
          style={{
            backgroundColor: isValidPhoneNumber(`${telNumber}`)
              ? 'green'
              : 'red',
            padding: '1rem',
          }}
          // sx={{ backgroundColor: 'yellow' }}
          // international
          defaultCountry='UA'
          placeholder='Ваш телефон'
          value={telNumber}
          onChange={setTelNumber}
          error={
            telNumber
              ? isValidPhoneNumber(telNumber)
                ? undefined
                : 'Invalid phone number'
              : 'Phone number required'
          }
        />
        {/* <span>
          Is possible:{' '}
          {telNumber && isPossiblePhoneNumber(telNumber) ? 'true' : 'false'}
        </span> */}
        {/* <span>
          Is valid:{' '}
          {telNumber && isValidPhoneNumber(telNumber) ? 'true' : 'false'}
        </span> */}
        {/* <span>National: {telNumber && formatPhoneNumber(telNumber)}</span>
        <span>
          International: {telNumber && formatPhoneNumberIntl(telNumber)}
        </span> */}
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='email'
          label='email'
          type='email'
          id='email'
          value={email}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={!firstName || !lastName || !workerRole || !telNumber}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditWorker;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import {
  client__add,
  reset,
} from '../../../../features/accounting/refData/client/client__Slice';
import { firmtype__get_all } from '../../../../features/accounting/refData/firmtype/firmtype__Slice';
import { taxationtype__get_all } from '../../../../features/accounting/refData/taxationtype/taxationtype__Slice';
import { clienttype__get_all } from '../../../../features/accounting/refData/clienttype/clienttype__Slice';

import {
  I_FirmType,
  I_TaxationType,
  // I_ClientType,
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
import OutlinedInput from '@mui/material/OutlinedInput';

import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const initState = {
  nameClientLong: '',
  nameClientShort: '',
  firmType: '',
  postIndex: '',
  address: '',
  edrpou: '',
  inn: '',
  iban: '',
  iban_budget: '',
  passport: '',
  firstName_imen: '',
  patronymic_imen: '',
  lastName_imen: '',
  firstName_rodit: '',
  patronymic_rodit: '',
  lastName_rodit: '',
  certificateNumber: '',
  representedBy: '',
  whichActsOnTheBasis: '',
  jobTitle: '',
  jobTitle_rodit: '',
  tax: '',
  taxationType: '',
  certificate_PDV: '',
  // telNumber: '',
  email: '',
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function AddClient() {
  const { isLoading, isError, isSucces, message } = useAppSelector(
    (state: RootState) => state.client__state
  );

  const firmTypes = useAppSelector(
    (state: RootState) => state.firmtype__state.items
  );

  const taxationTypes = useAppSelector(
    (state: RootState) => state.taxationtype__state.items
  );
  const clientTypes = useAppSelector(
    (state: RootState) => state.clienttype__state.items
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormdata] = useState(initState);
  const [clientType, setClientType] = React.useState<string[]>([]);
  const [telNumber, setTelNumber] = useState<string>();

  const {
    nameClientLong,
    nameClientShort,
    firmType,
    postIndex,
    address,
    edrpou,
    inn,
    iban,
    iban_budget,
    passport,
    firstName_imen,
    patronymic_imen,
    lastName_imen,
    firstName_rodit,
    patronymic_rodit,
    lastName_rodit,
    certificateNumber,
    representedBy,
    whichActsOnTheBasis,
    jobTitle,
    jobTitle_rodit,
    tax,
    taxationType,
    certificate_PDV,
    // telNumber,
    email,
  } = formData;

  useEffect(() => {
    dispatch(firmtype__get_all({ page: `1`, limit: `50` }));
    dispatch(taxationtype__get_all({ page: `1`, limit: `50` }));
    dispatch(clienttype__get_all({ page: `1`, limit: `50` }));
  }, [dispatch]);

  useEffect(() => {
    const inputFocus = document.getElementById('nameClientLong');
    inputFocus?.focus();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      nameClientLong,
      nameClientShort,
      firmType,
      postIndex: Number(postIndex),
      address,
      edrpou: Number(edrpou),
      inn: Number(inn),
      iban,
      iban_budget,
      passport,
      firstName_imen,
      patronymic_imen,
      lastName_imen,
      firstName_rodit,
      patronymic_rodit,
      lastName_rodit,
      certificateNumber,
      representedBy,
      whichActsOnTheBasis,
      jobTitle,
      jobTitle_rodit,
      tax: Number(tax),
      taxationType,
      certificate_PDV,
      telNumber,
      email,
      clientType,
    };

    dispatch(client__add(created__Data));

    if (isError) {
      toast.error(message);
    }

    if (isSucces) {
      setFormdata(initState);
      toast.success('Добавлено успешно');
      dispatch(reset());
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  const handleChangeSelects = (event: SelectChangeEvent) => {
    setFormdata((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value as string,
    }));
  };

  const handleChangeMultipleSelects = (
    event: SelectChangeEvent<typeof clientType>
  ) => {
    const {
      target: { value },
    } = event;
    setClientType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
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
          name='nameClientLong'
          label='nameClientLong'
          type='text'
          id='nameClientLong'
          value={nameClientLong}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='nameClientShort'
          label='nameClientShort'
          type='text'
          id='nameClientShort'
          value={nameClientShort}
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
            <InputLabel id='firmType-label'>firmType</InputLabel>
            <Select
              labelId='firmType-label'
              id='firmType'
              name='firmType'
              value={firmType}
              label='Роль'
              onChange={handleChangeSelects}
            >
              {firmTypes?.map((item: I_FirmType) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.nameTypeLong}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={() => onClickAddItem('firmtype')}>
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='postIndex'
          label='postIndex'
          type='number'
          id='postIndex'
          value={postIndex}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='address'
          label='address'
          type='address'
          id='address'
          value={address}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='edrpou'
          label='edrpou'
          type='number'
          id='edrpou'
          value={edrpou}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='inn'
          label='inn'
          type='number'
          id='inn'
          value={inn}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='iban'
          label='iban'
          type='text'
          id='iban'
          value={iban}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='iban_budget'
          label='iban_budget'
          type='text'
          id='iban_budget'
          value={iban_budget}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='passport'
          label='passport'
          type='text'
          id='passport'
          value={passport}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='firstName_imen'
          label='firstName_imen'
          type='text'
          id='firstName_imen'
          value={firstName_imen}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='patronymic_imen'
          label='patronymic_imen'
          type='text'
          id='patronymic_imen'
          value={patronymic_imen}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='lastName_imen'
          label='lastName_imen'
          type='text'
          id='lastName_imen'
          value={lastName_imen}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='firstName_rodit'
          label='firstName_rodit'
          type='text'
          id='firstName_rodit'
          value={firstName_rodit}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='patronymic_rodit'
          label='patronymic_rodit'
          type='text'
          id='patronymic_rodit'
          value={patronymic_rodit}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='lastName_rodit'
          label='lastName_rodit'
          type='text'
          id='lastName_rodit'
          value={lastName_rodit}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='certificateNumber'
          label='certificateNumber'
          type='text'
          id='certificateNumber'
          value={certificateNumber}
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
        <TextField
          margin='normal'
          // required
          fullWidth
          name='whichActsOnTheBasis'
          label='whichActsOnTheBasis'
          type='text'
          id='whichActsOnTheBasis'
          value={whichActsOnTheBasis}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='jobTitle'
          label='jobTitle'
          type='text'
          id='jobTitle'
          value={jobTitle}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='jobTitle_rodit'
          label='jobTitle_rodit'
          type='text'
          id='jobTitle_rodit'
          value={jobTitle_rodit}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='tax'
          label='tax'
          type='number'
          id='tax'
          value={tax}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id='taxationType-label'>taxationType</InputLabel>
          <Select
            labelId='taxationType-label'
            id='taxationType'
            name='taxationType'
            value={taxationType}
            label='Роль'
            onChange={handleChangeSelects}
          >
            {taxationTypes?.map((item: I_TaxationType) => (
              <MenuItem key={item._id} value={item._id}>
                {item.taxationTypeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='certificate_PDV'
          label='certificate_PDV'
          type='text'
          id='certificate_PDV'
          value={certificate_PDV}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <PhoneInput
          // international
          defaultCountry='UA'
          placeholder='Ваш телефон'
          value={telNumber}
          onChange={setTelNumber}
        />
        {/* <TextField
          margin='normal'
          required
          fullWidth
          name='telNumber'
          label='telNumber'
          type='text'
          id='telNumber'
          value={telNumber}
          onChange={onChange}
        /> */}
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
        <FormControl fullWidth>
          <InputLabel id='clientType-label'>clientType</InputLabel>
          <Select
            labelId='clientType-label'
            id='clientType'
            multiple
            value={clientType}
            onChange={handleChangeMultipleSelects}
            input={<OutlinedInput label='clientType' />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => {
                  const newItem = clientTypes?.find(
                    (item) => item._id === value
                  );
                  return (
                    <Chip key={newItem?._id} label={newItem?.clientTypeName} />
                  );
                })}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {clientTypes?.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                <Checkbox checked={clientType.indexOf(item._id!) > -1} />
                <ListItemText primary={item.clientTypeName} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={
            !nameClientLong ||
            !nameClientShort ||
            !firmType ||
            !postIndex ||
            !address ||
            !firstName_imen ||
            !patronymic_imen ||
            !lastName_imen ||
            !firstName_rodit ||
            !patronymic_rodit ||
            !lastName_rodit ||
            !jobTitle ||
            !tax ||
            !taxationType ||
            !telNumber ||
            !email ||
            !clientType
          }
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddClient;

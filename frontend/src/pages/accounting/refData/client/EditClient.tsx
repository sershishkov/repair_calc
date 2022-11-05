import React, { useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import {
  client__update,
  client__get_one,
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

function EditClient() {
  const { item, isLoading } = useAppSelector(
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
  let { id } = useParams();

  const [formData, setFormdata] = useState(initState);
  const [clientType, setClientType] = React.useState<string[]>([]);
  const [telNumber, setTelNumber] = useState<string>();
  const [displayFizOsoba, setDisplayFizOsoba] = useState<boolean>(false);
  const [displayFOP, setdisplayFOP] = useState<boolean>(false);

  const fizOsoba_Id = useMemo(
    () => firmTypes?.find((item) => item.nameTypeLong === 'Фізична особа')?._id,
    [firmTypes]
  );
  const fop_Id = useMemo(
    () =>
      firmTypes?.find(
        (item) => item.nameTypeLong === 'Фізична особа-підприємець'
      )?._id,
    [firmTypes]
  );

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
    email,
  } = formData;

  useEffect(() => {
    if (id) {
      dispatch(client__get_one({ _id: id }));
    }

    dispatch(firmtype__get_all({ page: `1`, limit: `50` }));
    dispatch(taxationtype__get_all({ page: `1`, limit: `50` }));
    dispatch(clienttype__get_all({ page: `1`, limit: `50` }));
  }, [id, dispatch]);

  useEffect(() => {
    const inputFocus = document.getElementById('nameClientLong');
    inputFocus?.focus();
  }, []);

  useEffect(() => {
    if (firmType === fizOsoba_Id) {
      setDisplayFizOsoba(true);
      setdisplayFOP(false);
    } else if (firmType === fop_Id) {
      setdisplayFOP(true);
      setDisplayFizOsoba(false);
    } else {
      setdisplayFOP(false);
      setDisplayFizOsoba(false);
    }
  }, [firmType, fizOsoba_Id, fop_Id]);

  useLayoutEffect(() => {
    if (item) {
      setFormdata({
        nameClientLong: item.nameClientLong!,
        nameClientShort: item.nameClientShort!,
        firmType:
          typeof item.firmType! === 'string'
            ? item.firmType
            : item.firmType?._id!,
        postIndex: item.postIndex!,
        address: item.address!,
        edrpou: item.edrpou ? item.edrpou : '',
        inn: item.inn ? item.inn : '',
        iban: item.iban ? item.iban : '',
        iban_budget: item.iban_budget ? item.iban_budget : '',
        passport: item.passport ? item.passport : '',
        firstName_imen: item.firstName_imen!,
        patronymic_imen: item.patronymic_imen!,
        lastName_imen: item.lastName_imen!,
        firstName_rodit: item.firstName_rodit!,
        patronymic_rodit: item.patronymic_rodit!,
        lastName_rodit: item.lastName_rodit!,
        certificateNumber: item.certificateNumber ? item.certificateNumber : '',
        representedBy: item.representedBy!,
        whichActsOnTheBasis: item.whichActsOnTheBasis!,
        jobTitle: item.jobTitle!,
        jobTitle_rodit: item.jobTitle_rodit!,
        tax: String(item.tax!),

        taxationType:
          typeof item.taxationType! === 'string'
            ? item.taxationType
            : item.taxationType?._id!,

        certificate_PDV: item.certificate_PDV ? item.certificate_PDV : '',
        email: item.email!,
      });

      const arrToSet = item.clientType!.map((item) => {
        return typeof item !== 'string' ? item._id! : item;
      });

      setClientType(arrToSet);

      setTelNumber(item.telNumber!);
      const inputFocus = document.getElementById('clientTypeName');
      inputFocus?.focus();
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
      tax: tax ? Number(tax) : 0,
      taxationType,
      certificate_PDV,
      telNumber,
      email,
      clientType,
      navigate,
    };

    dispatch(client__update(created__Data));
  };

  const handleChangeSelects = (event: SelectChangeEvent) => {
    setFormdata((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value as string,
    }));
  };

  const handleChangeMultipleSelects = (event: SelectChangeEvent<string[]>) => {
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
          Редактировать
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
          value={nameClientLong ?? ''}
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
          value={nameClientShort ?? ''}
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
              value={firmType ?? ''}
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
          type='text'
          id='postIndex'
          value={postIndex ?? ''}
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
          type='text'
          id='address'
          value={address ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid
        item
        sx={{ display: !displayFizOsoba && !displayFOP ? 'block' : 'none' }}
      >
        <TextField
          margin='normal'
          // required
          fullWidth
          name='edrpou'
          label='edrpou'
          type='text'
          id='edrpou'
          value={edrpou ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid
        item
        sx={{ display: displayFizOsoba || displayFOP ? 'block' : 'none' }}
      >
        <TextField
          margin='normal'
          // required
          fullWidth
          name='inn'
          label='inn'
          type='text'
          id='inn'
          value={inn ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item sx={{ display: !displayFizOsoba ? 'block' : 'none' }}>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='iban'
          label='iban'
          type='text'
          id='iban'
          value={iban ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item sx={{ display: !displayFizOsoba ? 'block' : 'none' }}>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='iban_budget'
          label='iban_budget'
          type='text'
          id='iban_budget'
          value={iban_budget ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item sx={{ display: displayFizOsoba ? 'block' : 'none' }}>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='passport'
          label='passport'
          type='text'
          id='passport'
          value={passport ?? ''}
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
          value={firstName_imen ?? ''}
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
          value={patronymic_imen ?? ''}
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
          value={lastName_imen ?? ''}
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
          value={firstName_rodit ?? ''}
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
          value={patronymic_rodit ?? ''}
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
          value={lastName_rodit ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item sx={{ display: displayFOP ? 'block' : 'none' }}>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='certificateNumber'
          label='certificateNumber'
          type='text'
          id='certificateNumber'
          value={certificateNumber ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item sx={{ display: displayFOP ? 'block' : 'none' }}>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='representedBy'
          label='representedBy'
          type='text'
          id='representedBy'
          value={representedBy ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid
        item
        sx={{ display: !displayFizOsoba && !displayFOP ? 'block' : 'none' }}
      >
        <TextField
          margin='normal'
          // required
          fullWidth
          name='whichActsOnTheBasis'
          label='whichActsOnTheBasis'
          type='text'
          id='whichActsOnTheBasis'
          value={whichActsOnTheBasis ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid
        item
        sx={{ display: !displayFizOsoba && !displayFOP ? 'block' : 'none' }}
      >
        <TextField
          margin='normal'
          // required
          fullWidth
          name='jobTitle'
          label='jobTitle'
          type='text'
          id='jobTitle'
          value={jobTitle ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid
        item
        sx={{ display: !displayFizOsoba && !displayFOP ? 'block' : 'none' }}
      >
        <TextField
          margin='normal'
          // required
          fullWidth
          name='jobTitle_rodit'
          label='jobTitle_rodit'
          type='text'
          id='jobTitle_rodit'
          value={jobTitle_rodit ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item sx={{ display: !displayFizOsoba ? 'block' : 'none' }}>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='tax'
          label='tax'
          type='number'
          id='tax'
          value={tax ?? ''}
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
            <InputLabel id='taxationType-label'>taxationType</InputLabel>
            <Select
              labelId='taxationType-label'
              id='taxationType'
              name='taxationType'
              value={taxationType ?? ''}
              // defaultValue={`""`}
              label='taxationType'
              onChange={handleChangeSelects}
            >
              {taxationTypes?.map((item: I_TaxationType) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.taxationTypeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={() => onClickAddItem('taxationtype')}>
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>
      <Grid
        item
        sx={{ display: !displayFizOsoba && !displayFOP ? 'block' : 'none' }}
      >
        <TextField
          margin='normal'
          // required
          fullWidth
          name='certificate_PDV'
          label='certificate_PDV'
          type='text'
          id='certificate_PDV'
          value={certificate_PDV ?? ''}
          onChange={onChange}
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
          value={telNumber ?? ''}
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
          value={email ?? ''}
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
            <InputLabel id='clientType-label'>clientType</InputLabel>
            <Select
              labelId='clientType-label'
              id='clientType'
              multiple
              value={clientType ?? []}
              onChange={handleChangeMultipleSelects}
              input={<OutlinedInput label='clientType' />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const newItem = clientTypes?.find(
                      (item) => item._id === value
                    );
                    return (
                      <Chip
                        key={newItem?._id}
                        label={newItem?.clientTypeName}
                      />
                    );
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {clientTypes?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  <Checkbox checked={clientType!.indexOf(item._id!) > -1} />
                  <ListItemText primary={item.clientTypeName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={() => onClickAddItem('clienttype')}>
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
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
            // !jobTitle ||
            // !jobTitle_rodit ||
            // !tax ||
            !taxationType ||
            !telNumber ||
            !email ||
            !clientType![0]
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

export default EditClient;

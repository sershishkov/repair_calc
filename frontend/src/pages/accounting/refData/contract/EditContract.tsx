import React, { useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import {
  contract__update,
  contract__get_one,
} from '../../../../features/accounting/refData/contract/contract__Slice';
import { client__get_all } from '../../../../features/accounting/refData/client/client__Slice';
import { contracttype__get_all } from '../../../../features/accounting/refData/contracttype/contracttype__Slice';
import { paymentsource__get_all } from '../../../../features/accounting/refData/paymentsource/paymentsource__Slice';

import { generateDocNumber } from '../../../../utils/helperFunction';

import {
  I_Client,
  I_ContractType,
  I_PaymentSource,
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
import Autocomplete from '@mui/material/Autocomplete';

const initState = {
  contractNumber: '',
  ourFirm: '',
  // client: '',
  contractDescription: '',
  workAddress: '',
  contractType: '',
  paymentSource: '',
};

function EditContract() {
  const { item, isLoading } = useAppSelector(
    (state: RootState) => state.contract__state
  );

  const arr__Clients = useAppSelector(
    (state: RootState) => state.client__state.items
  );

  const arr_ourFirm = useMemo(
    () =>
      arr__Clients?.filter(
        (item) =>
          typeof item.clientType !== 'string' &&
          item.clientType?.find(
            (item) =>
              typeof item !== 'string' && item.clientTypeName === 'наша фирма'
          )
      ),
    [arr__Clients]
  );

  const arr_ourClients = useMemo(
    () =>
      arr__Clients?.filter(
        (item) =>
          typeof item.clientType !== 'string' &&
          item.clientType?.find(
            (item) =>
              typeof item !== 'string' && item.clientTypeName !== 'наша фирма'
          )
      ),
    [arr__Clients]
  );

  const arr__CotractTypes = useAppSelector(
    (state: RootState) => state.contracttype__state.items
  );
  const arr__PaymentSourses = useAppSelector(
    (state: RootState) => state.paymentsource__state.items
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const [formData, setFormdata] = useState(initState);
  const [clientObject, setClientObject] = React.useState<I_Client | null>(null); //for using autocomplete
  const [inputClientValue, setInputClientValue] = React.useState('');
  const [contractDate, set_contractDate] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );

  const {
    contractNumber,
    ourFirm,
    // client,
    contractDescription,
    workAddress,
    contractType,
    paymentSource,
  } = formData;

  useEffect(() => {
    if (id) {
      dispatch(contract__get_one({ _id: id }));
    }

    dispatch(client__get_all({ page: `0`, limit: `0` }));
    dispatch(contracttype__get_all({ page: `0`, limit: `0` }));
    dispatch(paymentsource__get_all({ page: `0`, limit: `0` }));
  }, [id, dispatch]);

  useEffect(() => {
    const inputFocus = document.getElementById('contractNumber');
    inputFocus?.focus();
    setFormdata((prevState) => ({
      ...prevState,
      contractNumber: generateDocNumber(),
    }));
  }, []);

  useLayoutEffect(() => {
    if (item) {
      setFormdata({
        contractNumber: item.contractNumber!,

        ourFirm:
          typeof item.ourFirm! === 'string' ? item.ourFirm : item.ourFirm?._id!,

        contractDescription: item.contractDescription!,
        workAddress: item.workAddress!,
        contractType:
          typeof item.contractType! === 'string'
            ? item.contractType
            : item.contractType?._id!,
        paymentSource:
          typeof item.paymentSource! === 'string'
            ? item.paymentSource
            : item.paymentSource?._id!,
      });
      set_contractDate(item.contractDate!);
      if (typeof item.client !== 'string') {
        setClientObject(item.client!);
        setInputClientValue(item.client!.nameClientShort!);
      }
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
      contractNumber,
      ourFirm,
      client: clientObject?._id!,
      contractDate,
      contractDescription,
      workAddress,
      contractType,
      paymentSource,
      navigate,
    };

    dispatch(contract__update(created__Data));
  };

  const handleChangeSelects = (event: SelectChangeEvent) => {
    setFormdata((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value as string,
    }));
  };

  const handleChangeDate = (newValue: Dayjs | null) => {
    set_contractDate(newValue);
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
          name='contractNumber'
          label='contractNumber'
          type='text'
          id='contractNumber'
          value={contractNumber ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <FormControl fullWidth>
            <InputLabel id='ourFirm-label'>ourFirm</InputLabel>
            <Select
              labelId='ourFirm-label'
              id='ourFirm'
              name='ourFirm'
              value={ourFirm ?? ''}
              label='ourFirm'
              onChange={handleChangeSelects}
            >
              {arr_ourFirm?.map((item: I_Client) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.nameClientShort}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={() => onClickAddItem('clients')}>
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <Autocomplete
            fullWidth
            options={arr_ourClients!}
            getOptionLabel={(option: I_Client) => option.nameClientShort!}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            id='client-controlled'
            value={clientObject ?? null}
            inputValue={inputClientValue ?? ''}
            onChange={(event: any, newValue: I_Client | null) => {
              setClientObject(newValue);
              // console.log(newValue);

              setFormdata((prevState) => ({
                ...prevState,
                workAddress: newValue?.address!,
              }));
            }}
            onInputChange={(event, newInputValue) => {
              setInputClientValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label='Клиенты' variant='standard' />
            )}
          />

          <IconButton onClick={() => onClickAddItem('clients')}>
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item>
        <DesktopDatePicker
          label='Календарь'
          inputFormat='DD-MM-YYYY'
          value={contractDate ?? null}
          onChange={handleChangeDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          multiline
          required
          fullWidth
          name='contractDescription'
          label='contractDescription'
          type='text'
          id='contractDescription'
          value={contractDescription ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // multiline
          required
          fullWidth
          name='workAddress'
          label='workAddress'
          type='text'
          id='workAddress'
          value={workAddress ?? ''}
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
            <InputLabel id='contractType-label'>contractType</InputLabel>
            <Select
              labelId='contractType-label'
              id='contractType'
              name='contractType'
              value={contractType ?? ''}
              label='contractType'
              onChange={handleChangeSelects}
            >
              {arr__CotractTypes?.map((item: I_ContractType) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.contractTypeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={() => onClickAddItem('contracttype')}>
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
            <InputLabel id='paymentSource-label'>paymentSource</InputLabel>
            <Select
              labelId='paymentSource-label'
              id='paymentSource'
              name='paymentSource'
              value={paymentSource ?? ''}
              label='paymentSource'
              onChange={handleChangeSelects}
            >
              {arr__PaymentSourses?.map((item: I_PaymentSource) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.paymentSourceName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={() => onClickAddItem('paymentsource')}>
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={
            !contractNumber ||
            !ourFirm ||
            !clientObject ||
            !contractDate ||
            !contractDescription ||
            !workAddress ||
            !contractType
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

export default EditContract;

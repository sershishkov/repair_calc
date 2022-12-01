import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import { documentnakladnaya__add } from '../../../../features/accounting/accountant/documentnakladnaya/documentnakladnaya__Slice';

import { product__get_all } from '../../../../features/accounting/refData/product/product__Slice';
import { contract__get_all } from '../../../../features/accounting/refData/contract/contract__Slice';
import { storehouse__get_all } from '../../../../features/accounting/refData/storehouse/storehouse__Slice';

import { generateDocNumber } from '../../../../utils/helperFunction';

import {
  I_Contract,
  I_StoreHouse,
  // I_Product,
  // I_ProductInNakl,
  // I_DocumentNakladnaya,
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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';

const initState = {
  nakladnayaNumber: '',
  // products: [],
  storeHouse: '',
  typeNakl: '',
};

const AddDocNakl = () => {
  const { isLoading } = useAppSelector(
    (state: RootState) => state.documentnakladnaya__state
  );

  // const arr__Products = useAppSelector(
  //   (state: RootState) => state.product__state.items
  // );
  const arr__Contracts = useAppSelector(
    (state: RootState) => state.contract__state.items
  );
  const arr__StoreHouses = useAppSelector(
    (state: RootState) => state.storehouse__state.items
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormdata] = useState(initState);
  const [nakladnayaDate, set_nakladnayaDate] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [active, set_active] = useState(false);
  const [inputContractValue, setInputContractValue] = useState('');
  const [contractObject, setContractObject] = useState<I_Contract | null>(null); //for using autocomplete

  const {
    nakladnayaNumber,
    // products,
    storeHouse,
    typeNakl,
  } = formData;

  useEffect(() => {
    dispatch(product__get_all({ page: `0`, limit: `0` }));
    dispatch(storehouse__get_all({ page: `0`, limit: `0` }));
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
      nakladnayaNumber,
      nakladnayaDate,
      contract: contractObject?._id,
      products: [],
      storeHouse,
      active,
      typeNakl,

      navigate,
    };

    dispatch(documentnakladnaya__add(created__Data));
  };

  useEffect(() => {
    setFormdata((prevState) => ({
      ...prevState,
      nakladnayaNumber: `BH-${generateDocNumber()}`,
    }));
    const inputFocus = document.getElementById('nakladnayaNumber');
    inputFocus?.focus();
    // console.log(nakladnayaNumber);
  }, [nakladnayaNumber]);

  const handleChangeSelects = (event: SelectChangeEvent) => {
    setFormdata((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value as string,
    }));
  };

  const handleChangeDate = (newValue: Dayjs | null) => {
    set_nakladnayaDate(newValue);
  };
  const handleChangeActive = (event: React.ChangeEvent<HTMLInputElement>) => {
    set_active(event.target.checked);
  };

  const onClickAddItem = (link: string) => {
    navigate(link);
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
      sx={{ minWidth: '900px', margin: 'auto' }}
    >
      <Grid item className='item item-heading'>
        <Typography variant='h3' align='center'>
          Добавить
        </Typography>
      </Grid>
      <Grid item>
        <Stack
          direction='row'
          spacing={2}
          justifyContent='space-between'
          alignItems={`center`}

          // direction={{ xs: 'column', sm: 'row' }}
        >
          <TextField
            margin='normal'
            required
            // fullWidth
            name='nakladnayaNumber'
            label='nakladnayaNumber'
            type='text'
            id='nakladnayaNumber'
            value={nakladnayaNumber ?? ''}
            onChange={onChange}
            sx={{ width: 200, mt: 1 }}
          />
          <FormControl sx={{ width: 200 }}>
            <DesktopDatePicker
              label='Календарь'
              inputFormat='DD-MM-YYYY'
              value={nakladnayaDate}
              onChange={handleChangeDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>

          <Stack
            direction='row'
            spacing={2}
            sx={{ width: 250 }}
            // direction={{ xs: 'column', sm: 'row' }}
          >
            <FormControl sx={{ width: 200 }}>
              <InputLabel id='storeHouse-label'>storeHouse</InputLabel>
              <Select
                labelId='storeHouse-label'
                id='storeHouse'
                name='storeHouse'
                value={storeHouse}
                label='storeHouse'
                onChange={handleChangeSelects}
              >
                {arr__StoreHouses?.map((item: I_StoreHouse) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.storeHouseName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton
              onClick={() => onClickAddItem('/refdata/storehouse/add')}
            >
              <AddIcon color='success' sx={{ fontSize: 30 }} />
            </IconButton>
          </Stack>
          <FormControl sx={{ width: 200 }}>
            <InputLabel id='typeNakl-label'>typeNakl</InputLabel>
            <Select
              labelId='typeNakl-label'
              id='typeNakl'
              name='typeNakl'
              value={typeNakl}
              label='typeNakl'
              onChange={handleChangeSelects}
            >
              <MenuItem value={`outgoing`}>{`Видаткова`}</MenuItem>
              <MenuItem value={`incoming`}>{`Прибуткова`}</MenuItem>
              <MenuItem value={`returnFromBuyer`}>{`Возврат Нам`}</MenuItem>
              <MenuItem
                value={`returnToSupplier`}
              >{`Возврат Продавцу`}</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            sx={{ fontSize: '1rem' }}
            control={
              <Checkbox
                //  defaultChecked
                checked={active}
                onChange={handleChangeActive}
                color='success'
              />
            }
            labelPlacement='bottom'
            label={active ? 'Активно' : 'Нет'}
          />
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
            options={arr__Contracts!}
            getOptionLabel={(option: I_Contract) => {
              return `${
                typeof option.client !== 'string'
                  ? option.client?.nameClientShort!
                  : option.client
              }, ${option.contractDescription}, ${option.workAddress} `;
            }}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            id='contract-controlled'
            value={contractObject}
            inputValue={inputContractValue}
            onChange={(event: any, newValue: I_Contract | null) => {
              setContractObject(newValue);
              // console.log(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setInputContractValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label='Контракты' variant='standard' />
            )}
          />

          <IconButton onClick={() => onClickAddItem('/refdata/contract/add')}>
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={
            !nakladnayaNumber ||
            !inputContractValue ||
            !nakladnayaDate ||
            !storeHouse ||
            !typeNakl
          }
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

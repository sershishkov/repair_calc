import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { uuid } from 'uuidv4';

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
  I_ProductRow,
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

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const initState = {
  nakladnayaNumber: '',
  // products: [],
  storeHouse: '',
  typeNakl: '',
  taxPercent: '7',
  marginPercent: '20',
  marginSum: '',
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
  const [tableRows, set_tableRows] = useState<I_ProductRow[]>([]);

  const {
    nakladnayaNumber,
    // products,
    storeHouse,
    typeNakl,
    taxPercent,
    marginPercent,
    marginSum,
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
    const inputFocus = document.getElementById('storeHouse');
    inputFocus?.focus();
  }, []);

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

  const addTableRow = () => {
    const newItem = {
      row_id: uuid(),
      product: '',
      parameter: 0,
      normPerOne: 0,
      calcAmount: 0,
      amountInPackage: 0,
      amount: 0,
      unit: '',
      priceBuy: 0,
      rowSumBuy: 0,
      priceSell: 0,
      rowSumSell: 0,
      deltaPerOne: 0,
      deltaPerRow: 0,
    };

    set_tableRows([...tableRows, newItem]);
  };

  const deleteTableRow = (rowID: string) => {
    const newArr = [...tableRows].filter((item) => item.row_id !== rowID);
    set_tableRows(newArr);
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
          Создать накладную
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
        </Stack>
      </Grid>
      <Grid item>
        <Stack
          direction='row'
          spacing={2}
          justifyContent='flex-start'
          alignItems='center'

          // direction={{ xs: 'column', sm: 'row' }}
        >
          <TextField
            margin='normal'
            required
            // fullWidth
            name='taxPercent'
            label='taxPercent'
            type='number'
            id='taxPercent'
            value={taxPercent ?? ''}
            onChange={onChange}
            sx={{ width: 200, mt: 1 }}
          />
          <TextField
            margin='normal'
            required
            // fullWidth
            name='marginPercent'
            label='marginPercent'
            type='number'
            id='marginPercent'
            value={marginPercent ?? ''}
            onChange={onChange}
            sx={{ width: 200, mt: 1 }}
          />

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
            labelPlacement='end'
            label={active ? 'Активно' : 'Не активно'}
          />
          <Typography variant='h3' align='center'>
            Разница по накладной {marginSum}
          </Typography>
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

      <Grid item sx={{ mb: 2 }}>
        <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
          <Table
            stickyHeader
            sx={{
              maxWidth: 1200,
              width: '100%',
              minWidth: 900,
            }}
          >
            <TableHead>
              <TableRow>
                <IconButton onClick={addTableRow}>
                  <PlusOneIcon color='success' sx={{ fontSize: 30 }} />
                </IconButton>
              </TableRow>
              <TableRow>
                <TableCell align='center' style={{ width: 25 }}>
                  №
                </TableCell>
                <TableCell align='center' style={{ width: 25 }}>
                  Товар
                </TableCell>
                <TableCell align='center' style={{ width: 25 }}>
                  Параметр для расчета
                </TableCell>
                <TableCell align='center' style={{ width: 25 }}>
                  Норма на …
                </TableCell>
                <TableCell align='center' style={{ width: 25 }}>
                  Расчетное Кол-во
                </TableCell>
                <TableCell align='center' style={{ width: 25 }}>
                  Упаковка
                </TableCell>
                <TableCell align='center' style={{ width: 25 }}>
                  Едениц
                </TableCell>
                <TableCell align='center' style={{ width: 25 }}>
                  Ед.изм
                </TableCell>
                <TableCell align='center' style={{ width: 25 }}>
                  Цена Закуп
                </TableCell>
                <TableCell align='center' style={{ width: 25 }}>
                  Сумма Закупки
                </TableCell>
                <TableCell align='center' style={{ width: 25 }}>
                  Цена Продажи
                </TableCell>
                <TableCell align='center' style={{ width: 25 }}>
                  Сумма продажи
                </TableCell>
                <TableCell align='center' style={{ width: 25 }}>
                  разн на единице
                </TableCell>
                <TableCell align='center' style={{ width: 25 }}>
                  Разница Всего
                </TableCell>
                <TableCell align='center' style={{ width: 25 }}>
                  Удалить строку
                </TableCell>
                <TableCell align='center' style={{ width: 25 }}>
                  Вверх
                </TableCell>
                <TableCell align='center' style={{ width: 25 }}>
                  Вниз
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows.length > 0 &&
                tableRows.map((row, rowIndex) => (
                  <TableRow key={row.row_id}>
                    <TableCell align='center'>{`${rowIndex + 1}`}</TableCell>
                    <TableCell align='center'>{`product`}</TableCell>
                    <TableCell align='center'>{`parameter`}</TableCell>
                    <TableCell align='center'>{`normPerOne`}</TableCell>
                    <TableCell align='center'>{`calcAmount`}</TableCell>
                    <TableCell align='center'>{`amountInPackage`}</TableCell>
                    <TableCell align='center'>{`amount`}</TableCell>
                    <TableCell align='center'>{`unit`}</TableCell>
                    <TableCell align='center'>{`rowSumBuy`}</TableCell>
                    <TableCell align='center'>{`priceSell`}</TableCell>
                    <TableCell align='center'>{`rowSumSell`}</TableCell>
                    <TableCell align='center'>{`deltaPerOne`}</TableCell>
                    <TableCell align='center'>{`deltaPerRow`}</TableCell>
                    <TableCell align='center'>
                      <IconButton onClick={() => deleteTableRow(row.row_id!)}>
                        <DeleteForeverIcon
                          color='error'
                          sx={{ fontSize: 30 }}
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell align='center'>{`rowGoUp`}</TableCell>
                    <TableCell align='center'>{`rowGoDown`}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
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

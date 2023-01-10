import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

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
  I_Product,
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
// import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import EditIcon from '@mui/icons-material/Edit';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Tooltip from '@mui/material/Tooltip';
import JoinLeftIcon from '@mui/icons-material/JoinLeft';
import FunctionsIcon from '@mui/icons-material/Functions';
import StraightenIcon from '@mui/icons-material/Straighten';
import InventoryIcon from '@mui/icons-material/Inventory';

const initState = {
  nakladnayaNumber: '',
  // products: [],
  storeHouse: '',
  typeNakl: '',
  taxPercent: '7',
  marginPercent: '20',
  marginSum: 0,
  naklSumSell: 0,
  naklSumBuy: 0,
};

const AddDocNakl = () => {
  const { isLoading } = useAppSelector(
    (state: RootState) => state.documentnakladnaya__state
  );

  const arr__Products = useAppSelector(
    (state: RootState) => state.product__state.items
  );
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
    naklSumSell,
    naklSumBuy,
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
    const customStoreId = arr__StoreHouses?.find(
      (item) => item.storeHouseName === 'Склад основной'
    )?._id;

    setFormdata((prevState) => ({
      ...prevState,
      nakladnayaNumber: `BH-${generateDocNumber()}`,
      storeHouse: customStoreId!,
      typeNakl: `outgoing`,
    }));

    const inputFocus = document.getElementById('contract-controlled');
    inputFocus?.focus();
  }, [arr__StoreHouses]);

  const handleChangeSelects = (event: SelectChangeEvent) => {
    setFormdata((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value as string,
    }));
  };
  const handleChangeSelectsInRow = (
    rowID: string,
    event: SelectChangeEvent
  ) => {
    const tempRows = [...tableRows];
    const findRowIndex = tempRows.findIndex((item) => item.row_id === rowID);
    const findRow = tempRows[findRowIndex];
    const findProduct = arr__Products?.find(
      (item) => item._id === event.target.value
    );
    const productUnit =
      typeof findProduct?.unit !== 'string'
        ? findProduct?.unit!.unitName
        : findProduct?.unit;

    const newRow = {
      ...findRow,
      product: event.target.value as string,
      normPerOne: `${findProduct?.normPerOne}`,
      amountInPackage: `${findProduct?.amountInPackage}`,
      unit: productUnit,
      priceBuyRecommend: `${findProduct?.priceBuyRecommend}`,
    };

    tempRows.splice(findRowIndex, 1, newRow);
    set_tableRows(tempRows);
  };

  const handleChangeInputsInRow = (
    rowID: string,
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const tempRows = [...tableRows];
    const findRowIndex = tempRows.findIndex((item) => item.row_id === rowID);
    const findedRow = tempRows[findRowIndex];

    const updatedRow = {
      ...findedRow,
      [fieldName]: event.target.value,
    };

    tempRows.splice(findRowIndex, 1, updatedRow);
    set_tableRows(tempRows);
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
      row_id: uuidv4(),
      product: '',
      parameter: '',
      normPerOne: '',
      calcAmount: '',
      amountInPackage: '',
      amount: '',
      unit: '',
      priceBuy: '',
      rowSumBuy: '',
      priceSell: '',
      rowSumSell: '',
      deltaPerOne: '',
      deltaPerRow: '',
    };

    set_tableRows([...tableRows, newItem]);
  };

  const deleteTableRow = (rowID: string) => {
    const newArr = [...tableRows].filter((item) => item.row_id !== rowID);
    set_tableRows(newArr);
  };
  const rowGoUp = (rowIndex: number) => {
    const tempArr = [...tableRows];
    tempArr.splice(rowIndex - 1, 2, tempArr[rowIndex], tempArr[rowIndex - 1]);

    set_tableRows(tempArr);
  };
  const rowGowDown = (rowIndex: number) => {
    const tempArr = [...tableRows];
    tempArr.splice(rowIndex, 2, tempArr[rowIndex + 1], tempArr[rowIndex]);

    set_tableRows(tempArr);
  };

  const recalcAllTable = () => {
    let temp_naklSumBuy: number = 0;
    let temp_naklSumSell: number = 0;
    let temp_marginSum: number = 0;
    const tempRows = [...tableRows];
    tempRows.forEach((item) => {
      console.log(item);
      temp_naklSumBuy += Number(item.rowSumBuy ?? '0');
      temp_naklSumSell += Number(item.rowSumSell ?? '0');
      temp_marginSum += Number(item.deltaPerRow ?? '0');
    });

    setFormdata((prevState) => ({
      ...prevState,
      naklSumBuy: temp_naklSumBuy,
      naklSumSell: temp_naklSumSell,
      marginSum: temp_marginSum,
    }));
  };
  console.log(tableRows);
  const recalcRow = (
    rowID: string,
    fieldName: string,
    clearParametr = false
  ) => {
    const tempRows = [...tableRows];
    const findRowIndex = tempRows.findIndex((item) => item.row_id === rowID);
    const findedRow = tempRows[findRowIndex];

    // if (clearParametr) {
    //   findedRow.parameter = '0';
    // }
    const temp_calcAmount =
      Number(findedRow.parameter) * Number(findedRow.normPerOne);
    const temp_amount = Math.ceil(
      temp_calcAmount / Number(findedRow.amountInPackage)
    );
    const temp_rowSumBuy = temp_amount * Number(findedRow.priceBuyRecommend);

    const priceWithMarginPercent =
      Number(findedRow.priceBuyRecommend) +
      (Number(findedRow.priceBuyRecommend) * Number(marginPercent)) / 100;

    const temp_priceSell =
      Number(priceWithMarginPercent) +
      (Number(priceWithMarginPercent) * Number(taxPercent)) / 100;

    const temp_rowSumSell = temp_priceSell * temp_amount;
    const temp_deltaPerOne =
      priceWithMarginPercent - Number(findedRow.priceBuyRecommend);

    const temp_deltaPerRow = temp_deltaPerOne * temp_amount;

    const updatedRow = {
      ...findedRow,
      calcAmount: `${temp_calcAmount.toFixed(2)}`,
      amount: `${temp_amount}`,
      rowSumBuy: `${temp_rowSumBuy.toFixed(2)}`,
      priceSell: `${temp_priceSell.toFixed(2)}`,
      rowSumSell: `${temp_rowSumSell.toFixed(2)}`,

      deltaPerOne: `${temp_deltaPerOne.toFixed(2)}`,
      deltaPerRow: `${temp_deltaPerRow.toFixed(2)}`,
    };

    tempRows.splice(findRowIndex, 1, updatedRow);
    set_tableRows(tempRows);
    recalcAllTable();
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
      sx={{
        width: '100%',
        minWidth: '900px',
        margin: 'auto',
        // border: '1px solid red',
      }}
    >
      <Grid
        item
        className='item item-heading'
        sx={{
          width: '100%',
          // border: '1px solid blue',
        }}
      >
        <Typography variant='h3' align='center'>
          Создать накладную
        </Typography>
      </Grid>

      <Grid
        item
        sx={{
          width: '100%',
          // border: '1px solid blue',
        }}
      >
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
              value={nakladnayaDate ?? null}
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
                value={storeHouse ?? ''}
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

      <Grid
        item
        sx={{
          width: '100%',
          // border: '1px solid blue',
        }}
      >
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
            sx={{ width: 50, mt: 1 }}
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
            sx={{ width: 50, mt: 1 }}
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
          {/* <Typography variant='subtitle1' align='center'>
            Разница по накладной:{`${marginSum}`}
          </Typography>
          <Typography variant='subtitle1' align='center'>
            Сумма по накладной {`${naklSum}`}
          </Typography> */}
        </Stack>
      </Grid>

      <Grid
        item
        sx={{
          width: '100%',
          // border: '1px solid blue',
          mb: 2,
        }}
      >
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

      <Grid
        item
        sx={{
          width: '100%',
          // border: '1px solid blue',
          mb: 2,
        }}
      >
        <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
          <Table
            stickyHeader
            sx={{
              maxWidth: 1200,
              width: '100%',
              minWidth: 900,
              fontSize: '1rem',
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  padding: 0,
                }}
              >
                <TableCell
                  sx={{
                    padding: 0,
                  }}
                >
                  <IconButton onClick={addTableRow}>
                    <PlusOneIcon color='success' sx={{ fontSize: '1rem' }} />
                  </IconButton>
                </TableCell>
                <TableCell colSpan={8}></TableCell>
                <TableCell align='center'>
                  <Typography variant='subtitle1' align='center'>
                    {`${naklSumBuy.toFixed(2)}`}
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell align='center'>
                  <Typography variant='subtitle1' align='center'>
                    {`${naklSumSell.toFixed(2)}`}
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell align='center'>
                  <Typography variant='subtitle1' align='center'>
                    {`${marginSum.toFixed(2)}`}
                  </Typography>
                </TableCell>
                <TableCell colSpan={3} align='center'>
                  ff
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  padding: 0,
                }}
              >
                <TableCell
                  align='center'
                  sx={{
                    fontSize: '1rem',
                    width: '0.5rem',
                    // border: '1px solid red',
                    padding: 0,
                  }}
                >
                  №
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                >
                  Товар
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                >
                  <Tooltip title='Параметр'>
                    <JoinLeftIcon color='primary' sx={{ fontSize: '1rem' }} />
                  </Tooltip>
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                >
                  Норма на …
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                >
                  Расчетное Кол-во
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                >
                  <Tooltip title='Упаковка'>
                    <InventoryIcon color='primary' sx={{ fontSize: '1rem' }} />
                  </Tooltip>
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                >
                  Едениц
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                >
                  <Tooltip title='Единицы измерения'>
                    <StraightenIcon color='primary' sx={{ fontSize: '1rem' }} />
                  </Tooltip>
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                >
                  Цена Закуп
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                >
                  <Tooltip title='Сумма закупки'>
                    <FunctionsIcon color='primary' sx={{ fontSize: '1rem' }} />
                  </Tooltip>
                  Закупки
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                >
                  Цена Продажи
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                >
                  <Tooltip title='Сумма продажи'>
                    <FunctionsIcon color='primary' sx={{ fontSize: '1rem' }} />
                  </Tooltip>
                  продажи
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                >
                  разн на единице
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                >
                  Разница Всего
                </TableCell>
                <TableCell
                  align='center'
                  sx={{ width: '1rem', padding: 0 }}
                ></TableCell>
                <TableCell
                  align='center'
                  sx={{ width: '1rem', padding: 0 }}
                ></TableCell>
                <TableCell
                  align='center'
                  sx={{ width: '1rem', padding: 0 }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody
            // sx={{
            //   padding: 0,
            //   border: '1px solid red',
            // }}
            >
              {tableRows.length > 0 &&
                tableRows.map((row, rowIndex) => (
                  <TableRow
                    key={row.row_id}
                    sx={{
                      padding: 0,
                      // border: '1px solid red',
                      margin: 0,
                    }}
                  >
                    <TableCell
                      align='center'
                      sx={{
                        width: '0.5rem',
                        // border: '1px solid red',
                        padding: 0,
                      }}
                    >
                      <Typography variant='subtitle1' align='center'>
                        {`${rowIndex + 1}`}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{ width: 200, padding: '0 1px' }}
                    >
                      <Select
                        fullWidth
                        sx={{
                          padding: 0,
                          // border: '1px solid blue',
                        }}
                        id={`${row.row_id}-product`}
                        name={`${row.row_id}-product`}
                        value={row.product}
                        // label='product'
                        onChange={(e) => {
                          handleChangeSelectsInRow(row.row_id!, e);
                          // recalcRow(row.row_id!, 'parameter', true);
                        }}
                      >
                        {arr__Products?.map((item: I_Product) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item.productName}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* </FormControl> */}
                    </TableCell>
                    <TableCell align='center' sx={{ padding: '0 1px' }}>
                      <TextField
                        margin='dense'
                        name='parameter'
                        type='number'
                        id={`${row.row_id}-parameter`}
                        value={row.parameter ?? ''}
                        onChange={(e) =>
                          handleChangeInputsInRow(row.row_id!, 'parameter', e)
                        }
                        onBlur={() => recalcRow(row.row_id!, 'parameter')}
                        // sx={{ width: 50 }}
                      />
                    </TableCell>
                    <TableCell align='center' sx={{ padding: '0 1px' }}>
                      <TextField
                        margin='dense'
                        name='normPerOne'
                        // label='normPerOne'
                        type='number'
                        id={`${row.row_id}-normPerOne`}
                        value={row.normPerOne ?? ''}
                        onChange={(e) =>
                          handleChangeInputsInRow(row.row_id!, 'normPerOne', e)
                        }
                        inputProps={{
                          min: 0,
                          step: 0.001,
                        }}
                        disabled={
                          Number(row.parameter) <= 0 || row.parameter === ''
                        }
                        // InputProps={{
                        //   min: '0',
                        // }}
                      />
                      {/* <Typography variant='subtitle1' align='center'>
                        {`${row.normPerOne}`}
                      </Typography> */}
                    </TableCell>
                    <TableCell align='center' sx={{ padding: '0 1px' }}>
                      <TextField
                        margin='dense'
                        name='calcAmount'
                        // label='calcAmount'
                        type='number'
                        id={`${row.row_id}-calcAmount`}
                        value={row.calcAmount ?? ''}
                        onChange={(e) =>
                          handleChangeInputsInRow(row.row_id!, 'calcAmount', e)
                        }
                        disabled={
                          Number(row.parameter) <= 0 || row.parameter === ''
                        }
                        // sx={{ width: 200, mt: 1 }}
                      />
                    </TableCell>
                    <TableCell align='center' sx={{ padding: '0 1px' }}>
                      <TextField
                        margin='dense'
                        name='amountInPackage'
                        // label='amountInPackage'
                        type='number'
                        id={`${row.row_id}-amountInPackage`}
                        value={row.amountInPackage ?? ''}
                        onChange={(e) =>
                          handleChangeInputsInRow(
                            row.row_id!,
                            'amountInPackage',
                            e
                          )
                        }
                        disabled={
                          Number(row.parameter) <= 0 || row.parameter === ''
                        }
                        // sx={{ width: 200, mt: 1 }}
                      />
                      {/* <Typography variant='subtitle1' align='center'>
                        {`${row.amountInPackage}`}
                      </Typography> */}
                    </TableCell>
                    <TableCell align='center' sx={{ padding: '0 1px' }}>
                      <TextField
                        margin='dense'
                        name='amount'
                        // label='amount'
                        type='number'
                        id={`${row.row_id}-amount`}
                        value={row.amount ?? ''}
                        onChange={(e) =>
                          handleChangeInputsInRow(row.row_id!, 'amount', e)
                        }
                        // sx={{ width: 200, mt: 1 }}
                      />
                    </TableCell>
                    <TableCell align='center' sx={{ padding: '0 1px' }}>
                      <Typography variant='subtitle1' align='center'>
                        {`${row.unit}`}
                      </Typography>
                    </TableCell>
                    <TableCell align='center' sx={{ padding: '0 1px' }}>
                      <TextField
                        margin='dense'
                        name='priceBuyRecommend'
                        // label='priceBuyRecommend'
                        type='number'
                        id={`${row.row_id}-priceBuyRecommend`}
                        value={row.priceBuyRecommend ?? ''}
                        onChange={(e) =>
                          handleChangeInputsInRow(
                            row.row_id!,
                            'priceBuyRecommend',
                            e
                          )
                        }
                        // sx={{ width: 200, mt: 1 }}
                      />
                    </TableCell>
                    <TableCell align='center' sx={{ padding: '0 1px' }}>
                      <Typography variant='subtitle1' align='center'>
                        {`${row.rowSumBuy}`}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{ padding: '0 1px' }}
                    >{`${row.priceSell}`}</TableCell>
                    <TableCell align='center' sx={{ padding: '0 1px' }}>
                      <Typography variant='subtitle1' align='center'>
                        {`${row.rowSumSell}`}
                      </Typography>
                    </TableCell>
                    <TableCell align='center' sx={{ padding: '0 1px' }}>
                      <Typography variant='subtitle1' align='center'>
                        {`${row.deltaPerOne}`}
                      </Typography>
                    </TableCell>
                    <TableCell align='center' sx={{ padding: '0 1px' }}>
                      <Typography variant='subtitle1' align='center'>
                        {`${row.deltaPerRow}`}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        width: '0.5rem',
                        // border: '1px solid red',
                        padding: '0 1px',
                      }}
                    >
                      <IconButton onClick={() => deleteTableRow(row.row_id!)}>
                        <DeleteForeverIcon
                          color='error'
                          sx={{ fontSize: '1rem' }}
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        width: '0.5rem',
                        // border: '1px solid red',
                        padding: '0 1px',
                      }}
                    >
                      <IconButton
                        onClick={() => rowGoUp(rowIndex)}
                        disabled={rowIndex === 0}
                      >
                        <ArrowUpwardIcon
                          color='primary'
                          sx={{ fontSize: '1rem' }}
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        width: '0.5rem',
                        // border: '1px solid red',
                        padding: '0 1px',
                      }}
                    >
                      <IconButton
                        onClick={() => rowGowDown(rowIndex)}
                        disabled={rowIndex === tableRows.length - 1}
                      >
                        <ArrowDownwardIcon
                          color='primary'
                          sx={{ fontSize: '1rem' }}
                        />
                      </IconButton>
                    </TableCell>
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
            !typeNakl ||
            tableRows.length < 1
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

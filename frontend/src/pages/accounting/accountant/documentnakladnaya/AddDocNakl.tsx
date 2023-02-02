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
  I_Nakl_Row,
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
// import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const initState = {
  nakladnayaNumber: '',
  storeHouse: '',
  typeNakl: '',
  naklSumSell: 0,
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
  const [tableRows, set_tableRows] = useState<I_Nakl_Row[]>([]);

  const { nakladnayaNumber, storeHouse, typeNakl, naklSumSell } = formData;

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
      products: [], //todo
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
      unit: productUnit!,
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
      unit: '',
      amount: '',
      priceSell: '',
      rowSumSell: '',
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

  const recalcRow = (rowID: string) => {
    const tempRows = [...tableRows];
    const findRowIndex = tempRows.findIndex((item) => item.row_id === rowID);
    const findedRow = tempRows[findRowIndex];

    const recalcSum = Number(findedRow.amount) * Number(findedRow.priceSell);

    const updatedRow = {
      ...findedRow,
      rowSumSell: recalcSum.toFixed(2),
    };

    tempRows.splice(findRowIndex, 1, updatedRow);
    set_tableRows(tempRows);
    recalcAllTable();
  };

  const recalcAllTable = () => {
    let tempTotalSum = 0;
    tableRows.forEach((item) => {
      tempTotalSum += Number(item.amount) * Number(item.priceSell);
    });

    setFormdata((prevState) => ({
      ...prevState,
      naklSumSell: tempTotalSum,
    }));
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
                    <PlusOneIcon color='success' sx={{ fontSize: '2rem' }} />
                  </IconButton>
                </TableCell>
                <TableCell colSpan={5}></TableCell>
                <TableCell colSpan={3}>
                  <Typography>{`${naklSumSell.toFixed(2)}`}</Typography>
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
                  Од. Вимиру
                </TableCell>

                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                >
                  Кількість
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                >
                  Ціна без ПДВ,грн.
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                >
                  Сума без ПДВ,грн
                </TableCell>

                <TableCell
                  align='center'
                  sx={{
                    padding: 0,
                  }}
                  colSpan={3}
                >
                  Действия
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tableRows.length > 0 &&
                tableRows.map((row, rowIndex) => (
                  <TableRow
                    key={row.row_id}
                    sx={{
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    <TableCell
                      align='center'
                      sx={{
                        width: '0.5rem',
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
                        onChange={(e) => {
                          handleChangeSelectsInRow(row.row_id!, e);
                        }}
                      >
                        {arr__Products?.map((item) => (
                          <MenuItem key={item._id!} value={item._id!}>
                            {item.productName!}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align='center' sx={{ padding: '0 1px' }}>
                      <Typography variant='subtitle1' align='center'>
                        {`${row.unit}`}
                      </Typography>
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
                        onBlur={() => recalcRow(row.row_id!)}
                        // sx={{ width: 200, mt: 1 }}
                      />
                    </TableCell>
                    <TableCell align='center' sx={{ padding: '0 1px' }}>
                      <TextField
                        margin='dense'
                        name='priceSell'
                        // label='priceSell'
                        type='number'
                        id={`${row.row_id}-priceSell`}
                        value={row.priceSell ?? ''}
                        onChange={(e) =>
                          handleChangeInputsInRow(row.row_id!, 'priceSell', e)
                        }
                        onBlur={() => recalcRow(row.row_id!)}
                        // sx={{ width: 200, mt: 1 }}
                      />
                    </TableCell>

                    <TableCell align='center' sx={{ padding: '0 1px' }}>
                      <Typography variant='subtitle1' align='center'>
                        {row.rowSumSell!}
                      </Typography>
                    </TableCell>

                    <TableCell
                      align='center'
                      sx={{
                        width: '0.5rem',
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

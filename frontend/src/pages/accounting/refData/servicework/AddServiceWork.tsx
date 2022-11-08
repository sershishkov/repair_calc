import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import { servicework__add } from '../../../../features/accounting/refData/servicework/servicework__Slice';
import { unit__get_all } from '../../../../features/accounting/refData/unit/unit__Slice';
import { groupwork__get_all } from '../../../../features/accounting/refData/groupwork/groupwork__Slice';
import { product__get_all } from '../../../../features/accounting/refData/product/product__Slice';

import {
  I_Unit,
  // I_GroupWork,
  // I_Product,
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
  serviceWorkName: '',
  unit: '',
  priceWorker: '',
  priceClient: '',
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

function AddServiceWork() {
  const { isLoading } = useAppSelector(
    (state: RootState) => state.servicework__state
  );

  const arr__Units = useAppSelector(
    (state: RootState) => state.unit__state.items
  );
  const arr__groupWorks = useAppSelector(
    (state: RootState) => state.groupwork__state.items
  );
  const arr__AllProducts = useAppSelector(
    (state: RootState) => state.product__state.items
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormdata] = useState(initState);
  const [groupWork, set__groupWork] = React.useState<string[]>([]);
  const [products, set__products] = React.useState<string[]>([]);
  const [equipmentAndTools, set__equipmentAndTools] = React.useState<string[]>(
    []
  );

  const { serviceWorkName, unit, priceWorker, priceClient } = formData;

  useEffect(() => {
    dispatch(unit__get_all({ page: `0`, limit: `0` }));
    dispatch(groupwork__get_all({ page: `0`, limit: `0` }));
    dispatch(product__get_all({ page: `1`, limit: `50` }));
  }, [dispatch]);

  useEffect(() => {
    const inputFocus = document.getElementById('serviceWorkName');
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
      serviceWorkName,
      unit,
      priceWorker: priceWorker ? Number(priceWorker) : 0,
      priceClient: priceClient ? Number(priceClient) : 0,
      groupWork,
      products,
      equipmentAndTools,
      navigate,
    };

    dispatch(servicework__add(created__Data));
  };

  const handleChangeSelects = (event: SelectChangeEvent) => {
    setFormdata((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value as string,
    }));
  };

  const handleChangeMultipleSelects_groupWork = (
    event: SelectChangeEvent<typeof groupWork>
  ) => {
    const {
      target: { value },
    } = event;
    set__groupWork(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleChangeMultipleSelects_products = (
    event: SelectChangeEvent<typeof products>
  ) => {
    const {
      target: { value },
    } = event;
    set__products(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleChangeMultipleSelects_equipmentAndTools = (
    event: SelectChangeEvent<typeof equipmentAndTools>
  ) => {
    const {
      target: { value },
    } = event;
    set__equipmentAndTools(
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
          name='serviceWorkName'
          label='serviceWorkName'
          type='text'
          id='serviceWorkName'
          value={serviceWorkName}
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
            <InputLabel id='unit-label'>unit</InputLabel>
            <Select
              labelId='unit-label'
              id='unit'
              name='unit'
              value={unit}
              label='unit'
              onChange={handleChangeSelects}
            >
              {arr__Units?.map((item: I_Unit) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.unitName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={() => onClickAddItem('unit')}>
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='priceWorker'
          label='priceWorker'
          type='number'
          id='priceWorker'
          value={priceWorker}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='priceClient'
          label='priceClient'
          type='number'
          id='priceClient'
          value={priceClient}
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
            <InputLabel id='groupWork-label'>groupWork</InputLabel>
            <Select
              labelId='groupWork-label'
              id='groupWork'
              multiple
              value={groupWork}
              onChange={handleChangeMultipleSelects_groupWork}
              input={<OutlinedInput label='groupWork' />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const newItem = arr__groupWorks?.find(
                      (item) => item._id === value
                    );
                    return (
                      <Chip key={newItem?._id} label={newItem?.groupWorkName} />
                    );
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {arr__groupWorks?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  <Checkbox checked={groupWork.indexOf(item._id!) > -1} />
                  <ListItemText primary={item.groupWorkName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={() => onClickAddItem('groupwork')}>
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
            <InputLabel id='products-label'>products</InputLabel>
            <Select
              labelId='products-label'
              id='products'
              multiple
              value={products}
              onChange={handleChangeMultipleSelects_products}
              input={<OutlinedInput label='products' />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const newItem = arr__AllProducts?.find(
                      (item) => item._id === value
                    );
                    return (
                      <Chip key={newItem?._id} label={newItem?.productName} />
                    );
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {arr__AllProducts?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  <Checkbox checked={products.indexOf(item._id!) > -1} />
                  <ListItemText primary={item.productName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={() => onClickAddItem('products')}>
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
            <InputLabel id='equipmentAndTools-label'>
              equipmentAndTools
            </InputLabel>
            <Select
              labelId='equipmentAndTools-label'
              id='equipmentAndTools'
              multiple
              value={equipmentAndTools}
              onChange={handleChangeMultipleSelects_equipmentAndTools}
              input={<OutlinedInput label='equipmentAndTools' />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const newItem = arr__AllProducts?.find(
                      (item) => item._id === value
                    );
                    return (
                      <Chip key={newItem?._id} label={newItem?.productName} />
                    );
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {arr__AllProducts?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  <Checkbox checked={products.indexOf(item._id!) > -1} />
                  <ListItemText primary={item.productName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={() => onClickAddItem('products')}>
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={
            !serviceWorkName || !unit || groupWork.length === 0 || !priceWorker
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

export default AddServiceWork;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import { thirdPartyService__add } from '../../../../features/accounting/refData/thirdparty-service/thirdpartyService__Slice';
import { unit__get_all } from '../../../../features/accounting/refData/unit/unit__Slice';
import { grThirdPartyService__get_all } from '../../../../features/accounting/refData/group-thirdparty-service/grThirdpartyService__Slice';

import {
  I_Unit,
  I_GroupThirdPartyService,
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
  thirdPartyServiceName: '',
  unit: '',
  priceBuyRecommend: '',
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

function AddThirdPartyServ() {
  const { isLoading } = useAppSelector(
    (state: RootState) => state.thirdpartyService__state
  );

  const arr__Units = useAppSelector(
    (state: RootState) => state.unit__state.items
  );
  const arr__thirdPartyServices = useAppSelector(
    (state: RootState) => state.grThirdpartyService__state.items
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormdata] = useState(initState);
  const [groupThirdPartyService, set__groupThirdPartyService] = React.useState<
    string[]
  >([]);

  const { thirdPartyServiceName, unit, priceBuyRecommend } = formData;

  useEffect(() => {
    dispatch(unit__get_all({ page: `0`, limit: `0` }));
    dispatch(grThirdPartyService__get_all({ page: `0`, limit: `0` }));
  }, [dispatch]);

  useEffect(() => {
    const inputFocus = document.getElementById('thirdPartyServiceName');
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
      thirdPartyServiceName,
      unit,
      priceBuyRecommend: priceBuyRecommend ? Number(priceBuyRecommend) : 0,

      groupThirdPartyService,
      navigate,
    };

    dispatch(thirdPartyService__add(created__Data));
  };

  const handleChangeSelects = (event: SelectChangeEvent) => {
    setFormdata((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value as string,
    }));
  };

  const handleChangeMultipleSelects_groupThirdPartyService = (
    event: SelectChangeEvent<typeof groupThirdPartyService>
  ) => {
    const {
      target: { value },
    } = event;
    set__groupThirdPartyService(
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
          name='thirdPartyServiceName'
          label='thirdPartyServiceName'
          type='text'
          id='thirdPartyServiceName'
          value={thirdPartyServiceName}
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
          name='priceBuyRecommend'
          label='priceBuyRecommend'
          type='number'
          id='priceBuyRecommend'
          value={priceBuyRecommend}
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
            <InputLabel id='groupThirdPartyService-label'>
              groupThirdPartyService
            </InputLabel>
            <Select
              labelId='groupThirdPartyService-label'
              id='groupThirdPartyService'
              multiple
              value={groupThirdPartyService}
              onChange={handleChangeMultipleSelects_groupThirdPartyService}
              input={<OutlinedInput label='groupThirdPartyService' />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const newItem = arr__thirdPartyServices?.find(
                      (item: I_GroupThirdPartyService) => item._id === value
                    );
                    return (
                      <Chip
                        key={newItem?._id}
                        label={newItem?.groupThirdPartyServiceName}
                      />
                    );
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {arr__thirdPartyServices?.map(
                (item: I_GroupThirdPartyService) => (
                  <MenuItem key={item._id} value={item._id}>
                    <Checkbox
                      checked={groupThirdPartyService.indexOf(item._id!) > -1}
                    />
                    <ListItemText primary={item.groupThirdPartyServiceName} />
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <IconButton
            onClick={() => onClickAddItem('group-thirdparty-service')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={
            !thirdPartyServiceName ||
            !unit ||
            groupThirdPartyService.length === 0 ||
            !priceBuyRecommend
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

export default AddThirdPartyServ;

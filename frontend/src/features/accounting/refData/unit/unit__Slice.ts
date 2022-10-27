import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import unit__Service from './unit__Service';
import { I_Unit } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_Unit> {
  isLoading: boolean;
}

const initialState: I_State__ = {
  items: [],
  item: null,
  total: 0,
  totalPages: 0,

  isLoading: false,
};

export const unit__add = createAsyncThunk(
  'unit__add',
  async (unit__Data: I_Unit, thunkAPI) => {
    try {
      const { navigate } = unit__Data;
      delete unit__Data.navigate;
      const unit__new = await unit__Service.unit__add(unit__Data);
      toast.success('Добавлено успешно');
      setTimeout(() => {
        navigate!(-1);
      }, 2000);
      return unit__new;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unit__update = createAsyncThunk(
  'unit__update',
  async (unit__Data: I_Unit, thunkAPI) => {
    try {
      const { navigate } = unit__Data;
      delete unit__Data.navigate;
      const unit__new = await unit__Service.unit__update(unit__Data);
      toast.success('Изменено успешно');
      setTimeout(() => {
        navigate!(-1);
      }, 2000);
      return unit__new;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unit__get_one = createAsyncThunk(
  'unit__get_one',
  async (unit__Data: I_Unit, thunkAPI) => {
    try {
      return await unit__Service.unit__get_one(unit__Data);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unit__delete_one = createAsyncThunk(
  'unit__delete_one',
  async (unit__Data: I_Unit, thunkAPI) => {
    try {
      const deleted_item = await unit__Service.unit__delete_one(unit__Data);
      toast.success('Удалено успешно');
      return deleted_item;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unit__get_all = createAsyncThunk(
  'unit__get_all',
  async (unit__Data: I_Unit, thunkAPI) => {
    try {
      return await unit__Service.unit__get_all(unit__Data);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unit__Slice = createSlice({
  name: 'unit__',
  initialState,
  reducers: {
    // reset: (state) => {
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(unit__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unit__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);
        state.isLoading = false;
      })
      .addCase(unit__add.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(unit__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unit__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(unit__update.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(unit__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unit__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(unit__get_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(unit__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unit__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(unit__delete_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(unit__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unit__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(unit__get_all.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// export const { reset } = unit__Slice.actions;
export default unit__Slice.reducer;

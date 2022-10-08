import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import unit__Service from './unit__Service';
import { I_Unit } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_Unit> {
  isError: boolean;
  isSucces: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: I_State__ = {
  items: [],
  item: null,
  total: 0,
  totalPages: 0,

  isError: false,
  isSucces: false,
  isLoading: false,
  message: '',
};

export const unit__add = createAsyncThunk(
  'unit__add',
  async (unit__Data: I_Unit, thunkAPI) => {
    try {
      return await unit__Service.unit__add(unit__Data);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unit__update = createAsyncThunk(
  'unit__update',
  async (unit__Data: I_Unit, thunkAPI) => {
    try {
      return await unit__Service.unit__update(unit__Data);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

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

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unit__delete_one = createAsyncThunk(
  'unit__delete_one',
  async (unit__Data: I_Unit, thunkAPI) => {
    try {
      return await unit__Service.unit__delete_one(unit__Data);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

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

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unit__Slice = createSlice({
  name: 'unit__',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSucces = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(unit__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unit__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);

        state.isLoading = false;
        state.isSucces = true;
      })
      .addCase(unit__add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(unit__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unit__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(unit__update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(unit__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unit__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.item = action.payload;
      })
      .addCase(unit__get_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(unit__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unit__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(unit__delete_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(unit__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unit__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(unit__get_all.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
  },
});

export const { reset } = unit__Slice.actions;
export default unit__Slice.reducer;

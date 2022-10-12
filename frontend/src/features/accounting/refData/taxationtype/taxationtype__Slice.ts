import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import taxationtype__Service from './taxationtype__Service';
import { I_TaxationType } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_TaxationType> {
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

export const taxationtype__add = createAsyncThunk(
  'taxationtype__add',
  async (taxationtype__Data: I_TaxationType, thunkAPI) => {
    try {
      return await taxationtype__Service.taxationtype__add(taxationtype__Data);
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

export const taxationtype__update = createAsyncThunk(
  'taxationtype__update',
  async (taxationtype__Data: I_TaxationType, thunkAPI) => {
    try {
      return await taxationtype__Service.taxationtype__update(
        taxationtype__Data
      );
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

export const taxationtype__get_one = createAsyncThunk(
  'taxationtype__get_one',
  async (taxationtype__Data: I_TaxationType, thunkAPI) => {
    try {
      return await taxationtype__Service.taxationtype__get_one(
        taxationtype__Data
      );
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

export const taxationtype__delete_one = createAsyncThunk(
  'taxationtype__delete_one',
  async (taxationtype__Data: I_TaxationType, thunkAPI) => {
    try {
      return await taxationtype__Service.taxationtype__delete_one(
        taxationtype__Data
      );
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

export const taxationtype__get_all = createAsyncThunk(
  'taxationtype__get_all',
  async (taxationtype__Data: I_TaxationType, thunkAPI) => {
    try {
      return await taxationtype__Service.taxationtype__get_all(
        taxationtype__Data
      );
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

export const taxationtype__Slice = createSlice({
  name: 'taxationtype__',
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
      .addCase(taxationtype__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taxationtype__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);

        state.isLoading = false;
        state.isSucces = true;
      })
      .addCase(taxationtype__add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(taxationtype__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taxationtype__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(taxationtype__update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(taxationtype__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taxationtype__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.item = action.payload;
      })
      .addCase(taxationtype__get_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(taxationtype__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taxationtype__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(taxationtype__delete_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(taxationtype__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taxationtype__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(taxationtype__get_all.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
  },
});

export const { reset } = taxationtype__Slice.actions;
export default taxationtype__Slice.reducer;

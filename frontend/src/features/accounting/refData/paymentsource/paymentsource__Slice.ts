import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import paymentsource__Service from './paymentsource__Service';
import { I_PaymentSource } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_PaymentSource> {
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

export const paymentsource__add = createAsyncThunk(
  'paymentsource__add',
  async (paymentsource__Data: I_PaymentSource, thunkAPI) => {
    try {
      return await paymentsource__Service.paymentsource__add(
        paymentsource__Data
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

export const paymentsource__update = createAsyncThunk(
  'paymentsource__update',
  async (paymentsource__Data: I_PaymentSource, thunkAPI) => {
    try {
      return await paymentsource__Service.paymentsource__update(
        paymentsource__Data
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

export const paymentsource__get_one = createAsyncThunk(
  'paymentsource__get_one',
  async (paymentsource__Data: I_PaymentSource, thunkAPI) => {
    try {
      return await paymentsource__Service.paymentsource__get_one(
        paymentsource__Data
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

export const paymentsource__delete_one = createAsyncThunk(
  'paymentsource__delete_one',
  async (paymentsource__Data: I_PaymentSource, thunkAPI) => {
    try {
      return await paymentsource__Service.paymentsource__delete_one(
        paymentsource__Data
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

export const paymentsource__get_all = createAsyncThunk(
  'paymentsource__get_all',
  async (paymentsource__Data: I_PaymentSource, thunkAPI) => {
    try {
      return await paymentsource__Service.paymentsource__get_all(
        paymentsource__Data
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

export const paymentsource__Slice = createSlice({
  name: 'paymentsource__',
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
      .addCase(paymentsource__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paymentsource__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);

        state.isLoading = false;
        state.isSucces = true;
      })
      .addCase(paymentsource__add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(paymentsource__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paymentsource__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(paymentsource__update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(paymentsource__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paymentsource__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.item = action.payload;
      })
      .addCase(paymentsource__get_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(paymentsource__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paymentsource__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(paymentsource__delete_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(paymentsource__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paymentsource__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(paymentsource__get_all.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
  },
});

export const { reset } = paymentsource__Slice.actions;
export default paymentsource__Slice.reducer;

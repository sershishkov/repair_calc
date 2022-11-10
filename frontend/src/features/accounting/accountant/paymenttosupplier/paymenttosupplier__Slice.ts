import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import current__Service from './paymenttosupplier__Service';
import { I_PaymentToSupplier } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_PaymentToSupplier> {
  isLoading: boolean;
}

const initialState: I_State__ = {
  items: [],
  item: null,
  total: 0,
  totalPages: 0,

  isLoading: false,
};

export const paymenttosupplier__add = createAsyncThunk(
  'paymenttosupplier__add',
  async (dataObject: I_PaymentToSupplier, thunkAPI) => {
    try {
      const { navigate } = dataObject;
      delete dataObject.navigate;
      const newItem = await current__Service.item__add(dataObject);

      toast.success('Добавлено успешно');

      setTimeout(() => {
        navigate!(-1);
      }, 2000);

      return newItem;
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

export const paymenttosupplier__update = createAsyncThunk(
  'paymenttosupplier__update',
  async (dataObject: I_PaymentToSupplier, thunkAPI) => {
    try {
      const { navigate } = dataObject;
      delete dataObject.navigate;
      const updatedItem = await current__Service.item__update(dataObject);

      toast.success('Изменено успешно');

      setTimeout(() => {
        navigate!(-1);
      }, 2000);

      return updatedItem;
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

export const paymenttosupplier__get_one = createAsyncThunk(
  'paymenttosupplier__get_one',
  async (dataObject: I_PaymentToSupplier, thunkAPI) => {
    try {
      return await current__Service.item__get_one(dataObject);
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

export const paymenttosupplier__delete_one = createAsyncThunk(
  'paymenttosupplier__delete_one',
  async (dataObject: I_PaymentToSupplier, thunkAPI) => {
    try {
      return await current__Service.item__delete_one(dataObject);
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

export const paymenttosupplier__get_all = createAsyncThunk(
  'paymenttosupplier__get_all',
  async (dataObject: I_PaymentToSupplier, thunkAPI) => {
    try {
      return await current__Service.item__get_all(dataObject);
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

export const paymenttosupplier__Slice = createSlice({
  name: 'paymenttosupplier__',
  initialState,
  reducers: {
    // reset: (state) => {
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(paymenttosupplier__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paymenttosupplier__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);
        state.isLoading = false;
      })
      .addCase(paymenttosupplier__add.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(paymenttosupplier__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paymenttosupplier__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(paymenttosupplier__update.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(paymenttosupplier__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paymenttosupplier__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(paymenttosupplier__get_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(paymenttosupplier__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paymenttosupplier__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(paymenttosupplier__delete_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(paymenttosupplier__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paymenttosupplier__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(paymenttosupplier__get_all.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// export const { reset } = paymenttosupplier__Slice.actions;
export default paymenttosupplier__Slice.reducer;

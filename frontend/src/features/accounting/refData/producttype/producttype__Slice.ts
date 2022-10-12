import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import producttype__Service from './producttype__Service';
import { I_ProductType } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_ProductType> {
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

export const producttype__add = createAsyncThunk(
  'producttype__add',
  async (producttype__Data: I_ProductType, thunkAPI) => {
    try {
      return await producttype__Service.producttype__add(producttype__Data);
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

export const producttype__update = createAsyncThunk(
  'producttype__update',
  async (producttype__Data: I_ProductType, thunkAPI) => {
    try {
      return await producttype__Service.producttype__update(producttype__Data);
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

export const producttype__get_one = createAsyncThunk(
  'producttype__get_one',
  async (producttype__Data: I_ProductType, thunkAPI) => {
    try {
      return await producttype__Service.producttype__get_one(producttype__Data);
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

export const producttype__delete_one = createAsyncThunk(
  'producttype__delete_one',
  async (producttype__Data: I_ProductType, thunkAPI) => {
    try {
      return await producttype__Service.producttype__delete_one(
        producttype__Data
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

export const producttype__get_all = createAsyncThunk(
  'producttype__get_all',
  async (producttype__Data: I_ProductType, thunkAPI) => {
    try {
      return await producttype__Service.producttype__get_all(producttype__Data);
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

export const producttype__Slice = createSlice({
  name: 'producttype__',
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
      .addCase(producttype__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(producttype__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);

        state.isLoading = false;
        state.isSucces = true;
      })
      .addCase(producttype__add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(producttype__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(producttype__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(producttype__update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(producttype__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(producttype__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.item = action.payload;
      })
      .addCase(producttype__get_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(producttype__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(producttype__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(producttype__delete_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(producttype__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(producttype__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(producttype__get_all.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
  },
});

export const { reset } = producttype__Slice.actions;
export default producttype__Slice.reducer;

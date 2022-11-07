import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import current__Service from './product__Service';
import { I_Product } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_Product> {
  isLoading: boolean;
}

const initialState: I_State__ = {
  items: [],
  item: null,
  total: 0,
  totalPages: 0,

  isLoading: false,
};

export const product__add = createAsyncThunk(
  'product__add',
  async (dataObject: I_Product, thunkAPI) => {
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

export const product__update = createAsyncThunk(
  'product__update',
  async (dataObject: I_Product, thunkAPI) => {
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

export const product__get_one = createAsyncThunk(
  'product__get_one',
  async (dataObject: I_Product, thunkAPI) => {
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

export const product__delete_one = createAsyncThunk(
  'product__delete_one',
  async (dataObject: I_Product, thunkAPI) => {
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

export const product__get_all = createAsyncThunk(
  'product__get_all',
  async (dataObject: I_Product, thunkAPI) => {
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

export const product__Slice = createSlice({
  name: 'product__',
  initialState,
  reducers: {
    // reset: (state) => {
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(product__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(product__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);
        state.isLoading = false;
      })
      .addCase(product__add.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(product__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(product__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(product__update.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(product__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(product__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(product__get_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(product__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(product__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(product__delete_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(product__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(product__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(product__get_all.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// export const { reset } = product__Slice.actions;
export default product__Slice.reducer;

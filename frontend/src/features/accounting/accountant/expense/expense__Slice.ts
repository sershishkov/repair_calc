import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import current__Service from './expense__Service';
import { I_Expense } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_Expense> {
  isLoading: boolean;
}

const initialState: I_State__ = {
  items: [],
  item: null,
  total: 0,
  totalPages: 0,

  isLoading: false,
};

export const expense__add = createAsyncThunk(
  'expense__add',
  async (dataObject: I_Expense, thunkAPI) => {
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

export const expense__update = createAsyncThunk(
  'expense__update',
  async (dataObject: I_Expense, thunkAPI) => {
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

export const expense__get_one = createAsyncThunk(
  'expense__get_one',
  async (dataObject: I_Expense, thunkAPI) => {
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

export const expense__delete_one = createAsyncThunk(
  'expense__delete_one',
  async (dataObject: I_Expense, thunkAPI) => {
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

export const expense__get_all = createAsyncThunk(
  'expense__get_all',
  async (dataObject: I_Expense, thunkAPI) => {
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

export const expense__Slice = createSlice({
  name: 'expense__',
  initialState,
  reducers: {
    // reset: (state) => {
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(expense__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(expense__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);
        state.isLoading = false;
      })
      .addCase(expense__add.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(expense__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(expense__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(expense__update.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(expense__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(expense__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(expense__get_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(expense__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(expense__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(expense__delete_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(expense__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(expense__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(expense__get_all.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// export const { reset } = expense__Slice.actions;
export default expense__Slice.reducer;

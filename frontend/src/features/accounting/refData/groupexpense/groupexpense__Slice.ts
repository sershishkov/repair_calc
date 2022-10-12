import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import groupexpense__Service from './groupexpense__Service';
import { I_GroupExpense } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_GroupExpense> {
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

export const groupexpense__add = createAsyncThunk(
  'groupexpense__add',
  async (groupexpense__Data: I_GroupExpense, thunkAPI) => {
    try {
      return await groupexpense__Service.groupexpense__add(groupexpense__Data);
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

export const groupexpense__update = createAsyncThunk(
  'groupexpense__update',
  async (groupexpense__Data: I_GroupExpense, thunkAPI) => {
    try {
      return await groupexpense__Service.groupexpense__update(
        groupexpense__Data
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

export const groupexpense__get_one = createAsyncThunk(
  'groupexpense__get_one',
  async (groupexpense__Data: I_GroupExpense, thunkAPI) => {
    try {
      return await groupexpense__Service.groupexpense__get_one(
        groupexpense__Data
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

export const groupexpense__delete_one = createAsyncThunk(
  'groupexpense__delete_one',
  async (groupexpense__Data: I_GroupExpense, thunkAPI) => {
    try {
      return await groupexpense__Service.groupexpense__delete_one(
        groupexpense__Data
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

export const groupexpense__get_all = createAsyncThunk(
  'groupexpense__get_all',
  async (groupexpense__Data: I_GroupExpense, thunkAPI) => {
    try {
      return await groupexpense__Service.groupexpense__get_all(
        groupexpense__Data
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

export const groupexpense__Slice = createSlice({
  name: 'groupexpense__',
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
      .addCase(groupexpense__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupexpense__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);

        state.isLoading = false;
        state.isSucces = true;
      })
      .addCase(groupexpense__add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(groupexpense__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupexpense__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(groupexpense__update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(groupexpense__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupexpense__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.item = action.payload;
      })
      .addCase(groupexpense__get_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(groupexpense__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupexpense__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(groupexpense__delete_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(groupexpense__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupexpense__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(groupexpense__get_all.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
  },
});

export const { reset } = groupexpense__Slice.actions;
export default groupexpense__Slice.reducer;

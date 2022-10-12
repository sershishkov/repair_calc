import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import groupproduct__Service from './groupproduct__Service';
import { I_GroupProduct } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_GroupProduct> {
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

export const groupproduct__add = createAsyncThunk(
  'groupproduct__add',
  async (groupproduct__Data: I_GroupProduct, thunkAPI) => {
    try {
      return await groupproduct__Service.groupproduct__add(groupproduct__Data);
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

export const groupproduct__update = createAsyncThunk(
  'groupproduct__update',
  async (groupproduct__Data: I_GroupProduct, thunkAPI) => {
    try {
      return await groupproduct__Service.groupproduct__update(
        groupproduct__Data
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

export const groupproduct__get_one = createAsyncThunk(
  'groupproduct__get_one',
  async (groupproduct__Data: I_GroupProduct, thunkAPI) => {
    try {
      return await groupproduct__Service.groupproduct__get_one(
        groupproduct__Data
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

export const groupproduct__delete_one = createAsyncThunk(
  'groupproduct__delete_one',
  async (groupproduct__Data: I_GroupProduct, thunkAPI) => {
    try {
      return await groupproduct__Service.groupproduct__delete_one(
        groupproduct__Data
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

export const groupproduct__get_all = createAsyncThunk(
  'groupproduct__get_all',
  async (groupproduct__Data: I_GroupProduct, thunkAPI) => {
    try {
      return await groupproduct__Service.groupproduct__get_all(
        groupproduct__Data
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

export const groupproduct__Slice = createSlice({
  name: 'groupproduct__',
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
      .addCase(groupproduct__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupproduct__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);

        state.isLoading = false;
        state.isSucces = true;
      })
      .addCase(groupproduct__add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(groupproduct__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupproduct__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(groupproduct__update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(groupproduct__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupproduct__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.item = action.payload;
      })
      .addCase(groupproduct__get_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(groupproduct__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupproduct__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(groupproduct__delete_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(groupproduct__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupproduct__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(groupproduct__get_all.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
  },
});

export const { reset } = groupproduct__Slice.actions;
export default groupproduct__Slice.reducer;

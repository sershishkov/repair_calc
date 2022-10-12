import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import firmtype__Service from './firmtype__Service';
import { I_FirmType } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_FirmType> {
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

export const firmtype__add = createAsyncThunk(
  'firmtype__add',
  async (firmtype__Data: I_FirmType, thunkAPI) => {
    try {
      return await firmtype__Service.firmtype__add(firmtype__Data);
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

export const firmtype__update = createAsyncThunk(
  'firmtype__update',
  async (firmtype__Data: I_FirmType, thunkAPI) => {
    try {
      return await firmtype__Service.firmtype__update(firmtype__Data);
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

export const firmtype__get_one = createAsyncThunk(
  'firmtype__get_one',
  async (firmtype__Data: I_FirmType, thunkAPI) => {
    try {
      return await firmtype__Service.firmtype__get_one(firmtype__Data);
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

export const firmtype__delete_one = createAsyncThunk(
  'firmtype__delete_one',
  async (firmtype__Data: I_FirmType, thunkAPI) => {
    try {
      return await firmtype__Service.firmtype__delete_one(firmtype__Data);
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

export const firmtype__get_all = createAsyncThunk(
  'firmtype__get_all',
  async (firmtype__Data: I_FirmType, thunkAPI) => {
    try {
      return await firmtype__Service.firmtype__get_all(firmtype__Data);
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

export const firmtype__Slice = createSlice({
  name: 'firmtype__',
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
      .addCase(firmtype__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(firmtype__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);

        state.isLoading = false;
        state.isSucces = true;
      })
      .addCase(firmtype__add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(firmtype__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(firmtype__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(firmtype__update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(firmtype__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(firmtype__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.item = action.payload;
      })
      .addCase(firmtype__get_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(firmtype__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(firmtype__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(firmtype__delete_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(firmtype__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(firmtype__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(firmtype__get_all.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
  },
});

export const { reset } = firmtype__Slice.actions;
export default firmtype__Slice.reducer;

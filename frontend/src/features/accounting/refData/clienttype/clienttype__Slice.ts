import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import clienttype__Service from './clienttype__Service';
import { I_ClientType } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_ClientType> {
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

export const clienttype__add = createAsyncThunk(
  'clienttype__add',
  async (clienttype__Data: I_ClientType, thunkAPI) => {
    try {
      return await clienttype__Service.clienttype__add(clienttype__Data);
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

export const clienttype__update = createAsyncThunk(
  'clienttype__update',
  async (clienttype__Data: I_ClientType, thunkAPI) => {
    try {
      return await clienttype__Service.clienttype__update(clienttype__Data);
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

export const clienttype__get_one = createAsyncThunk(
  'clienttype__get_one',
  async (clienttype__Data: I_ClientType, thunkAPI) => {
    try {
      return await clienttype__Service.clienttype__get_one(clienttype__Data);
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

export const clienttype__delete_one = createAsyncThunk(
  'clienttype__delete_one',
  async (clienttype__Data: I_ClientType, thunkAPI) => {
    try {
      return await clienttype__Service.clienttype__delete_one(clienttype__Data);
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

export const clienttype__get_all = createAsyncThunk(
  'clienttype__get_all',
  async (clienttype__Data: I_ClientType, thunkAPI) => {
    try {
      return await clienttype__Service.clienttype__get_all(clienttype__Data);
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

export const clienttype__Slice = createSlice({
  name: 'clienttype__',
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
      .addCase(clienttype__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clienttype__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);

        state.isLoading = false;
        state.isSucces = true;
      })
      .addCase(clienttype__add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(clienttype__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clienttype__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(clienttype__update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(clienttype__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clienttype__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.item = action.payload;
      })
      .addCase(clienttype__get_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(clienttype__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clienttype__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(clienttype__delete_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(clienttype__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clienttype__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(clienttype__get_all.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
  },
});

export const { reset } = clienttype__Slice.actions;
export default clienttype__Slice.reducer;

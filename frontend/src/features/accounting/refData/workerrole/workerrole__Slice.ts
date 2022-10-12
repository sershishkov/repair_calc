import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import workerrole__Service from './workerrole__Service';
import { I_WorkerRole } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_WorkerRole> {
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

export const workerrole__add = createAsyncThunk(
  'workerrole__add',
  async (workerrole__Data: I_WorkerRole, thunkAPI) => {
    try {
      return await workerrole__Service.workerrole__add(workerrole__Data);
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

export const workerrole__update = createAsyncThunk(
  'workerrole__update',
  async (workerrole__Data: I_WorkerRole, thunkAPI) => {
    try {
      return await workerrole__Service.workerrole__update(workerrole__Data);
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

export const workerrole__get_one = createAsyncThunk(
  'workerrole__get_one',
  async (workerrole__Data: I_WorkerRole, thunkAPI) => {
    try {
      return await workerrole__Service.workerrole__get_one(workerrole__Data);
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

export const workerrole__delete_one = createAsyncThunk(
  'workerrole__delete_one',
  async (workerrole__Data: I_WorkerRole, thunkAPI) => {
    try {
      return await workerrole__Service.workerrole__delete_one(workerrole__Data);
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

export const workerrole__get_all = createAsyncThunk(
  'workerrole__get_all',
  async (workerrole__Data: I_WorkerRole, thunkAPI) => {
    try {
      return await workerrole__Service.workerrole__get_all(workerrole__Data);
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

export const workerrole__Slice = createSlice({
  name: 'workerrole__',
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
      .addCase(workerrole__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(workerrole__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);

        state.isLoading = false;
        state.isSucces = true;
      })
      .addCase(workerrole__add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(workerrole__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(workerrole__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(workerrole__update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(workerrole__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(workerrole__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.item = action.payload;
      })
      .addCase(workerrole__get_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(workerrole__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(workerrole__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(workerrole__delete_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(workerrole__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(workerrole__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(workerrole__get_all.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
  },
});

export const { reset } = workerrole__Slice.actions;
export default workerrole__Slice.reducer;

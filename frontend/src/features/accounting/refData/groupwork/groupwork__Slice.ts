import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import groupwork__Service from './groupwork__Service';
import { I_GroupWork } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_GroupWork> {
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

export const groupwork__add = createAsyncThunk(
  'groupwork__add',
  async (groupwork__Data: I_GroupWork, thunkAPI) => {
    try {
      return await groupwork__Service.groupwork__add(groupwork__Data);
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

export const groupwork__update = createAsyncThunk(
  'groupwork__update',
  async (groupwork__Data: I_GroupWork, thunkAPI) => {
    try {
      return await groupwork__Service.groupwork__update(groupwork__Data);
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

export const groupwork__get_one = createAsyncThunk(
  'groupwork__get_one',
  async (groupwork__Data: I_GroupWork, thunkAPI) => {
    try {
      return await groupwork__Service.groupwork__get_one(groupwork__Data);
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

export const groupwork__delete_one = createAsyncThunk(
  'groupwork__delete_one',
  async (groupwork__Data: I_GroupWork, thunkAPI) => {
    try {
      return await groupwork__Service.groupwork__delete_one(groupwork__Data);
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

export const groupwork__get_all = createAsyncThunk(
  'groupwork__get_all',
  async (groupwork__Data: I_GroupWork, thunkAPI) => {
    try {
      return await groupwork__Service.groupwork__get_all(groupwork__Data);
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

export const groupwork__Slice = createSlice({
  name: 'groupwork__',
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
      .addCase(groupwork__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupwork__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);

        state.isLoading = false;
        state.isSucces = true;
      })
      .addCase(groupwork__add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(groupwork__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupwork__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(groupwork__update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(groupwork__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupwork__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.item = action.payload;
      })
      .addCase(groupwork__get_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(groupwork__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupwork__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(groupwork__delete_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(groupwork__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupwork__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(groupwork__get_all.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
  },
});

export const { reset } = groupwork__Slice.actions;
export default groupwork__Slice.reducer;

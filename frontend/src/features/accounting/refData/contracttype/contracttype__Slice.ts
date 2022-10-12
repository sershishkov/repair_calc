import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import contracttype__Service from './contracttype__Service';
import { I_ContractType } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_ContractType> {
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

export const contracttype__add = createAsyncThunk(
  'contracttype__add',
  async (contracttype__Data: I_ContractType, thunkAPI) => {
    try {
      return await contracttype__Service.contracttype__add(contracttype__Data);
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

export const contracttype__update = createAsyncThunk(
  'contracttype__update',
  async (contracttype__Data: I_ContractType, thunkAPI) => {
    try {
      return await contracttype__Service.contracttype__update(
        contracttype__Data
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

export const contracttype__get_one = createAsyncThunk(
  'contracttype__get_one',
  async (contracttype__Data: I_ContractType, thunkAPI) => {
    try {
      return await contracttype__Service.contracttype__get_one(
        contracttype__Data
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

export const contracttype__delete_one = createAsyncThunk(
  'contracttype__delete_one',
  async (contracttype__Data: I_ContractType, thunkAPI) => {
    try {
      return await contracttype__Service.contracttype__delete_one(
        contracttype__Data
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

export const contracttype__get_all = createAsyncThunk(
  'contracttype__get_all',
  async (contracttype__Data: I_ContractType, thunkAPI) => {
    try {
      return await contracttype__Service.contracttype__get_all(
        contracttype__Data
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

export const contracttype__Slice = createSlice({
  name: 'contracttype__',
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
      .addCase(contracttype__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contracttype__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);

        state.isLoading = false;
        state.isSucces = true;
      })
      .addCase(contracttype__add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(contracttype__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contracttype__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(contracttype__update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(contracttype__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contracttype__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.item = action.payload;
      })
      .addCase(contracttype__get_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(contracttype__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contracttype__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(contracttype__delete_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(contracttype__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contracttype__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(contracttype__get_all.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
  },
});

export const { reset } = contracttype__Slice.actions;
export default contracttype__Slice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import current__Service from './contracttype__Service';
import { I_ContractType } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_ContractType> {
  isLoading: boolean;
}

const initialState: I_State__ = {
  items: [],
  item: null,
  total: 0,
  totalPages: 0,

  isLoading: false,
};

export const contracttype__add = createAsyncThunk(
  'contracttype__add',
  async (dataObject: I_ContractType, thunkAPI) => {
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

export const contracttype__update = createAsyncThunk(
  'contracttype__update',
  async (dataObject: I_ContractType, thunkAPI) => {
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

export const contracttype__get_one = createAsyncThunk(
  'contracttype__get_one',
  async (dataObject: I_ContractType, thunkAPI) => {
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

export const contracttype__delete_one = createAsyncThunk(
  'contracttype__delete_one',
  async (dataObject: I_ContractType, thunkAPI) => {
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

export const contracttype__get_all = createAsyncThunk(
  'contracttype__get_all',
  async (dataObject: I_ContractType, thunkAPI) => {
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

export const contracttype__Slice = createSlice({
  name: 'contracttype__',
  initialState,
  reducers: {
    // reset: (state) => {
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(contracttype__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contracttype__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);
        state.isLoading = false;
      })
      .addCase(contracttype__add.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(contracttype__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contracttype__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(contracttype__update.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(contracttype__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contracttype__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(contracttype__get_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(contracttype__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contracttype__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(contracttype__delete_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(contracttype__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contracttype__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(contracttype__get_all.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// export const { reset } = contracttype__Slice.actions;
export default contracttype__Slice.reducer;

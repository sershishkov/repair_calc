import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import current__Service from './firmtype__Service';
import { I_FirmType } from '../../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../../interfaces/CommonInterfaces';

export interface I_State__ extends I_ServerResponse<I_FirmType> {
  isLoading: boolean;
}

const initialState: I_State__ = {
  items: [],
  item: null,
  total: 0,
  totalPages: 0,

  isLoading: false,
};

export const firmtype__add = createAsyncThunk(
  'firmtype__add',
  async (dataObject: I_FirmType, thunkAPI) => {
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

export const firmtype__update = createAsyncThunk(
  'firmtype__update',
  async (dataObject: I_FirmType, thunkAPI) => {
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

export const firmtype__get_one = createAsyncThunk(
  'firmtype__get_one',
  async (dataObject: I_FirmType, thunkAPI) => {
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

export const firmtype__delete_one = createAsyncThunk(
  'firmtype__delete_one',
  async (dataObject: I_FirmType, thunkAPI) => {
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

export const firmtype__get_all = createAsyncThunk(
  'firmtype__get_all',
  async (dataObject: I_FirmType, thunkAPI) => {
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

export const firmtype__Slice = createSlice({
  name: 'firmtype__',
  initialState,
  reducers: {
    // reset: (state) => {
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(firmtype__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(firmtype__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);
        state.isLoading = false;
      })
      .addCase(firmtype__add.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(firmtype__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(firmtype__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(firmtype__update.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(firmtype__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(firmtype__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(firmtype__get_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(firmtype__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(firmtype__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(firmtype__delete_one.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(firmtype__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(firmtype__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(firmtype__get_all.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// export const { reset } = firmtype__Slice.actions;
export default firmtype__Slice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import user__Service from './user__Service';
import { I_AuthRequest, I_AuthResponse } from '../../interfaces/UserInterfaces';
import { I_ServerResponse } from '../../interfaces/CommonInterfaces';

export interface I_State__User extends I_ServerResponse<I_AuthResponse> {
  isError: boolean;
  isSucces: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: I_State__User = {
  items: [],
  item: null,
  total: 0,
  totalPages: 0,

  isError: false,
  isSucces: false,
  isLoading: false,
  message: '',
};

export const user__add = createAsyncThunk(
  'user__add',
  async (user__Data: I_AuthRequest, thunkAPI) => {
    try {
      return await user__Service.user__add(user__Data);
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

export const user__update = createAsyncThunk(
  'user__update',
  async (user__Data: I_AuthRequest, thunkAPI) => {
    try {
      return await user__Service.user__update(user__Data);
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

export const user__get_one = createAsyncThunk(
  'user__get_one',
  async (user__Data: I_AuthRequest, thunkAPI) => {
    try {
      return await user__Service.user__get_one(user__Data);
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

export const user__delete_one = createAsyncThunk(
  'user__delete_one',
  async (user__Data: I_AuthRequest, thunkAPI) => {
    try {
      return await user__Service.user__delete_one(user__Data);
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

export const user__get_all = createAsyncThunk(
  'user__get_all',
  async (user__Data: I_AuthRequest, thunkAPI) => {
    try {
      return await user__Service.user__get_all(user__Data);
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

export const user__Slice = createSlice({
  name: 'user__',
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
      .addCase(user__add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(user__add.fulfilled, (state, action) => {
        state.items?.push(action.payload!);

        state.isLoading = false;
        state.isSucces = true;
      })
      .addCase(user__add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(user__update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(user__update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      })
      .addCase(user__update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(user__get_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(user__get_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.item = action.payload;
      })
      .addCase(user__get_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(user__delete_one.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(user__delete_one.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = state.items?.filter(
          (item) => item._id !== action.payload?._id
        );
      })
      .addCase(user__delete_one.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      })

      .addCase(user__get_all.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(user__get_all.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.items = action.payload?.items;
        state.total = action.payload?.total;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(user__get_all.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = `${action.payload}`;
      });
  },
});

export const { reset } = user__Slice.actions;
export default user__Slice.reducer;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import themeSlice from '../features/theme/themeSlice';

import user__Slice from '../features/users/user__Slice';
import unit__Slice from '../features/accounting/refData/unit/unit__Slice';
import firmtype__Slice from '../features/accounting/refData/firmtype/firmtype__Slice';

export const store = configureStore({
  reducer: {
    auth_state: authSlice,
    theme_state: themeSlice,

    user__state: user__Slice,
    unit__state: unit__Slice,
    firmtype__state: firmtype__Slice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SUPER_ADMIN_ROLES, isAuthenticated, role, token } from '@/constants';
import { TRootState } from '@/types';
import { clearLocalStorage, getLocalStorage, setLocalStorage } from '@/utils';

type TAuthState = {
  isAuthenticated: boolean;
  token: string | null;
  role: string[];
};

const initialState: TAuthState = {
  isAuthenticated: getLocalStorage(isAuthenticated) ?? false,
  token: getLocalStorage(token) || null,
  role: getLocalStorage(role, true) || [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ access_token: any }>) => {
      state.isAuthenticated = true;
      state.token = action.payload?.access_token;
      state.role = [SUPER_ADMIN_ROLES];

      setLocalStorage(isAuthenticated, true);
      setLocalStorage(token, action.payload?.access_token);
      setLocalStorage(role, SUPER_ADMIN_ROLES, true);
    },
    logOut: () => {
      window.location.reload();
      clearLocalStorage();
    },
  },
});

export const { logOut, signIn } = authSlice.actions;
export const authConfigReducer = authSlice.reducer;
export const authConfigSelector = (state: TRootState) => state.authConfig;

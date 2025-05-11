import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { themeConfigReducer } from './theme';
import { authConfigReducer } from './auth-slice';
import { materialityConfigReducer } from './materiality';

export const rootReducer = combineReducers({
  themeConfig: themeConfigReducer,
  authConfig: authConfigReducer,
  materialityConfig: materialityConfigReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export * from './theme';
export * from './auth-slice';
export * from './materiality';

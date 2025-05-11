import { createSlice } from '@reduxjs/toolkit';

import { TRootState } from '@/types';

// Slice (state va reducerni yaratish)
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: null, kmoRoleId: null },
  reducers: {
    change: (state, { payload }) => {
      state.value = payload;
    },
    setkmoRoleId: (state, { payload }) => {
      state.kmoRoleId = payload;
    },
  },
});

// Export actions va store
export const materialityConfigActions = counterSlice.actions;
export const materialityConfigReducer = counterSlice.reducer;
export const materialityConfigSelector = (state: TRootState) => state.materialityConfig;

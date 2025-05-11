import { rootReducer, store } from '@/store';

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof rootReducer>;

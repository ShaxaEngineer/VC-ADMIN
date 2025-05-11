import { useDispatch } from 'react-redux';

import { TAppDispatch } from '@/types';

export const useAppDispatch = () => useDispatch<TAppDispatch>();

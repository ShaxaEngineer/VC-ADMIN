import { useAppSelector } from '@/hooks';
import { authConfigSelector } from '@/store';
import React from 'react';
import { Login } from './lazy.routes';

interface PrivateProps {
  children: React.ReactNode;
}

export const Private: React.FC<PrivateProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector(authConfigSelector);
  if (isAuthenticated) return children;
  return <Login />;
};

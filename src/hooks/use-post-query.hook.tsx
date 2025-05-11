/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useLang } from '@/hooks';
import { api } from '@/service';

interface MutationProps {
  url?: string;
  method?: string;
  data?: Record<string, any>;
  config?: Record<string, any>;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const usePost: any = () => {
  const [isLoading, setisLoading] = useState(false);
  const queryClient = useQueryClient();
  const { nowlang } = useLang();
  const {
    data,
    error,
    isError,
    isIdle,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset,
    status,
  } = useMutation({
    mutationFn: async ({
      url = '',
      method = 'POST',
      data = {},
      config = { headers: { language: nowlang } },
      onSuccess = () => {},
      onError = () => {},
    }: MutationProps) => {
      setisLoading(true);
      try {
        const res = await api({ method: method, url, data, ...config });
        onSuccess(res);
        setisLoading(false);
        return res;
      } catch (err) {
        onError(err);
        setisLoading(false);
        throw err;
      }
    },
  });

  const reloadQueryKey = (queryKey: any) => {
    queryClient.invalidateQueries({ queryKey }); // belgilangan key dagi data yangilanadi bu array buladi
  };

  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset,
    status,
    reloadQueryKey,
  };
};

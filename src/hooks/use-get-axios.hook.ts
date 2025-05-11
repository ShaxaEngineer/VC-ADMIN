/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from 'axios';

import { api } from '@/service';

interface GetAxiosProps {
  url?: string;
  config?: AxiosRequestConfig;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const GetAxios = ({
  url = '',
  config = {},
  onSuccess = () => {},
  onError = () => {},
}: GetAxiosProps): void => {
  api
    .get(url, config)
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((error) => {
      onError(error);
      if (error?.response?.data?.data?.message === 'Unauthorized') {
        localStorage.clear();
        window.location.reload();
      }
    });
};

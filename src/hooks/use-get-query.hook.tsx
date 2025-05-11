/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';

import { api } from '@/service';
import { errorMasseg } from '@/utils/toastify';

interface UseGetProps {
  url?: string;
  queryKey?: (string | number)[];
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  retry?: number;
  config?: Record<string, any>;
}

export const useGet: any = ({
  url = '',
  queryKey = [],
  enabled = true,
  refetchOnWindowFocus = false,
  retry = 1,
  config = {},
}: UseGetProps) => {
  const { isLoading, error, data, status, refetch } = useQuery({
    queryKey: queryKey, // bunda keshlashda foydalaniladi
    queryFn: () =>
      api
        .get(url, config)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          errorMasseg(error?.response?.data?.message);
        }),
    enabled: enabled, // agar false bulsa surov yubormaydi
    refetchOnWindowFocus: refetchOnWindowFocus, // sahifadan chiqib qaytadan kirsa va malumot back endan yangilangan bulsa uzini yandilaydi trueda false bulsa yangilamaydi
    retry: retry, // agar hatolik chiqsa {retry} marta succes bulmagancha {refetch} yangilaydi
  });

  return { data, isLoading, error, status, refetch };
};

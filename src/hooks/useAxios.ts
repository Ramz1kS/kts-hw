import axios, { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import type { ErrorInfo } from 'shared/types/types';

export const useAxios = <T>(url: string, params?: Record<string, any>) => {
  const [data, setData] = useState<T | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorInfo, setErrorInfo] = useState<ErrorInfo>()
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, { params });
        setData(response.data);
      } catch (error) {
        if (isAxiosError(error)) {
          setErrorInfo({
            errorCode: error.code ?? 'Undefined code',
            errorStatus: error.status ?? 0
          })
        }
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, params]);

  return { data, isLoading, isError, errorInfo };
};

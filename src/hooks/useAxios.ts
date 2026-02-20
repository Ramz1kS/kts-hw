import axios, { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

export const useAxios = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [errorStatus, setErrorStatus] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data.data);
      } catch (error) {
        if (isAxiosError(error)) {
          setErrorCode(error.code ?? 'Undefined code');
          setErrorStatus(error.status ?? 0);
        }
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error, errorCode, errorStatus };
};

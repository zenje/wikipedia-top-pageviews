import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { FetchConfig } from '../types';

const useFetch = (config: FetchConfig | null) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<
    AxiosResponse | undefined | null
  >(null);

  useEffect(() => {
    const fetchData = async (config: FetchConfig) => {
      try {
        const { url, processData } = config;
        const result = await axios.get(url);
        const { data } = result;
        const processedData = processData(data);
        setData(processedData);
      } catch (error: Error | AxiosError | any) {
        console.error(error);
        setHasError(true);
        if (axios.isAxiosError(error)) {
          const axiosError: AxiosError = error as AxiosError;
          if (axiosError.response) {
            // The client was given an error response (5xx, 4xx)
            let response: AxiosResponse | undefined = error.response;
            setErrorResponse(response);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    if (config) {
      setHasError(false);
      setLoading(true);
      fetchData(config);
    }
  }, [config]);

  return {
    data,
    loading,
    hasError,
    errorResponse,
  };
};

export default useFetch;

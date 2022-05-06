import axios from 'axios';
import { useEffect, useState } from 'react';
import { FetchConfig } from '../types';

const useFetch = (config: FetchConfig | null) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (config: FetchConfig) => {
      try {
        const { url, processData } = config;
        const { data } = await axios.get(url);
        const processedData = processData(data);
        setData(processedData);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    if (config) {
      setLoading(true);
      fetchData(config);
    }
  }, [config]);

  return {
    data,
    loading,
  };
};

export default useFetch;
